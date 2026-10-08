<template>
  <div>
    <PageHeader title="Deliveries" description="Track shipments to customers" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New Delivery</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="items" :loading="loading" empty-message="No deliveries found. Create your first delivery to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New Delivery</AppButton>
      </template>
      <template #cell-number="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-actions="{ row }">
        <RouterLink :to="`/sales/deliveries/${row.id}`">
          <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
        </RouterLink>
      </template>
    </DataTable>

    <AppModal v-model="showForm" title="New Delivery" size="md">
      <div class="flex flex-col gap-4">
        <AppSelect v-model="form.so" label="Sales Order" :options="soOptions()" placeholder="Select SO" required />
        <AppInput v-model="form.deliveredAt" label="Delivery Date" type="date" />
        <p class="text-xs text-zinc-500 dark:text-zinc-400">Items will be loaded from the selected sales order.</p>
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">Create Delivery</AppButton>
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
import { deliveriesService, salesOrdersService } from '../../services/crud'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)
const items = ref<any[]>([])
const sos = ref<any[]>([])
async function fetchList() { loading.value = true; try { const [d, s] = await Promise.all([deliveriesService.list(), salesOrdersService.list()]); items.value = d.data.map(x => ({ ...x, number: x.code, salesOrder: x.salesOrder?.code ?? x.salesOrderId ?? '-', warehouse: '-', deliveredBy: x.createdBy, deliveredAt: x.deliveryDate?.slice(0,10), items: x.items?.length ?? 0 })); sos.value = s.data } finally { loading.value = false } }
onMounted(fetchList)
const form = reactive({ so: '', warehouse: '', deliveredAt: new Date().toISOString().slice(0,10) })
const columns = [
  { key: 'number', label: 'Delivery #' },
  { key: 'salesOrder', label: 'Sales Order' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'deliveredBy', label: 'Delivered By' },
  { key: 'deliveredAt', label: 'Date' },
  { key: 'items', label: 'Items' },
  { key: 'actions', label: '' },
]
const soOptions = () => sos.value.map(s => ({ value: s.id, label: s.code }))
function save() {
  if (!form.so) { uiStore.addToast('error', 'SO required'); return }
  deliveriesService.create({ salesOrderId: form.so, deliveryDate: form.deliveredAt, status: 'PENDING' })
    .then(() => { uiStore.addToast('success', 'Delivery created.'); showForm.value = false; fetchList() })
    .catch(e => uiStore.addToast('error', e.message))
}
</script>
