<template>
  <div>
    <PageHeader title="Stock Transfer" description="Transfer stock between warehouses" :loading="loading">
      <template #actions>
        <RouterLink to="/inventory/transfers/create">
          <AppButton><Plus class="w-3.5 h-3.5" />New Transfer</AppButton>
        </RouterLink>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :data="mockTransfers" :loading="loading" empty-message="No stock transfers found. Create your first transfer to get started.">
      <template #empty-action>
        <RouterLink to="/inventory/transfers/create">
          <AppButton><Plus class="w-3.5 h-3.5" />New Transfer</AppButton>
        </RouterLink>
      </template>
      <template #cell-number="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-route="{ row }">
        <div class="flex items-center gap-1.5 text-xs">
          <span class="text-zinc-700 dark:text-zinc-300">{{ row.source }}</span>
          <ArrowRight class="w-3 h-3 text-zinc-400" />
          <span class="text-zinc-700 dark:text-zinc-300">{{ row.destination }}</span>
        </div>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <RouterLink :to="`/inventory/transfers/${row.id}`">
            <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
          </RouterLink>
          <AppButton v-if="row.status === 'REQUESTED'" variant="ghost" size="sm">
            <Check class="w-3.5 h-3.5 text-emerald-500" />
          </AppButton>
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye, ArrowRight, Check } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockTransfers } from '../../data/mock'

const loading = ref(true)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)

const columns = [
  { key: 'number', label: 'Transfer #' },
  { key: 'route', label: 'Route' },
  { key: 'items', label: 'Items' },
  { key: 'requestedBy', label: 'Requested By' },
  { key: 'requestedAt', label: 'Date' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' },
]
</script>
