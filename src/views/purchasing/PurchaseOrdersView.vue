<template>
  <div>
    <PageHeader title="Purchase Orders" description="Manage purchase orders to suppliers" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New PO</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="items" :loading="loading" empty-message="No purchase orders found. Create your first order to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New PO</AppButton>
      </template>
      <template #cell-number="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-total="{ value }">
        <span>Rp {{ value.toLocaleString('id-ID') }}</span>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <RouterLink :to="`/purchasing/orders/${row.id}`">
            <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
          </RouterLink>
        </div>
      </template>
    </DataTable>

    <AppModal v-model="showForm" title="Create Purchase Order" size="md">
      <div class="flex flex-col gap-4">
        <AppSelect v-model="form.supplier" label="Supplier" :options="supplierOptions()" placeholder="Select supplier" required />
        <AppSelect v-model="form.pr" label="Based on Purchase Request" :options="prOptions()" placeholder="Select PR (optional)" />
        <AppInput v-model="form.orderDate" label="Order Date" type="date" />
        <AppInput v-model="form.expectedDate" label="Expected Delivery Date" type="date" />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">Create PO</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { purchaseOrdersService, suppliersService, purchaseRequestsService } from '../../services/crud'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)
const items = ref<any[]>([])
const suppliers = ref<any[]>([])
const prs = ref<any[]>([])
async function fetchList() { loading.value = true; try { const [po, s, pr] = await Promise.all([purchaseOrdersService.list(), suppliersService.list(), purchaseRequestsService.list()]); items.value = po.data.map(p => ({ ...p, number: p.code, supplier: p.supplier?.name ?? '-', orderDate: p.orderDate?.slice(0,10), expectedDate: p.expectedDate?.slice(0,10), total: (p.items ?? []).reduce((sum:any, it:any) => sum + Number(it.unitPrice) * Number(it.quantity), 0) })); suppliers.value = s.data; prs.value = pr.data } finally { loading.value = false } }
onMounted(fetchList)
const form = reactive({ supplier: '', pr: '', orderDate: new Date().toISOString().slice(0,10), expectedDate: '' })
const columns = [
  { key: 'number', label: 'PO Number' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'orderDate', label: 'Order Date' },
  { key: 'expectedDate', label: 'Expected' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' },
]
const supplierOptions = () => suppliers.value.map(s => ({ value: s.id, label: s.name }))
const prOptions = () => prs.value.map(p => ({ value: p.id, label: p.code }))
function save() {
  if (!form.supplier) { uiStore.addToast('error', 'Supplier required'); return }
  purchaseOrdersService.create({ supplierId: form.supplier, orderDate: form.orderDate, expectedDate: form.expectedDate, status: 'DRAFT' })
    .then(() => { uiStore.addToast('success', 'Purchase order created.'); showForm.value = false; fetchList() })
    .catch(e => uiStore.addToast('error', e.message))
}
</script>
