<template>
  <div>
    <PageHeader title="Categories" description="Product categories" :loading="loading">
      <template #actions>
        <AppButton @click="openCreate"><Plus class="w-3.5 h-3.5" />Add Category</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="items" :loading="loading" empty-message="No categories found. Add your first category to get started.">
      <template #empty-action>
        <AppButton @click="openCreate"><Plus class="w-3.5 h-3.5" />Add Category</AppButton>
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
    <AppModal v-model="showForm" title="Category" size="sm">
      <div class="flex flex-col gap-4">
        <AppInput v-model="form.code" label="Code" placeholder="CAT-001" />
        <AppInput v-model="form.name" label="Name" placeholder="Sofa" />
        <AppTextarea v-model="form.description" label="Description" placeholder="Category description..." :rows="2" />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton :loading="saving" @click="save">Save</AppButton>
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
import { categoriesService } from '../../services/crud'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const editingId = ref<string | null>(null)
const items = ref<any[]>([])
const form = reactive({ code: '', name: '', description: '' })
const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '' },
]
async function fetchList() {
  loading.value = true
  try {
    const res = await categoriesService.list()
    items.value = res.data
  } catch (e: any) {
    uiStore.addToast('error', e.message)
  } finally {
    loading.value = false
  }
}
function openCreate() {
  editingId.value = null
  Object.assign(form, { code: '', name: '', description: '' })
  showForm.value = true
}
function edit(row: any) {
  editingId.value = row.id
  Object.assign(form, { code: row.code, name: row.name, description: row.description ?? '' })
  showForm.value = true
}
async function save() {
  if (!form.code || !form.name) { uiStore.addToast('error', 'Code and name required'); return }
  saving.value = true
  try {
    if (editingId.value) await categoriesService.update(editingId.value, { ...form })
    else await categoriesService.create({ ...form })
    uiStore.addToast('success', 'Category saved.')
    showForm.value = false
    await fetchList()
  } catch (e: any) {
    uiStore.addToast('error', e.message)
  } finally {
    saving.value = false
  }
}
async function remove(row: any) {
  try {
    await categoriesService.remove(row.id)
    uiStore.addToast('success', 'Category deleted.')
    await fetchList()
  } catch (e: any) {
    uiStore.addToast('error', e.message)
  }
}
onMounted(fetchList)
</script>
