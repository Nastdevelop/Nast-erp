<template>
  <div>
    <PageHeader title="Deliveries" description="Track shipments to customers" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New Delivery</AppButton>
      </template>
    </PageHeader>
    <DataTable :columns="columns" :data="mockDeliveries" :loading="loading" empty-message="No deliveries found. Create your first delivery to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New Delivery</AppButton>
      </template>
      <template #cell-number="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-actions="{ row }">
        <RouterLink :to="`/sales/deliveries/${row.id}`">
          <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
        </RouterLink>
      </template>
    </DataTable>

    <AppModal v-model="showForm" title="New Delivery" size="md">
      <div class="flex flex-col gap-4">
        <AppSelect v-model="form.so" label="Sales Order" :options="soOptions" placeholder="Select SO" required />
        <AppSelect v-model="form.warehouse" label="From Warehouse" :options="[{ value:'3', label:'Gudang Barang Jadi' }]" placeholder="Select warehouse" required />
        <AppInput v-model="form.deliveredAt" label="Delivery Date" type="date" />
        <p class="text-xs text-zinc-500 dark:text-zinc-400">Items will be loaded from the selected sales order.</p>
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">Create Delivery</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import { mockDeliveries } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const form = reactive({ so: '', warehouse: '3', deliveredAt: '2026-09-21' })
const columns = [
  { key: 'number', label: 'Delivery #' },
  { key: 'salesOrder', label: 'Sales Order' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'deliveredBy', label: 'Delivered By' },
  { key: 'deliveredAt', label: 'Date' },
  { key: 'items', label: 'Items' },
  { key: 'actions', label: '' },
]
const soOptions = [
  { value: '2', label: 'SO-2026-002 · CV Toko Furnitur' },
  { value: '3', label: 'SO-2026-003 · Hotel Bintang Lima' },
]
function save() { uiStore.addToast('success', 'Delivery created. Stock updated.'); showForm.value = false }
</script>
