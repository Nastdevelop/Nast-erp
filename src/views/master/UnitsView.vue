<template>
  <div>
    <PageHeader title="Units of Measure" description="Units used for products and materials" :loading="loading">
      <template #actions>
        <AppButton @click="openCreate"><Plus class="w-3.5 h-3.5" />Add Unit</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="items" :loading="loading" empty-message="No units found. Add your first unit to get started.">
      <template #empty-action>
        <AppButton @click="openCreate"><Plus class="w-3.5 h-3.5" />Add Unit</AppButton>
      </template>
      <template #cell-symbol="{ value }">
        <span class="font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{{ value }}</span>
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <AppButton variant="ghost" size="sm" @click="edit(row)"><Pencil class="w-3.5 h-3.5" /></AppButton>
          <AppButton variant="ghost" size="sm" @click="remove(row)"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
        </div>
      </template>
    </DataTable>
    <AppModal v-model="showForm" title="Unit" size="sm">
      <div class="flex flex-col gap-3">
        <AppInput v-model="form.code" label="Code" placeholder="UNT-001" />
        <AppInput v-model="form.name" label="Name" placeholder="Kilogram" />
        <AppInput v-model="form.symbol" label="Symbol" placeholder="KG" />
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
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import { unitsService } from '../../services/crud'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const editingId = ref<string | null>(null)
const items = ref<any[]>([])
const form = reactive({ code: '', name: '', symbol: '' })
const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'symbol', label: 'Symbol' },
  { key: 'actions', label: '' },
]
async function fetchList() {
  loading.value = true
  try {
    const res = await unitsService.list()
    items.value = res.data
  } catch (e: any) { uiStore.addToast('error', e.message) } finally { loading.value = false }
}
function openCreate() { editingId.value = null; Object.assign(form, { code: '', name: '', symbol: '' }); showForm.value = true }
function edit(row: any) { editingId.value = row.id; Object.assign(form, { code: row.code, name: row.name, symbol: row.symbol ?? '' }); showForm.value = true }
async function save() {
  if (!form.code || !form.name) { uiStore.addToast('error', 'Code and name required'); return }
  saving.value = true
  try {
    if (editingId.value) await unitsService.update(editingId.value, { ...form })
    else await unitsService.create({ ...form })
    uiStore.addToast('success', 'Unit saved.')
    showForm.value = false
    await fetchList()
  } catch (e: any) { uiStore.addToast('error', e.message) } finally { saving.value = false }
}
async function remove(row: any) {
  try { await unitsService.remove(row.id); uiStore.addToast('success', 'Unit deleted.'); await fetchList() }
  catch (e: any) { uiStore.addToast('error', e.message) }
}
onMounted(fetchList)
</script>
