<template>
  <div class="max-w-3xl">
    <PageHeader title="New Sales Order" />
    <AppCard class="mb-4">
      <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Order Information</p>
      <div class="grid grid-cols-2 gap-4">
        <AppSelect v-model="form.customer" label="Customer" :options="customerOptions" placeholder="Select customer" required />
        <AppInput v-model="form.orderDate" label="Order Date" type="date" />
      </div>
    </AppCard>

    <AppCard class="mb-4">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm font-semibold text-zinc-900 dark:text-white">Order Items</p>
        <AppButton variant="outline" size="sm" @click="addRow"><Plus class="w-3.5 h-3.5" />Add Product</AppButton>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-zinc-200 dark:border-zinc-800">
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Product</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium w-24">Qty</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium w-28">Available</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium w-32">Unit Price</th>
            <th class="w-10"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items" :key="i" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <td class="py-2 pr-2"><AppSelect v-model="item.product" :options="productOptions" placeholder="Select product" /></td>
            <td class="py-2 pr-2">
              <AppInput v-model="item.qty" type="number" placeholder="0" />
              <p v-if="item.qty && Number(item.qty) > getAvailable(item.product)" class="text-xs text-red-500 mt-0.5">Insufficient stock</p>
            </td>
            <td class="py-2 text-right text-sm" :class="getAvailable(item.product) <= 5 ? 'text-amber-500' : 'text-zinc-500'">
              {{ getAvailable(item.product) }} PCS
            </td>
            <td class="py-2 pr-2"><AppInput v-model="item.price" type="number" placeholder="0" /></td>
            <td class="py-2"><AppButton variant="ghost" size="sm" @click="removeRow(i)"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton></td>
          </tr>
          <tr v-if="items.length === 0"><td colspan="5" class="py-8 text-center text-sm text-zinc-400">No products.</td></tr>
        </tbody>
      </table>
      <div v-if="total > 0" class="flex justify-end pt-3 border-t border-zinc-100 dark:border-zinc-900 mt-2">
        <div class="text-sm">
          <span class="text-zinc-500 dark:text-zinc-400 mr-4">Total:</span>
          <span class="font-bold text-zinc-900 dark:text-white">Rp {{ total.toLocaleString('id-ID') }}</span>
        </div>
      </div>
    </AppCard>

    <div class="flex justify-end gap-2">
      <RouterLink to="/sales/orders"><AppButton variant="ghost">Cancel</AppButton></RouterLink>
      <AppButton variant="secondary" @click="saveDraft">Save Draft</AppButton>
      <AppButton @click="confirm">Confirm Order</AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Trash2 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppCard from '../../components/ui/AppCard.vue'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const form = reactive({ customer: '', orderDate: '2026-09-21' })
const items = ref<any[]>([])
const customerOptions = [
  { value: '1', label: 'PT Griya Indah Properti' },
  { value: '2', label: 'CV Toko Furnitur Makmur' },
  { value: '3', label: 'Hotel Bintang Lima' },
]
const productOptions = [
  { value: '1', label: 'Sofa 3 Seater Minimalis' },
  { value: '2', label: 'Lemari Pakaian 3 Pintu' },
  { value: '3', label: 'Meja Makan 6 Kursi' },
]
const availableStock: Record<string, number> = { '1': 10, '2': 8, '3': 17 }
function getAvailable(id: string) { return availableStock[id] ?? 0 }
function addRow() { items.value.push({ product: '', qty: '', price: '' }) }
function removeRow(i: number) { items.value.splice(i, 1) }
const total = computed(() => items.value.reduce((s, i) => s + (Number(i.qty) * Number(i.price) || 0), 0))
function saveDraft() { uiStore.addToast('success', 'Sales order saved as draft.') }
function confirm() { uiStore.addToast('success', 'Sales order confirmed. Stock reserved.') }
</script>
