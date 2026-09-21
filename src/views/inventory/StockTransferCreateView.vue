<template>
  <div class="max-w-3xl">
    <PageHeader title="New Stock Transfer" description="Transfer stock between warehouses" />
    <template v-if="loading">
      <div class="flex flex-col gap-4">
        <AppCard><Skeleton height="140px" /></AppCard>
        <AppCard><Skeleton height="200px" /></AppCard>
        <div class="flex justify-end gap-2"><Skeleton width="100px" height="36px" /><Skeleton width="140px" height="36px" /></div>
      </div>
    </template>
    <template v-else>
      <AppCard class="mb-4">
        <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Transfer Details</p>
        <div class="grid grid-cols-2 gap-4">
          <AppSelect v-model="form.source" label="Source Warehouse" :options="warehouseOptions" placeholder="Select source" required />
          <AppSelect v-model="form.destination" label="Destination Warehouse" :options="warehouseOptions" placeholder="Select destination" required />
        </div>
        <AppTextarea v-model="form.notes" label="Notes" placeholder="Transfer reason..." class="mt-4" :rows="2" />
      </AppCard>
      <AppCard class="mb-4">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-semibold text-zinc-900 dark:text-white">Items</p>
          <AppButton variant="outline" size="sm" @click="addRow"><Plus class="w-3.5 h-3.5" />Add Item</AppButton>
        </div>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800">
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Product</th>
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium w-32">Quantity</th>
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium w-24">Available</th>
              <th class="w-10"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in items" :key="i" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
              <td class="py-2 pr-2"><AppSelect v-model="item.product" :options="productOptions" placeholder="Select product" /></td>
              <td class="py-2 pr-2"><AppInput v-model="item.qty" type="number" placeholder="0" /></td>
              <td class="py-2 text-zinc-500 text-xs">120 KG</td>
              <td class="py-2"><AppButton variant="ghost" size="sm" @click="removeRow(i)"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton></td>
            </tr>
            <tr v-if="items.length === 0"><td colspan="4" class="py-8 text-center text-sm text-zinc-400">No items.</td></tr>
          </tbody>
        </table>
      </AppCard>
      <div class="flex justify-end gap-2">
        <RouterLink to="/inventory/transfers"><AppButton variant="ghost">Cancel</AppButton></RouterLink>
        <AppButton @click="save">Create Transfer</AppButton>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Trash2 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppTextarea from '../../components/ui/AppTextarea.vue'
import AppCard from '../../components/ui/AppCard.vue'
import Skeleton from '../../components/ui/Skeleton.vue'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
const loading = ref(true)
setTimeout(() => { loading.value = false }, 500)

const form = reactive({ source: '', destination: '', notes: '' })
const items = ref<any[]>([])
const warehouseOptions = [
  { value: '1', label: 'Gudang Bahan Baku Utama' },
  { value: '2', label: 'Gudang WIP Produksi' },
  { value: '3', label: 'Gudang Barang Jadi' },
]
const productOptions = [
  { value: '1', label: 'Kayu Jati (850 KG available)' },
  { value: '2', label: 'Busa Sofa (230 KG available)' },
  { value: '3', label: 'Kain Oscar (45 M available)' },
]
function addRow() { items.value.push({ product: '', qty: '' }) }
function removeRow(i: number) { items.value.splice(i, 1) }
function save() { uiStore.addToast('success', 'Transfer request created.') }
</script>
