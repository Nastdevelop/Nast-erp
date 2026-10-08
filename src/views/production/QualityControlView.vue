<template>
  <div>
    <PageHeader title="Quality Control" description="Inspect and approve production results" :loading="loading" />
    <DataTable :columns="columns" :data="items" :loading="loading" empty-message="No QC records found.">
      <template #cell-productionOrder="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-goodQty="{ value }">
        <span class="text-emerald-600 dark:text-emerald-400 font-medium">{{ value }} PCS</span>
      </template>
      <template #cell-rejectQty="{ value }">
        <span :class="value > 0 ? 'text-red-500 font-medium' : 'text-zinc-400'">{{ value }} PCS</span>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value" />
      </template>
      <template #cell-actions="{ row }">
        <AppButton v-if="row.status === 'PENDING'" variant="ghost" size="sm" @click="approve(row)">
          <Check class="w-3.5 h-3.5 text-emerald-500" />
        </AppButton>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Check } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { qualityControlService } from '../../services/crud'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()

const loading = ref(true)
const items = ref<any[]>([])
async function fetchList() { loading.value = true; try { const res = await qualityControlService.list(); items.value = res.data.map(q => ({ ...q, productionOrder: q.productionResult?.productionOrderId ?? '-', product: q.productionResult?.productId ?? '-', goodQty: q.productionResult?.goodQuantity ?? 0, rejectQty: q.productionResult?.rejectQuantity ?? 0, checkedBy: q.inspectedBy, checkedAt: q.inspectDate?.slice(0,10) })) } finally { loading.value = false } }
onMounted(fetchList)

const columns = [
  { key: 'productionOrder', label: 'Production Order' },
  { key: 'product', label: 'Product' },
  { key: 'goodQty', label: 'Good Qty' },
  { key: 'rejectQty', label: 'Reject Qty' },
  { key: 'checkedBy', label: 'Checked By' },
  { key: 'checkedAt', label: 'Date' },
  { key: 'status', label: 'Status' },
  { key: 'notes', label: 'Notes' },
  { key: 'actions', label: '' },
]
async function approve(row: any) {
  try { await qualityControlService.update(row.id, { status: 'APPROVED' }); uiStore.addToast('success', `QC approved.`); await fetchList() } catch (e: any) { uiStore.addToast('error', e.message) }
}
</script>
