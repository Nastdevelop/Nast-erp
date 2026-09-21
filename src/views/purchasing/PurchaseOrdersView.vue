<template>
  <div>
    <PageHeader title="Purchase Orders" description="Manage purchase orders to suppliers" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New PO</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="mockPurchaseOrders" :loading="loading" empty-message="No purchase orders found. Create your first order to get started.">
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
        <AppSelect v-model="form.supplier" label="Supplier" :options="supplierOptions" placeholder="Select supplier" required />
        <AppSelect v-model="form.pr" label="Based on Purchase Request" :options="prOptions" placeholder="Select PR (optional)" />
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
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockPurchaseOrders } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const form = reactive({ supplier: '', pr: '', orderDate: '2026-09-21', expectedDate: '' })
const columns = [
  { key: 'number', label: 'PO Number' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'orderDate', label: 'Order Date' },
  { key: 'expectedDate', label: 'Expected' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' },
]
const supplierOptions = [
  { value: '1', label: 'PT Kayu Nusantara' },
  { value: '2', label: 'CV Busa Sejahtera' },
  { value: '3', label: 'PT Textile Mandiri' },
]
const prOptions = [
  { value: '1', label: 'PR-2026-001' },
  { value: '2', label: 'PR-2026-002' },
]
function save() { uiStore.addToast('success', 'Purchase order created.'); showForm.value = false }
</script>
