<template>
  <div>
    <PageHeader title="Production Cost" description="Track cost per production order" :loading="loading" />
    <div class="grid grid-cols-3 gap-4 mb-6">
      <StatCard label="Total Material Cost" value="Rp 14.3M" :icon="Layers" icon-bg="bg-zinc-100 dark:bg-zinc-800" icon-color="text-zinc-500" :loading="loading" />
      <StatCard label="Total Labor Cost" value="Rp 3.15M" :icon="Users" icon-bg="bg-blue-50 dark:bg-blue-950" icon-color="text-blue-500" :loading="loading" />
      <StatCard label="Total Overhead" value="Rp 2.09M" :icon="Settings" icon-bg="bg-amber-50 dark:bg-amber-950" icon-color="text-amber-500" :loading="loading" />
    </div>

    <DataTable :columns="columns" :data="mockProductionCosts" :loading="loading" empty-message="No production costs found.">
      <template #cell-productionOrder="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-materialCost="{ value }">Rp {{ value.toLocaleString('id-ID') }}</template>
      <template #cell-laborCost="{ value }">Rp {{ value.toLocaleString('id-ID') }}</template>
      <template #cell-overheadCost="{ value }">Rp {{ value.toLocaleString('id-ID') }}</template>
      <template #cell-totalCost="{ value }">
        <span class="font-semibold">Rp {{ value.toLocaleString('id-ID') }}</span>
      </template>
      <template #cell-hpp="{ value }">
        <span class="text-emerald-600 dark:text-emerald-400 font-medium">Rp {{ value.toLocaleString('id-ID') }}</span>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Layers, Users, Settings } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import { mockProductionCosts } from '../../data/mock'

const loading = ref(true)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)

const columns = [
  { key: 'productionOrder', label: 'Production Order' },
  { key: 'product', label: 'Product' },
  { key: 'qty', label: 'Good Qty' },
  { key: 'materialCost', label: 'Material Cost' },
  { key: 'laborCost', label: 'Labor Cost' },
  { key: 'overheadCost', label: 'Overhead' },
  { key: 'totalCost', label: 'Total Cost' },
  { key: 'hpp', label: 'HPP / Unit' },
]
</script>
