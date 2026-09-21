<template>
  <div class="max-w-3xl">
    <PageHeader title="New Purchase Request" description="Create a purchase request for materials" />
    <template v-if="loading">
      <div class="flex flex-col gap-4">
        <AppCard><Skeleton height="100px" /></AppCard>
        <AppCard><Skeleton height="200px" /></AppCard>
        <div class="flex justify-end gap-2"><Skeleton width="100px" height="36px" /><Skeleton width="140px" height="36px" /><Skeleton width="160px" height="36px" /></div>
      </div>
    </template>
    <template v-else>
      <AppCard class="mb-4">
        <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Request Information</p>
        <div class="grid grid-cols-2 gap-4">
          <AppInput v-model="form.date" label="Request Date" type="date" />
          <AppTextarea v-model="form.notes" label="Notes" placeholder="Additional notes..." :rows="1" />
        </div>
      </AppCard>

      <AppCard class="mb-4">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-semibold text-zinc-900 dark:text-white">Items</p>
          <AppButton variant="outline" size="sm" @click="addRow"><Plus class="w-3.5 h-3.5" />Add Item</AppButton>
        </div>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800">
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Material</th>
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium w-28">Qty</th>
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium w-28">Unit Price</th>
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Notes</th>
              <th class="w-10"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in items" :key="i" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
              <td class="py-2 pr-2"><AppSelect v-model="item.material" :options="materialOptions" placeholder="Select material" /></td>
              <td class="py-2 pr-2"><AppInput v-model="item.qty" type="number" placeholder="0" /></td>
              <td class="py-2 pr-2"><AppInput v-model="item.price" type="number" placeholder="0" /></td>
              <td class="py-2 pr-2"><AppInput v-model="item.notes" placeholder="Notes..." /></td>
              <td class="py-2"><AppButton variant="ghost" size="sm" @click="removeRow(i)"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton></td>
            </tr>
            <tr v-if="items.length === 0"><td colspan="5" class="py-8 text-center text-sm text-zinc-400">No items. Click "Add Item".</td></tr>
          </tbody>
        </table>
      </AppCard>

      <div class="flex items-center gap-2 justify-end">
        <RouterLink to="/purchasing/requests"><AppButton variant="ghost">Cancel</AppButton></RouterLink>
        <AppButton variant="secondary" @click="saveDraft">Save as Draft</AppButton>
        <AppButton @click="submit">Submit for Approval</AppButton>
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

const form = reactive({ date: '2026-09-21', notes: '' })
const items = ref<any[]>([])
const materialOptions = [
  { value: '1', label: 'Kayu Jati' },
  { value: '2', label: 'Busa Sofa Density 40' },
  { value: '3', label: 'Kain Oscar' },
  { value: '4', label: 'Lem Kayu Fox' },
]
function addRow() { items.value.push({ material: '', qty: '', price: '', notes: '' }) }
function removeRow(i: number) { items.value.splice(i, 1) }
function saveDraft() { uiStore.addToast('success', 'Purchase request saved as draft.') }
function submit() { uiStore.addToast('success', 'Purchase request submitted for approval.') }
</script>
