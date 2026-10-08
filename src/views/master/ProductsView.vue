<template>
  <div>
    <PageHeader title="Products" description="Manage finished goods and raw material products" :loading="loading">
      <template #actions>
        <AppButton @click="openCreate">
          <Plus class="w-3.5 h-3.5" />
          Add Product
        </AppButton>
      </template>
    </PageHeader>

    <DataTable
      :columns="columns"
      :data="items"
      search-placeholder="Search products..."
      :loading="loading"
      empty-message="No products found. Add your first product to get started."
    >
      <template #empty-action>
        <AppButton @click="openCreate"><Plus class="w-3.5 h-3.5" />Add Product</AppButton>
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
      <template #cell-price="{ value }">
        <span class="text-zinc-700 dark:text-zinc-300">{{ formatCurrency(value) }}</span>
      </template>
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'ACTIVE' : 'INACTIVE'" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <AppButton variant="ghost" size="sm" @click="editProduct(row)"><Pencil class="w-3.5 h-3.5" /></AppButton>
          <AppButton variant="ghost" size="sm" @click="remove(row)"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
        </div>
      </template>
    </DataTable>

    <AppModal v-model="showForm" :title="editingId ? 'Edit Product' : 'Add Product'" size="lg">
      <form @submit.prevent="save" class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-3">
          <AppInput v-model="form.code" label="Product Code" placeholder="FG-001" />
          <AppInput v-model="form.name" label="Product Name" placeholder="Sofa 3 Seater" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <AppSelect v-model="form.categoryId" label="Category" :options="categoryOptions()" placeholder="Select category" />
          <AppSelect v-model="form.unitId" label="Unit" :options="unitOptions()" placeholder="Select unit" />
        </div>
        <AppInput v-model="form.description" label="Description" placeholder="Optional" />
        <div class="border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <p class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">Pricing</p>
          <div class="grid grid-cols-2 gap-3">
            <AppInput v-model="form.price" label="Selling Price" type="number" placeholder="0" />
            <AppInput v-model="form.costPrice" label="Cost Price" type="number" placeholder="0" />
          </div>
        </div>
        <div class="border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <p class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">Inventory</p>
          <AppInput v-model="form.minStock" label="Minimum Stock" type="number" placeholder="0" />
        </div>
      </form>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton :loading="saving" @click="save">Save Product</AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { productsService, categoriesService, unitsService } from '../../services/crud'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()

const loading = ref(true)
const saving = ref(false)
const showForm = ref(false)
const editingId = ref<string | null>(null)
const items = ref<any[]>([])
const categories = ref<any[]>([])
const units = ref<any[]>([])

const form = reactive({ code: '', name: '', description: '', categoryId: '', unitId: '', price: '', costPrice: '', minStock: '' })

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Product Name' },
  { key: 'category', label: 'Category' },
  { key: 'unit', label: 'Unit' },
  { key: 'price', label: 'Selling Price' },
  { key: 'minStock', label: 'Min Stock' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '' },
]

async function fetchList() {
  loading.value = true
  try {
    const [p, c, u] = await Promise.all([productsService.list(), categoriesService.list(), unitsService.list()])
    items.value = p.data
    categories.value = c.data
    units.value = u.data
  } catch (e: any) { uiStore.addToast('error', e.message) } finally { loading.value = false }
}
onMounted(fetchList)

const categoryOptions = () => categories.value.map(c => ({ value: c.id, label: c.name }))
const unitOptions = () => units.value.map(u => ({ value: u.id, label: u.symbol }))

function formatCurrency(val: number) {
  if (!val) return '-'
  return 'Rp ' + Number(val).toLocaleString('id-ID')
}

function openCreate() { editingId.value = null; Object.assign(form, { code: '', name: '', description: '', categoryId: '', unitId: '', price: '', costPrice: '', minStock: '' }); showForm.value = true }
function editProduct(row: any) { editingId.value = row.id; Object.assign(form, { code: row.code, name: row.name, description: row.description ?? '', categoryId: row.categoryId ?? '', unitId: row.unitId ?? '', price: String(row.price ?? ''), costPrice: String(row.costPrice ?? ''), minStock: String(row.minStock ?? '') }); showForm.value = true }
async function save() {
  if (!form.code || !form.name) { uiStore.addToast('error', 'Code and name required'); return }
  saving.value = true
  try {
    const payload = { ...form, price: Number(form.price) || 0, costPrice: Number(form.costPrice) || 0, minStock: Number(form.minStock) || 0 }
    if (editingId.value) await productsService.update(editingId.value, payload)
    else await productsService.create(payload)
    uiStore.addToast('success', editingId.value ? 'Product updated.' : 'Product created.')
    showForm.value = false
    await fetchList()
  } catch (e: any) { uiStore.addToast('error', e.message) } finally { saving.value = false }
}
async function remove(row: any) { try { await productsService.remove(row.id); uiStore.addToast('success', 'Product deleted.'); await fetchList() } catch (e: any) { uiStore.addToast('error', e.message) } }
</script>
