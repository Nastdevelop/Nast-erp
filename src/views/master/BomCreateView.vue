<template>
  <div>
    <PageHeader title="Create BOM" description="Define bill of materials for a finished product" />

    <div class="max-w-3xl">
      <AppCard class="mb-4">
        <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Product Information</p>
        <div class="grid grid-cols-2 gap-4">
          <AppSelect v-model="form.product" label="Finished Product" :options="productOptions" placeholder="Select product" required />
          <AppInput v-model="form.version" label="BOM Version" placeholder="v1.0" required />
        </div>
      </AppCard>

      <AppCard class="mb-4">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-semibold text-zinc-900 dark:text-white">Material Requirements</p>
          <AppButton variant="outline" size="sm" @click="addRow">
            <Plus class="w-3.5 h-3.5" />Add Material
          </AppButton>
        </div>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-zinc-200 dark:border-zinc-800">
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Material</th>
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium w-28">Quantity</th>
              <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium w-28">Unit</th>
              <th class="w-10"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in items" :key="i" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
              <td class="py-2 pr-2">
                <AppSelect v-model="item.material" :options="materialOptions" placeholder="Select material" />
              </td>
              <td class="py-2 pr-2">
                <AppInput v-model="item.quantity" type="number" placeholder="0" />
              </td>
              <td class="py-2 pr-2">
                <AppSelect v-model="item.unit" :options="unitOptions" placeholder="Unit" />
              </td>
              <td class="py-2">
                <AppButton variant="ghost" size="sm" @click="removeRow(i)"><Trash2 class="w-3.5 h-3.5 text-red-400" /></AppButton>
              </td>
            </tr>
            <tr v-if="items.length === 0">
              <td colspan="4" class="py-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
                No materials added yet. Click "Add Material" to begin.
              </td>
            </tr>
          </tbody>
        </table>
      </AppCard>

      <div class="flex items-center gap-2 justify-end">
        <RouterLink to="/bom"><AppButton variant="ghost">Cancel</AppButton></RouterLink>
        <AppButton @click="save">Save BOM</AppButton>
      </div>
    </div>
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
import AppCard from '../../components/ui/AppCard.vue'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const form = reactive({ product: '', version: 'v1.0' })
const items = ref<{material:string; quantity:string; unit:string}[]>([])
const productOptions = [
  { value: '1', label: 'Sofa 3 Seater Minimalis' },
  { value: '2', label: 'Lemari Pakaian 3 Pintu' },
  { value: '3', label: 'Meja Makan 6 Kursi' },
]
const materialOptions = [
  { value: '1', label: 'Kayu Jati' },
  { value: '2', label: 'Busa Sofa' },
  { value: '3', label: 'Kain Oscar' },
  { value: '4', label: 'Lem Kayu Fox' },
  { value: '5', label: 'Multipleks 18mm' },
]
const unitOptions = [
  { value: 'KG', label: 'KG' },
  { value: 'M', label: 'M' },
  { value: 'PCS', label: 'PCS' },
  { value: 'LTR', label: 'LTR' },
]
function addRow() { items.value.push({ material: '', quantity: '', unit: '' }) }
function removeRow(i: number) { items.value.splice(i, 1) }
function save() { uiStore.addToast('success', 'BOM created successfully.') }
</script>
