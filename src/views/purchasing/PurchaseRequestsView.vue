<template>
  <div>
    <PageHeader title="Purchase Requests" description="Create and manage purchase requests" :loading="loading">
      <template #actions>
        <RouterLink to="/purchasing/requests/create">
          <AppButton><Plus class="w-3.5 h-3.5" />New Request</AppButton>
        </RouterLink>
      </template>
    </PageHeader>

    <!-- Status tabs -->
    <div class="flex items-center gap-1 mb-4 border-b border-zinc-200 dark:border-zinc-800">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="[
          'px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
          activeTab === tab.value
            ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
            : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
        ]"
      >
        {{ tab.label }}
        <span v-if="tab.count" class="ml-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.5 rounded-full">{{ tab.count }}</span>
      </button>
    </div>

    <DataTable :columns="columns" :data="filteredRequests" :loading="loading" empty-message="No purchase requests found. Create your first request to get started.">
      <template #empty-action>
        <RouterLink to="/purchasing/requests/create">
          <AppButton><Plus class="w-3.5 h-3.5" />New Request</AppButton>
        </RouterLink>
      </template>
      <template #cell-number="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <RouterLink :to="`/purchasing/requests/${row.id}`">
            <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
          </RouterLink>
          <AppButton v-if="row.status === 'DRAFT'" variant="ghost" size="sm"><Pencil class="w-3.5 h-3.5" /></AppButton>
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye, Pencil } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { purchaseRequestsService } from '../../services/crud'

const loading = ref(true)
const activeTab = ref('ALL')
const items = ref<any[]>([])
async function fetchList() { loading.value = true; try { const res = await purchaseRequestsService.list(); items.value = res.data.map(r => ({ ...r, number: r.code, requestDate: r.requestDate?.slice(0,10), items: r.items?.length ?? 0 })) } finally { loading.value = false } }
onMounted(fetchList)

const tabs = computed(() => [
  { value: 'ALL', label: 'All', count: items.value.length },
  { value: 'DRAFT', label: 'Draft', count: items.value.filter(r => r.status === 'DRAFT').length },
  { value: 'SUBMITTED', label: 'Pending', count: items.value.filter(r => r.status === 'SUBMITTED').length },
  { value: 'APPROVED', label: 'Approved', count: items.value.filter(r => r.status === 'APPROVED').length },
  { value: 'REJECTED', label: 'Rejected', count: items.value.filter(r => r.status === 'REJECTED').length },
])

const columns = [
  { key: 'number', label: 'PR Number' },
  { key: 'requestedBy', label: 'Requested By' },
  { key: 'requestDate', label: 'Date' },
  { key: 'items', label: 'Items' },
  { key: 'status', label: 'Status' },
  { key: 'approvedBy', label: 'Approved By' },
  { key: 'actions', label: '' },
]

const filteredRequests = computed(() =>
  activeTab.value === 'ALL' ? items.value : items.value.filter(r => r.status === activeTab.value)
)
</script>
