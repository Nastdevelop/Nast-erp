<template>
  <div>
    <PageHeader title="Customers" description="Manage customer data" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Customer</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="mockCustomers" search-placeholder="Search customers..." :loading="loading" empty-message="No customers found. Add your first customer to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Customer</AppButton>
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
          <AppButton variant="ghost" size="sm"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
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
        <AppButton @click="save">Save Customer</AppButton>
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
import { mockCustomers } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const form = reactive({ code: '', name: '', phone: '', email: '', address: '' })
const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '' },
]
function edit(row: any) { Object.assign(form, row); showForm.value = true }
function save() { uiStore.addToast('success', 'Customer saved.'); showForm.value = false }
</script>
