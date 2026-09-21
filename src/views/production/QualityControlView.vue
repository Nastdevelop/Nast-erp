<template>
  <div>
    <PageHeader title="Quality Control" description="Inspect and approve production results" :loading="loading" />
    <DataTable :columns="columns" :data="mockQCRecords" :loading="loading" empty-message="No QC records found.">
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
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockQCRecords } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()

const loading = ref(true)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)

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
function approve(row: any) {
  uiStore.addToast('success', `QC approved. ${row.goodQty} units added to finished goods.`)
}
</script>
