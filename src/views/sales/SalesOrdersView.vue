<template>
  <div>
    <PageHeader title="Sales Orders" description="Manage customer sales orders" :loading="loading">
      <template #actions>
        <RouterLink to="/sales/orders/create">
          <AppButton><Plus class="w-3.5 h-3.5" />New Order</AppButton>
        </RouterLink>
      </template>
    </PageHeader>

    <div class="flex items-center gap-1 mb-4 border-b border-zinc-200 dark:border-zinc-800">
      <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
        :class="['px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px', activeTab === tab.value ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white' : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700']">
        {{ tab.label }}
      </button>
    </div>

    <DataTable :columns="columns" :data="filteredOrders" :loading="loading" empty-message="No sales orders found. Create your first order to get started.">
      <template #empty-action>
        <RouterLink to="/sales/orders/create">
          <AppButton><Plus class="w-3.5 h-3.5" />New Order</AppButton>
        </RouterLink>
      </template>
      <template #cell-number="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-total="{ value }">
        <span>Rp {{ value.toLocaleString('id-ID') }}</span>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value" />
      </template>
      <template #cell-actions="{ row }">
        <RouterLink :to="`/sales/orders/${row.id}`">
          <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
        </RouterLink>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockSalesOrders } from '../../data/mock'

const loading = ref(true)
const activeTab = ref('ALL')

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const tabs = [
  { value: 'ALL', label: 'All' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PARTIAL', label: 'Partial' },
  { value: 'COMPLETED', label: 'Completed' },
]
const columns = [
  { key: 'number', label: 'SO Number' },
  { key: 'customer', label: 'Customer' },
  { key: 'orderDate', label: 'Date' },
  { key: 'items', label: 'Items' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' },
]
const filteredOrders = computed(() =>
  activeTab.value === 'ALL' ? mockSalesOrders : mockSalesOrders.filter(o => o.status === activeTab.value)
)
</script>
