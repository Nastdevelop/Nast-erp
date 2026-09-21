<template>
  <div>
    <PageHeader title="Products" description="Manage finished goods and raw material products" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true">
          <Plus class="w-3.5 h-3.5" />
          Add Product
        </AppButton>
      </template>
    </PageHeader>

    <!-- Filters -->
    <div class="flex items-center gap-2 mb-4">
      <AppSelect
        v-model="filterType"
        :options="[
          { value: '', label: 'All Types' },
          { value: 'FINISHED_GOOD', label: 'Finished Good' },
          { value: 'RAW_MATERIAL', label: 'Raw Material' },
        ]"
        placeholder="All Types"
        class="w-44"
      />
      <AppSelect
        v-model="filterStatus"
        :options="[
          { value: '', label: 'All Status' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]"
        placeholder="All Status"
        class="w-40"
      />
    </div>

    <DataTable
      :columns="columns"
      :data="filteredProducts"
      search-placeholder="Search products..."
      :loading="loading"
      empty-message="No products found. Add your first product to get started."
    >
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Product</AppButton>
      </template>
      <template #cell-code="{ value }">
        <span class="font-mono text-xs text-zinc-600 dark:text-zinc-400">{{ value }}</span>
      </template>
      <template #cell-type="{ value }">
        <AppBadge :variant="value === 'FINISHED_GOOD' ? 'info' : 'neutral'">
          {{ value === 'FINISHED_GOOD' ? 'Finished Good' : 'Raw Material' }}
        </AppBadge>
      </template>
      <template #cell-currentStock="{ row }">
        <span :class="row.currentStock < row.minimumStock ? 'text-red-500 font-medium' : 'text-zinc-700 dark:text-zinc-300'">
          {{ row.currentStock }}
        </span>
      </template>
      <template #cell-sellingPrice="{ value }">
        <span class="text-zinc-700 dark:text-zinc-300">{{ formatCurrency(value) }}</span>
      </template>
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'ACTIVE' : 'INACTIVE'" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <RouterLink :to="`/products/${row.id}`">
            <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
          </RouterLink>
          <AppButton variant="ghost" size="sm" @click="editProduct(row)"><Pencil class="w-3.5 h-3.5" /></AppButton>
          <AppButton variant="ghost" size="sm" @click="confirmDelete(row)"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
        </div>
      </template>
    </DataTable>

    <!-- Form Modal -->
    <AppModal v-model="showForm" :title="editingProduct ? 'Edit Product' : 'Add Product'" size="lg">
      <form @submit.prevent="saveProduct" class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <AppInput v-model="form.code" label="Product Code" placeholder="FG-001" @blur="validate('code', form.code)" />
            <p v-if="touched.code && errors.code" class="text-xs text-red-500 mt-1">{{ errors.code }}</p>
          </div>
          <div>
            <AppInput v-model="form.name" label="Product Name" placeholder="Sofa 3 Seater" @blur="validate('name', form.name)" />
            <p v-if="touched.name && errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <AppSelect v-model="form.category" label="Category" :options="categoryOptions" placeholder="Select category" @blur="validate('category', form.category)" />
            <p v-if="touched.category && errors.category" class="text-xs text-red-500 mt-1">{{ errors.category }}</p>
          </div>
          <div>
            <AppSelect v-model="form.unit" label="Unit" :options="unitOptions" placeholder="Select unit" @blur="validate('unit', form.unit)" />
            <p v-if="touched.unit && errors.unit" class="text-xs text-red-500 mt-1">{{ errors.unit }}</p>
          </div>
        </div>
        <div>
          <AppSelect
            v-model="form.type"
            label="Product Type"
            :options="[{ value: 'FINISHED_GOOD', label: 'Finished Good' }, { value: 'RAW_MATERIAL', label: 'Raw Material' }]"
            placeholder="Select type"
            @blur="validate('type', form.type)"
          />
          <p v-if="touched.type && errors.type" class="text-xs text-red-500 mt-1">{{ errors.type }}</p>
        </div>
        <div class="border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <p class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">Pricing</p>
          <AppInput v-model="form.sellingPrice" label="Selling Price" type="number" placeholder="0">
            <template #prefix><span class="text-xs">Rp</span></template>
          </AppInput>
        </div>
        <div class="border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <p class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">Inventory</p>
          <div class="grid grid-cols-2 gap-3">
            <AppInput v-model="form.minimumStock" label="Minimum Stock" type="number" placeholder="0" />
            <AppInput v-model="form.targetStock" label="Target Stock" type="number" placeholder="0" />
          </div>
        </div>
      </form>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="saveProduct">Save Product</AppButton>
      </template>
    </AppModal>

    <!-- Delete Confirm -->
    <ConfirmDialog
      v-model="showDelete"
      title="Delete Product"
      :message="`Are you sure you want to delete '${deletingProduct?.name}'? This action cannot be undone.`"
      confirm-label="Delete"
      confirm-variant="danger"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye, Pencil, Trash2 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import ConfirmDialog from '../../components/ui/ConfirmDialog.vue'
