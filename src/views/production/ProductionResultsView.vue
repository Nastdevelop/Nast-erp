<template>
  <div>
    <PageHeader title="Production Results" description="Record and track production output" :loading="loading" />
    <div class="grid grid-cols-3 gap-4 mb-6">
      <StatCard label="Total Produced" value="43 PCS" :icon="CheckCircle" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" :loading="loading" />
      <StatCard label="Total Reject" value="3 PCS" :icon="XCircle" icon-bg="bg-red-50 dark:bg-red-950" icon-color="text-red-500" :loading="loading" />
      <StatCard label="Reject Rate" value="6.5%" :icon="BarChart3" icon-bg="bg-amber-50 dark:bg-amber-950" icon-color="text-amber-500" :loading="loading" />
    </div>
    <DataTable :columns="columns" :data="mockProductionResults" :loading="loading" empty-message="No production results found.">
      <template #cell-productionOrder="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-goodQty="{ value }">
        <span class="text-emerald-600 dark:text-emerald-400 font-medium">{{ value }}</span>
      </template>
      <template #cell-rejectQty="{ value }">
        <span :class="value > 0 ? 'text-red-500 font-medium' : 'text-zinc-400'">{{ value }}</span>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle, XCircle, BarChart3 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import { mockProductionResults } from '../../data/mock'

const loading = ref(true)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)

const columns = [
  { key: 'productionOrder', label: 'Production Order' },
  { key: 'product', label: 'Product' },
  { key: 'targetQty', label: 'Target' },
  { key: 'goodQty', label: 'Good Qty' },
  { key: 'rejectQty', label: 'Reject Qty' },
  { key: 'productionDate', label: 'Date' },
  { key: 'operator', label: 'Operator' },
]
</script>
