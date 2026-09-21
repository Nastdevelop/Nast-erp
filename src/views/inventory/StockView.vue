<template>
  <div>
    <PageHeader title="Stock" description="Current inventory levels across all warehouses" :loading="loading">
      <template #actions>
        <AppSelect v-model="filterWarehouse" :options="warehouseOptions" placeholder="All Warehouses" class="w-52" />
      </template>
    </PageHeader>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total SKUs" value="24" :icon="BoxesIcon" icon-bg="bg-zinc-100 dark:bg-zinc-800" icon-color="text-zinc-600 dark:text-zinc-300" :loading="loading" />
      <StatCard label="Low Stock Items" value="3" :icon="AlertTriangle" icon-bg="bg-amber-50 dark:bg-amber-950" icon-color="text-amber-500" :loading="loading" />
      <StatCard label="Reserved" value="144 units" :icon="Lock" icon-bg="bg-blue-50 dark:bg-blue-950" icon-color="text-blue-500" :loading="loading" />
      <StatCard label="Available" value="1,892 units" :icon="CheckCircle" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" :loading="loading" />
    </div>

    <DataTable :columns="columns" :data="filteredStocks" search-placeholder="Search products..." :loading="loading" empty-message="No stock data found.">
      <template #empty-action>
        <AppButton variant="outline" @click="filterWarehouse = ''">Clear Filters</AppButton>
      </template>
      <template #cell-product="{ value, row }">
        <div>
          <p class="font-medium text-zinc-900 dark:text-white">{{ value }}</p>
          <p class="text-xs text-zinc-500 font-mono">{{ row.code }}</p>
        </div>
      </template>
      <template #cell-availableQty="{ row }">
        <span :class="(row.quantity - row.reservedQuantity) <= 10 ? 'text-red-500 font-medium' : 'text-zinc-700 dark:text-zinc-300'">
          {{ row.quantity - row.reservedQuantity }} {{ row.unit }}
        </span>
      </template>
      <template #cell-quantity="{ row }">
        <span>{{ row.quantity }} {{ row.unit }}</span>
      </template>
      <template #cell-reservedQuantity="{ row }">
        <span class="text-zinc-500">{{ row.reservedQuantity }} {{ row.unit }}</span>
      </template>
      <template #cell-status="{ row }">
        <AppBadge v-if="(row.quantity - row.reservedQuantity) <= 5" variant="danger">Critical</AppBadge>
        <AppBadge v-else-if="(row.quantity - row.reservedQuantity) <= 15" variant="warning">Low</AppBadge>
        <AppBadge v-else variant="success">Normal</AppBadge>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { BoxesIcon, AlertTriangle, Lock, CheckCircle } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import { mockStocks } from '../../data/mock'

const loading = ref(true)
const filterWarehouse = ref('')

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const columns = [
  { key: 'product', label: 'Product' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'quantity', label: 'Current Stock' },
  { key: 'reservedQuantity', label: 'Reserved' },
  { key: 'availableQty', label: 'Available' },
  { key: 'status', label: 'Status' },
]
const warehouseOptions = [
  { value: 'bb', label: 'Gudang Bahan Baku' },
  { value: 'wip', label: 'Gudang WIP' },
  { value: 'fg', label: 'Gudang Barang Jadi' },
]
const filteredStocks = computed(() => mockStocks)
</script>
