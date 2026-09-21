<template>
  <div>
    <PageHeader title="Categories" description="Product categories" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Category</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="mockCategories" :loading="loading" empty-message="No categories found. Add your first category to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Category</AppButton>
      </template>
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'ACTIVE' : 'INACTIVE'" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <AppButton variant="ghost" size="sm" @click="edit(row)"><Pencil class="w-3.5 h-3.5" /></AppButton>
          <AppButton variant="ghost" size="sm"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
        </div>
      </template>
    </DataTable>
    <AppModal v-model="showForm" title="Category" size="sm">
      <div class="flex flex-col gap-4">
        <AppInput v-model="form.name" label="Name" placeholder="Sofa" />
        <AppTextarea v-model="form.description" label="Description" placeholder="Category description..." :rows="2" />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">Save</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppTextarea from '../../components/ui/AppTextarea.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockCategories } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const form = reactive({ name: '', description: '' })
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '' },
]
function edit(row: any) { Object.assign(form, row); showForm.value = true }
function save() { uiStore.addToast('success', 'Category saved.'); showForm.value = false }
</script>
