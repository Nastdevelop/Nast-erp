<template>
  <div>
    <PageHeader title="Units of Measure" description="Units used for products and materials" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Unit</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="mockUnits" :loading="loading" empty-message="No units found. Add your first unit to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Unit</AppButton>
      </template>
      <template #cell-symbol="{ value }">
        <span class="font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{{ value }}</span>
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <AppButton variant="ghost" size="sm" @click="edit(row)"><Pencil class="w-3.5 h-3.5" /></AppButton>
          <AppButton variant="ghost" size="sm"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
        </div>
      </template>
    </DataTable>
    <AppModal v-model="showForm" title="Unit" size="sm">
      <div class="flex flex-col gap-3">
        <AppInput v-model="form.name" label="Name" placeholder="Kilogram" />
        <AppInput v-model="form.symbol" label="Symbol" placeholder="KG" />
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
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import { mockUnits } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const form = reactive({ name: '', symbol: '' })
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'symbol', label: 'Symbol' },
  { key: 'actions', label: '' },
]
function edit(row: any) { Object.assign(form, row); showForm.value = true }
function save() { uiStore.addToast('success', 'Unit saved.'); showForm.value = false }
</script>
