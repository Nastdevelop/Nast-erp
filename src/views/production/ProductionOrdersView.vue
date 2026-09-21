<template>
  <div>
    <PageHeader title="Production Orders" description="Manage and track production orders" :loading="loading">
      <template #actions>
        <RouterLink to="/production/orders/create">
          <AppButton><Plus class="w-3.5 h-3.5" />New Order</AppButton>
        </RouterLink>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :data="mockProductionOrders" :loading="loading" empty-message="No production orders found. Create your first order to get started.">
      <template #empty-action>
        <RouterLink to="/production/orders/create">
          <AppButton><Plus class="w-3.5 h-3.5" />New Order</AppButton>
        </RouterLink>
      </template>
      <template #cell-number="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value" />
      </template>
      <template #cell-actions="{ row }">
        <RouterLink :to="`/production/orders/${row.id}`">
          <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
        </RouterLink>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockProductionOrders } from '../../data/mock'

const loading = ref(true)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)

const columns = [
  { key: 'number', label: 'Order #' },
  { key: 'product', label: 'Product' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'quantity', label: 'Qty' },
  { key: 'plannedDate', label: 'Planned Date' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' },
]
</script>
