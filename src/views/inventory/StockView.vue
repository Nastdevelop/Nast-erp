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
import { ref, computed, onMounted } from 'vue'
import { BoxesIcon, AlertTriangle, Lock, CheckCircle } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import { stockService } from '../../services/crud'

const loading = ref(true)
const filterWarehouse = ref('')
const items = ref<any[]>([])
async function fetchList() { loading.value = true; try { const res = await stockService.list(); items.value = res.data } finally { loading.value = false } }

onMounted(fetchList)
const columns = [
  { key: 'product', label: 'Product' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'quantity', label: 'Current Stock' },
  { key: 'unit', label: 'Unit' },
  { key: 'status', label: 'Status' },
]
const warehouseOptions = computed(() => {
  const names = [...new Set(items.value.map(s => s.warehouse?.name).filter(Boolean))]
  return names.map(n => ({ value: n, label: n }))
})
const filteredStocks = computed(() => {
  let d = items.value
  if (filterWarehouse.value) d = d.filter(s => s.warehouse?.name === filterWarehouse.value)
  return d.map(s => ({ ...s, product: s.product?.name ?? s.material?.name ?? '-', code: s.product?.code ?? s.material?.code ?? '-', warehouse: s.warehouse?.name ?? '-', reservedQuantity: 0, availableQty: s.quantity, unit: s.unit ?? '-' }))
})
</script>
