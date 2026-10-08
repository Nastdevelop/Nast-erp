<template>
  <div>
    <PageHeader title="Stock Opname" description="Physical stock counting and adjustment" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New Opname</AppButton>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :data="items" :loading="loading" empty-message="No stock opname found. Create your first opname to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New Opname</AppButton>
      </template>
      <template #cell-number="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-status="{ value }">
        <StatusBadge :status="value" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <RouterLink :to="`/inventory/opname/${row.id}`">
            <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
          </RouterLink>
          <AppButton v-if="row.status === 'COUNTING'" variant="ghost" size="sm">
            <CheckSquare class="w-3.5 h-3.5 text-emerald-500" />
          </AppButton>
        </div>
      </template>
    </DataTable>

    <!-- New Opname Modal -->
    <AppModal v-model="showForm" title="New Stock Opname" size="sm">
      <div class="flex flex-col gap-4">
        <AppSelect v-model="form.warehouse" label="Warehouse" :options="warehouseOptions()" placeholder="Select warehouse" required />
        <AppInput v-model="form.date" label="Date" type="date" />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">Start Counting</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye, CheckSquare } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { stockOpnameService, warehousesService } from '../../services/crud'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)
const warehouses = ref<any[]>([])
const items = ref<any[]>([])
async function fetchList() { loading.value = true; try { const [r, w] = await Promise.all([stockOpnameService.list(), warehousesService.list()]); items.value = r.data.map(o => ({ ...o, number: o.code, warehouse: o.warehouse?.name ?? '-', createdAt: o.opnameDate?.slice(0,10) ?? o.createdAt?.slice(0,10), items: o.items?.length ?? 0 })); warehouses.value = w.data } finally { loading.value = false } }
onMounted(fetchList)
const form = reactive({ warehouse: '', date: new Date().toISOString().slice(0,10) })
const columns = [
  { key: 'number', label: 'Opname #' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'createdBy', label: 'Created By' },
  { key: 'createdAt', label: 'Date' },
  { key: 'items', label: 'Items' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '' },
]
const warehouseOptions = () => warehouses.value.map(w => ({ value: w.id, label: w.name }))
function save() {
  if (!form.warehouse) { uiStore.addToast('error', 'Warehouse required'); return }
  stockOpnameService.create({ warehouseId: form.warehouse, opnameDate: form.date, status: 'DRAFT' })
    .then(() => { uiStore.addToast('success', 'Stock opname started.'); showForm.value = false; fetchList() })
    .catch(e => uiStore.addToast('error', e.message))
}
</script>
