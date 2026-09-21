<template>
  <div>
    <div class="flex items-center gap-2 mb-6">
      <RouterLink to="/reports" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"><ArrowLeft class="w-4 h-4" /></RouterLink>
      <PageHeader title="Inventory Report" description="Stock levels and movement history" class="mb-0" />
    </div>
    <div class="flex items-center gap-2 mb-4">
      <AppInput v-model="dateFrom" type="date" label="" placeholder="From" class="w-40" />
      <span class="text-zinc-400">—</span>
      <AppInput v-model="dateTo" type="date" label="" placeholder="To" class="w-40" />
      <AppButton variant="secondary" size="sm"><Download class="w-3.5 h-3.5" />Export</AppButton>
    </div>
    <div class="grid grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Items" value="24" :icon="BoxesIcon" icon-bg="bg-zinc-100 dark:bg-zinc-800" icon-color="text-zinc-500" />
      <StatCard label="Low Stock" value="3" :icon="AlertTriangle" icon-bg="bg-amber-50 dark:bg-amber-950" icon-color="text-amber-500" />
      <StatCard label="Total Reserved" value="144" :icon="Lock" icon-bg="bg-blue-50 dark:bg-blue-950" icon-color="text-blue-500" />
      <StatCard label="Available Value" value="Rp 48.5M" :icon="DollarSign" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" />
    </div>
    <DataTable :columns="columns" :data="mockStocks">
      <template #cell-availableQty="{ row }">{{ row.quantity - row.reservedQuantity }} {{ row.unit }}</template>
      <template #cell-status="{ row }">
        <AppBadge v-if="(row.quantity - row.reservedQuantity) <= 5" variant="danger">Critical</AppBadge>
        <AppBadge v-else-if="(row.quantity - row.reservedQuantity) <= 15" variant="warning">Low</AppBadge>
        <AppBadge v-else variant="success">Normal</AppBadge>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, BoxesIcon, AlertTriangle, Lock, DollarSign, Download } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import { mockStocks } from '../../data/mock'
const dateFrom = ref('2026-09-01')
const dateTo = ref('2026-09-21')
const columns = [
  { key: 'product', label: 'Product' },
  { key: 'code', label: 'Code' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'quantity', label: 'Current' },
  { key: 'reservedQuantity', label: 'Reserved' },
  { key: 'availableQty', label: 'Available' },
  { key: 'status', label: 'Status' },
]
</script>
