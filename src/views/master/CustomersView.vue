<template>
  <div>
    <PageHeader title="Customers" description="Manage customer data" :loading="loading">
      <template #actions>
        <AppButton @click="openCreate"><Plus class="w-3.5 h-3.5" />Add Customer</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="items" search-placeholder="Search customers..." :loading="loading" empty-message="No customers found. Add your first customer to get started.">
      <template #empty-action>
        <AppButton @click="openCreate"><Plus class="w-3.5 h-3.5" />Add Customer</AppButton>
      </template>
      <template #cell-code="{ value }">
        <span class="font-mono text-xs text-zinc-600 dark:text-zinc-400">{{ value }}</span>
      </template>
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'ACTIVE' : 'INACTIVE'" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <AppButton variant="ghost" size="sm" @click="edit(row)"><Pencil class="w-3.5 h-3.5" /></AppButton>
          <AppButton variant="ghost" size="sm" @click="remove(row)"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
        </div>
      </template>
    </DataTable>
    <AppModal v-model="showForm" title="Customer" size="md">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-3">
          <AppInput v-model="form.code" label="Code" placeholder="CUST-001" />
          <AppInput v-model="form.name" label="Name" placeholder="PT Griya..." />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <AppInput v-model="form.phone" label="Phone" type="tel" />
          <AppInput v-model="form.email" label="Email" type="email" />
        </div>
        <AppTextarea v-model="form.address" label="Address" :rows="2" />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton :loading="saving" @click="save">Save Customer</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppTextarea from '../../components/ui/AppTextarea.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { customersService } from '../../services/crud'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const editingId = ref<string | null>(null)
const items = ref<any[]>([])
const form = reactive({ code: '', name: '', phone: '', email: '', address: '' })
async function fetchList() { loading.value = true; try { const res = await customersService.list(); items.value = res.data } catch (e: any) { uiStore.addToast('error', e.message) } finally { loading.value = false } }
onMounted(fetchList)
const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '' },
]
function openCreate() { editingId.value = null; Object.assign(form, { code: '', name: '', phone: '', email: '', address: '' }); showForm.value = true }
function edit(row: any) { editingId.value = row.id; Object.assign(form, { code: row.code, name: row.name, phone: row.phone ?? '', email: row.email ?? '', address: row.address ?? '' }); showForm.value = true }
async function save() {
  if (!form.code || !form.name) { uiStore.addToast('error', 'Code and name required'); return }
  saving.value = true
  try {
    if (editingId.value) await customersService.update(editingId.value, { ...form })
    else await customersService.create({ ...form })
    uiStore.addToast('success', 'Customer saved.')
    showForm.value = false
    await fetchList()
  } catch (e: any) { uiStore.addToast('error', e.message) } finally { saving.value = false }
}
async function remove(row: any) { try { await customersService.remove(row.id); uiStore.addToast('success', 'Customer deleted.'); await fetchList() } catch (e: any) { uiStore.addToast('error', e.message) } }
</script>
