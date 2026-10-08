<template>
  <div>
    <PageHeader title="Production Results" description="Record and track production output" :loading="loading" />
    <div class="grid grid-cols-3 gap-4 mb-6">
      <StatCard label="Total Produced" :value="totals.good + ' PCS'" :icon="CheckCircle" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" :loading="loading" />
      <StatCard label="Total Reject" :value="totals.reject + ' PCS'" :icon="XCircle" icon-bg="bg-red-50 dark:bg-red-950" icon-color="text-red-500" :loading="loading" />
      <StatCard label="Reject Rate" :value="totals.rate + '%'" :icon="BarChart3" icon-bg="bg-amber-50 dark:bg-amber-950" icon-color="text-amber-500" :loading="loading" />
    </div>
    <DataTable :columns="columns" :data="items" :loading="loading" empty-message="No production results found.">
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
import { ref, computed, onMounted } from 'vue'
import { CheckCircle, XCircle, BarChart3 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import { productionResultsService } from '../../services/crud'

const loading = ref(true)
const items = ref<any[]>([])
async function fetchList() { loading.value = true; try { const res = await productionResultsService.list(); items.value = res.data.map(r => ({ ...r, productionOrder: r.productionOrder?.code ?? r.productionOrderId ?? '-', product: r.product?.name ?? '-', targetQty: r.productionOrder?.targetQuantity ?? '-', goodQty: Number(r.goodQuantity), rejectQty: Number(r.rejectQuantity), productionDate: r.createdAt?.slice(0,10), operator: r.createdBy })) } finally { loading.value = false } }
onMounted(fetchList)

const totals = computed(() => {
  const good = items.value.reduce((s, r) => s + (Number(r.goodQty) || 0), 0)
  const reject = items.value.reduce((s, r) => s + (Number(r.rejectQty) || 0), 0)
  const total = good + reject
  return { good, reject, rate: total ? ((reject / total) * 100).toFixed(1) : '0' }
})

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
