<template>
  <div>
    <PageHeader title="Materials" description="Raw materials used in production" :loading="loading">
      <template #actions>
        <AppButton @click="openCreate"><Plus class="w-3.5 h-3.5" />Add Material</AppButton>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :data="items" search-placeholder="Search materials..." :loading="loading" empty-message="No materials found. Add your first material to get started.">
      <template #empty-action>
        <AppButton @click="openCreate"><Plus class="w-3.5 h-3.5" />Add Material</AppButton>
      </template>
      <template #cell-code="{ value }">
        <span class="font-mono text-xs text-zinc-600 dark:text-zinc-400">{{ value }}</span>
      </template>
      <template #cell-category="{ row }">
        <span>{{ row.category?.name }}</span>
      </template>
      <template #cell-unit="{ row }">
        <span>{{ row.unit?.symbol }}</span>
      </template>
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'ACTIVE' : 'INACTIVE'" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <AppButton variant="ghost" size="sm" @click="editItem(row)"><Pencil class="w-3.5 h-3.5" /></AppButton>
          <AppButton variant="ghost" size="sm" @click="remove(row)"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
        </div>
      </template>
    </DataTable>

    <AppModal v-model="showForm" :title="editingId ? 'Edit Material' : 'Add Material'" size="md">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-3">
          <AppInput v-model="form.code" label="Code" placeholder="RM-001" />
          <AppInput v-model="form.name" label="Material Name" placeholder="Kayu Jati" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <AppSelect v-model="form.categoryId" label="Category" :options="categoryOptions" placeholder="Select category" />
          <AppSelect v-model="form.unitId" label="Unit" :options="unitOptions" placeholder="Select unit" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <AppInput v-model="form.type" label="Type" placeholder="RAW_MATERIAL" />
          <AppInput v-model="form.price" label="Price" type="number" placeholder="0" />
        </div>
        <AppInput v-model="form.minStock" label="Min Stock" type="number" placeholder="0" />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton :loading="saving" @click="save">Save Material</AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { materialsService, categoriesService, unitsService } from '../../services/crud'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const editingId = ref<string | null>(null)
const items = ref<any[]>([])
const categories = ref<any[]>([])
const units = ref<any[]>([])
const form = reactive({ code: '', name: '', type: '', categoryId: '', unitId: '', price: '', minStock: '' })

const categoryOptions = computed(() => categories.value.map(c => ({ value: c.id as string, label: c.name as string })))
const unitOptions = computed(() => units.value.map(u => ({ value: u.id as string, label: u.symbol as string })))

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Material Name' },
  { key: 'category', label: 'Category' },
  { key: 'unit', label: 'Unit' },
  { key: 'type', label: 'Type' },
  { key: 'price', label: 'Price' },
  { key: 'minStock', label: 'Min Stock' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '' },
]

async function fetchList() {
  loading.value = true
  try {
    const [m, c, u] = await Promise.all([materialsService.list(), categoriesService.list(), unitsService.list()])
    items.value = m.data
    categories.value = c.data
    units.value = u.data
  } catch (e: any) { uiStore.addToast('error', e.message) } finally { loading.value = false }
}
onMounted(fetchList)

function openCreate() { editingId.value = null; Object.assign(form, { code: '', name: '', type: 'RAW_MATERIAL', categoryId: '', unitId: '', price: '', minStock: '' }); showForm.value = true }
function editItem(row: any) { editingId.value = row.id; Object.assign(form, { code: row.code, name: row.name, type: row.type ?? '', categoryId: row.categoryId ?? '', unitId: row.unitId ?? '', price: String(row.price ?? ''), minStock: String(row.minStock ?? '') }); showForm.value = true }
async function save() {
  if (!form.code || !form.name) { uiStore.addToast('error', 'Code and name required'); return }
  saving.value = true
  try {
    const payload = { ...form, price: Number(form.price) || 0, minStock: Number(form.minStock) || 0 }
    if (editingId.value) await materialsService.update(editingId.value, payload)
    else await materialsService.create(payload)
    uiStore.addToast('success', 'Material saved.')
    showForm.value = false
    await fetchList()
  } catch (e: any) { uiStore.addToast('error', e.message) } finally { saving.value = false }
}
async function remove(row: any) { try { await materialsService.remove(row.id); uiStore.addToast('success', 'Material deleted.'); await fetchList() } catch (e: any) { uiStore.addToast('error', e.message) } }
</script>
