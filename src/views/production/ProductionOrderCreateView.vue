<template>
  <div class="max-w-3xl">
    <PageHeader title="New Production Order" />
    <AppCard class="mb-4">
      <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Order Details</p>
      <div class="grid grid-cols-2 gap-4">
        <AppSelect v-model="form.product" label="Finished Product" :options="productOptions" placeholder="Select product" required />
        <AppInput v-model="form.quantity" label="Quantity (PCS)" type="number" placeholder="0" required />
        <AppSelect v-model="form.warehouse" label="Production Warehouse" :options="warehouseOptions" placeholder="Select warehouse" required />
        <AppInput v-model="form.plannedDate" label="Planned Date" type="date" required />
      </div>
    </AppCard>
    <AppCard class="mb-4" v-if="form.product">
      <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Material Requirement Preview</p>
      <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Based on active BOM. This will be snapshotted when the order is created.</p>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-zinc-200 dark:border-zinc-800">
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Material</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Per Unit</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Required</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Available</th>
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mat in previewMaterials" :key="mat.name" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <td class="py-2 text-zinc-800 dark:text-zinc-200">{{ mat.name }}</td>
            <td class="py-2 text-right text-zinc-500">{{ mat.perUnit }} {{ mat.unit }}</td>
            <td class="py-2 text-right font-medium text-zinc-800 dark:text-zinc-200">{{ mat.required }} {{ mat.unit }}</td>
            <td class="py-2 text-right" :class="mat.available >= mat.required ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'">
              {{ mat.available }} {{ mat.unit }}
            </td>
            <td class="py-2">
              <AppBadge v-if="mat.available >= mat.required" variant="success">OK</AppBadge>
              <AppBadge v-else variant="danger">Short {{ mat.required - mat.available }} {{ mat.unit }}</AppBadge>
            </td>
          </tr>
        </tbody>
      </table>
    </AppCard>
    <div class="flex justify-end gap-2">
      <RouterLink to="/production/orders"><AppButton variant="ghost">Cancel</AppButton></RouterLink>
      <AppButton @click="save">Create Production Order</AppButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppCard from '../../components/ui/AppCard.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const form = reactive({ product: '1', quantity: '35', warehouse: '2', plannedDate: '2026-09-25' })
const productOptions = [
  { value: '1', label: 'Sofa 3 Seater Minimalis' },
  { value: '2', label: 'Lemari Pakaian 3 Pintu' },
  { value: '3', label: 'Meja Makan 6 Kursi' },
]
const warehouseOptions = [{ value: '2', label: 'Gudang WIP Produksi' }]
const previewMaterials = computed(() => {
  const qty = Number(form.quantity) || 1
  return [
    { name: 'Kayu Jati', perUnit: 12, required: 12*qty, available: 850, unit: 'KG' },
    { name: 'Busa Sofa Density 40', perUnit: 15, required: 15*qty, available: 230, unit: 'KG' },
    { name: 'Kain Oscar', perUnit: 8, required: 8*qty, available: 45, unit: 'M' },
    { name: 'Lem Kayu Fox', perUnit: 1, required: 1*qty, available: 12, unit: 'KG' },
  ]
})
function save() { uiStore.addToast('success', 'Production order created.') }
</script>
