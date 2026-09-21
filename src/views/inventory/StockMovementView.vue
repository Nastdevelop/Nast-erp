<template>
  <div>
    <PageHeader title="Stock Movement" description="Immutable history of all stock changes" :loading="loading" />

    <div class="flex items-center gap-2 mb-4">
      <AppSelect v-model="filterType" :options="movementTypeOptions" placeholder="All Types" class="w-48" />
      <AppInput v-model="filterDate" type="date" class="w-44" />
    </div>

    <DataTable :columns="columns" :data="mockMovements" search-placeholder="Search..." :loading="loading" empty-message="No stock movements found.">
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
import { ref } from 'vue'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppInput from '../../components/ui/AppInput.vue'
import DataTable from '../../components/ui/DataTable.vue'
import { mockMovements } from '../../data/mock'

const loading = ref(true)
const filterType = ref('')
const filterDate = ref('')

// Simulate loading
setTimeout(() => { loading.value = false }, 500)

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
  { value: 'PURCHASE_IN', label: 'Purchase In' },
  { value: 'PRODUCTION_IN', label: 'Production In' },
  { value: 'PRODUCTION_OUT', label: 'Production Out' },
  { value: 'SALES_OUT', label: 'Sales Out' },
  { value: 'TRANSFER_IN', label: 'Transfer In' },
  { value: 'TRANSFER_OUT', label: 'Transfer Out' },
  { value: 'ADJUSTMENT_IN', label: 'Adjustment In' },
  { value: 'ADJUSTMENT_OUT', label: 'Adjustment Out' },
]

function movementColor(type: string) {
  if (type.includes('IN')) return 'bg-emerald-500'
  if (type.includes('OUT') || type === 'REJECT') return 'bg-red-500'
  return 'bg-zinc-400'
}
</script>
