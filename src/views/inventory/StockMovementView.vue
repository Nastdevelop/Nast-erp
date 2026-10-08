<template>
  <div>
    <PageHeader title="Stock Movement" description="Immutable history of all stock changes" :loading="loading" />

    <div class="flex items-center gap-2 mb-4">
      <AppSelect v-model="filterType" :options="movementTypeOptions" placeholder="All Types" class="w-48" />
      <AppInput v-model="filterDate" type="date" class="w-44" />
    </div>

    <DataTable :columns="columns" :data="movements" search-placeholder="Search..." :loading="loading" empty-message="No stock movements found.">
      <template #cell-type="{ value }">
        <div class="flex items-center gap-1.5">
          <span :class="['w-2 h-2 rounded-full', movementColor(value)]"></span>
          <span class="text-xs font-medium">{{ value.replace('_', ' ') }}</span>
        </div>
      </template>
      <template #cell-quantity="{ value }">
        <span :class="[value > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500', 'font-semibold']">
          {{ value > 0 ? '+' : '' }}{{ value }}
        </span>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppInput from '../../components/ui/AppInput.vue'
import DataTable from '../../components/ui/DataTable.vue'
import { stockMovementsService } from '../../services/crud'

const loading = ref(true)
const filterType = ref('')
const filterDate = ref('')
const items = ref<any[]>([])

async function fetchList() { loading.value = true; try { const res = await stockMovementsService.list(); items.value = res.data } finally { loading.value = false } }
onMounted(fetchList)

const columns = [
  { key: 'date', label: 'Date' },
  { key: 'product', label: 'Product' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'type', label: 'Type' },
  { key: 'quantity', label: 'Qty Change' },
  { key: 'reference', label: 'Reference' },
  { key: 'createdBy', label: 'Created By' },
]

const movementTypeOptions = [
  { value: 'IN', label: 'In' },
  { value: 'OUT', label: 'Out' },
  { value: 'TRANSFER', label: 'Transfer' },
  { value: 'ADJUSTMENT', label: 'Adjustment' },
]

const movements = computed(() => {
  let d = items.value
  if (filterType.value) d = d.filter(m => m.type === filterType.value)
  if (filterDate.value) d = d.filter(m => m.createdAt?.slice(0, 10) === filterDate.value)
  return d.map(m => ({
    ...m,
    date: m.createdAt?.slice(0, 10),
    product: m.product?.name ?? m.material?.name ?? '-',
    warehouse: m.warehouse?.name ?? '-',
    reference: m.referenceType ?? '-',
  }))
})

function movementColor(type: string) {
  if (type === 'IN') return 'bg-emerald-500'
  if (type === 'OUT') return 'bg-red-500'
  return 'bg-zinc-400'
}
</script>
