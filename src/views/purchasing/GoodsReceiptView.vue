<template>
  <div>
    <PageHeader title="Goods Receipt" description="Record received goods from purchase orders" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New Receipt</AppButton>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :data="mockGoodsReceipts" :loading="loading" empty-message="No goods receipts found. Create your first receipt to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />New Receipt</AppButton>
      </template>
      <template #cell-number="{ value }">
        <span class="font-mono text-sm font-medium text-zinc-900 dark:text-white">{{ value }}</span>
      </template>
      <template #cell-actions="{ row }">
        <RouterLink :to="`/purchasing/receipts/${row.id}`">
          <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
        </RouterLink>
      </template>
    </DataTable>

    <AppModal v-model="showForm" title="New Goods Receipt" size="lg">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-3">
          <AppSelect v-model="form.po" label="Purchase Order" :options="poOptions" placeholder="Select PO" required />
          <AppSelect v-model="form.warehouse" label="Warehouse" :options="warehouseOptions" placeholder="Select warehouse" required />
        </div>
        <AppInput v-model="form.receivedAt" label="Received Date" type="date" />
        <div class="border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <p class="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Items to Receive</p>
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-zinc-200 dark:border-zinc-800">
                <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Material</th>
                <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Ordered</th>
                <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Receive Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in receiptItems" :key="i" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
                <td class="py-2 text-zinc-700 dark:text-zinc-300">{{ item.material }}</td>
                <td class="py-2 text-right text-zinc-500">{{ item.ordered }} {{ item.unit }}</td>
                <td class="py-2">
                  <AppInput v-model="item.receive" type="number" :placeholder="String(item.ordered)" class="text-right" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">Save Receipt</AppButton>
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
import AppInput from '../../components/ui/AppInput.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import { mockGoodsReceipts } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const form = reactive({ po: '', warehouse: '', receivedAt: '2026-09-21' })
const columns = [
  { key: 'number', label: 'GR Number' },
  { key: 'purchaseOrder', label: 'PO Reference' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'receivedBy', label: 'Received By' },
  { key: 'receivedAt', label: 'Date' },
  { key: 'items', label: 'Items' },
  { key: 'actions', label: '' },
]
const poOptions = [{ value: '1', label: 'PO-2026-002' }, { value: '2', label: 'PO-2026-003' }]
const warehouseOptions = [{ value: '1', label: 'Gudang Bahan Baku Utama' }]
const receiptItems = ref([
  { material: 'Busa Sofa Density 40', ordered: 100, unit: 'KG', receive: '100' },
  { material: 'Busa Sofa Density 30', ordered: 50, unit: 'KG', receive: '50' },
])
function save() { uiStore.addToast('success', 'Goods receipt saved. Stock updated.'); showForm.value = false }
</script>