import { mockProducts } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
import { useFormValidation } from '../../composables/useFormValidation'

const uiStore = useUiStore()

const loading = ref(true)
const products = ref([...mockProducts])

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const filterType = ref('')
const filterStatus = ref('')
const showForm = ref(false)
const showDelete = ref(false)
const editingProduct = ref<any>(null)
const deletingProduct = ref<any>(null)

const form = reactive({ code: '', name: '', category: '', unit: '', type: '', sellingPrice: '', minimumStock: '', targetStock: '' })

const { errors, touched, validate, validateAll, clearErrors, resetTouched } = useFormValidation({
  code: { label: 'Product Code', rules: { required: true, minLength: 2 } },
  name: { label: 'Product Name', rules: { required: true, minLength: 2 } },
  category: { label: 'Category', rules: { required: true } },
  unit: { label: 'Unit', rules: { required: true } },
  type: { label: 'Product Type', rules: { required: true } },
})

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Product Name' },
  { key: 'category', label: 'Category' },
  { key: 'type', label: 'Type' },
  { key: 'currentStock', label: 'Stock' },
  { key: 'sellingPrice', label: 'Selling Price' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '' },
]

const filteredProducts = computed(() => {
  let data = products.value
  if (filterType.value) data = data.filter(p => p.type === filterType.value)
  if (filterStatus.value === 'active') data = data.filter(p => p.isActive)
  if (filterStatus.value === 'inactive') data = data.filter(p => !p.isActive)
  return data
})

const categoryOptions = [
  { value: 'Sofa', label: 'Sofa' },
  { value: 'Lemari', label: 'Lemari' },
  { value: 'Meja', label: 'Meja' },
  { value: 'Kursi', label: 'Kursi' },
  { value: 'Tempat Tidur', label: 'Tempat Tidur' },
  { value: 'Rak', label: 'Rak' },
]

const unitOptions = [
  { value: 'PCS', label: 'PCS' },
  { value: 'KG', label: 'KG' },
  { value: 'M', label: 'M' },
]

function formatCurrency(val: number) {
  if (!val) return '-'
  return 'Rp ' + val.toLocaleString('id-ID')
}

function editProduct(row: any) {
  editingProduct.value = row
  Object.assign(form, { ...row, sellingPrice: String(row.sellingPrice), minimumStock: String(row.minimumStock), targetStock: String(row.targetStock) })
  clearErrors()
  showForm.value = true
}

function confirmDelete(row: any) {
  deletingProduct.value = row
  showDelete.value = true
}

function saveProduct() {
  if (!validateAll(form)) return
  
  uiStore.addToast('success', editingProduct.value ? 'Product updated successfully.' : 'Product created successfully.')
  showForm.value = false
  editingProduct.value = null
  resetTouched()
}

function handleDelete() {
  uiStore.addToast('success', 'Product deleted.')
  deletingProduct.value = null
}
</script>
