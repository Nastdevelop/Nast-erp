<template>
  <div>
    <PageHeader title="Materials" description="Raw materials used in production" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Material</AppButton>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :data="mockMaterials" search-placeholder="Search materials..." :loading="loading" empty-message="No materials found. Add your first material to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Material</AppButton>
      </template>
      <template #cell-code="{ value }">
        <span class="font-mono text-xs text-zinc-600 dark:text-zinc-400">{{ value }}</span>
      </template>
      <template #cell-currentStock="{ row }">
        <span :class="row.currentStock < row.minimumStock ? 'text-red-500 font-medium' : ''">{{ row.currentStock }} {{ row.unit }}</span>
      </template>
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'ACTIVE' : 'INACTIVE'" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <AppButton variant="ghost" size="sm" @click="editItem(row)"><Pencil class="w-3.5 h-3.5" /></AppButton>
          <AppButton variant="ghost" size="sm"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
        </div>
      </template>
    </DataTable>

    <AppModal v-model="showForm" title="Add Material" size="md">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-3">
          <AppInput v-model="form.code" label="Code" placeholder="RM-001" />
          <AppInput v-model="form.name" label="Material Name" placeholder="Kayu Jati" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <AppSelect v-model="form.unit" label="Unit" :options="[{value:'KG',label:'KG'},{value:'M',label:'M'},{value:'PCS',label:'PCS'},{value:'LTR',label:'LTR'}]" placeholder="Select unit" />
          <AppInput v-model="form.minimumStock" label="Min Stock" type="number" placeholder="0" />
        </div>
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">Save Material</AppButton>
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
import AppSelect from '../../components/ui/AppSelect.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockMaterials } from '../../data/mock'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const form = reactive({ code: '', name: '', unit: '', minimumStock: '' })

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Material Name' },
  { key: 'category', label: 'Category' },
  { key: 'unit', label: 'Unit' },
  { key: 'minimumStock', label: 'Min Stock' },
  { key: 'currentStock', label: 'Current Stock' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '' },
]

function editItem(row: any) { Object.assign(form, row); showForm.value = true }
function save() { uiStore.addToast('success', 'Material saved.'); showForm.value = false }
</script>
