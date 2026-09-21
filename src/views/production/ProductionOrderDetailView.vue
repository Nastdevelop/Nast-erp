<template>
  <div class="max-w-4xl">
    <div class="flex items-start justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <RouterLink to="/production/orders" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <ArrowLeft class="w-4 h-4" />
          </RouterLink>
          <h1 class="text-xl font-semibold text-zinc-900 dark:text-white">PRD-2026-001</h1>
          <StatusBadge status="IN_PROGRESS" />
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">Sofa 3 Seater Minimalis · 35 PCS · Planned: Sep 25, 2026</p>
      </div>
      <div class="flex items-center gap-2">
        <AppButton variant="outline" size="sm"><ClipboardCheck class="w-3.5 h-3.5" />Material Check</AppButton>
        <AppButton size="sm" @click="showComplete = true"><CheckCircle class="w-3.5 h-3.5" />Record Result</AppButton>
      </div>
    </div>

    <!-- Info cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <AppCard><p class="text-xs text-zinc-500 mb-1">Product</p><p class="font-medium text-sm text-zinc-900 dark:text-white">Sofa 3 Seater</p></AppCard>
      <AppCard><p class="text-xs text-zinc-500 mb-1">Target Qty</p><p class="font-semibold text-zinc-900 dark:text-white">35 PCS</p></AppCard>
      <AppCard><p class="text-xs text-zinc-500 mb-1">Warehouse</p><p class="font-medium text-sm text-zinc-900 dark:text-white">WIP</p></AppCard>
      <AppCard><p class="text-xs text-zinc-500 mb-1">Status</p><StatusBadge status="IN_PROGRESS" /></AppCard>
    </div>

    <!-- Material Requirements -->
    <AppCard class="mb-4">
      <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Material Requirements (Snapshot)</p>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-zinc-200 dark:border-zinc-800">
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Material</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Required</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Reserved</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Consumed</th>
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mat in materials" :key="mat.name" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <td class="py-2.5 text-zinc-800 dark:text-zinc-200">{{ mat.name }}</td>
            <td class="py-2.5 text-right text-zinc-600 dark:text-zinc-400">{{ mat.required }} {{ mat.unit }}</td>
            <td class="py-2.5 text-right text-zinc-600 dark:text-zinc-400">{{ mat.reserved }} {{ mat.unit }}</td>
            <td class="py-2.5 text-right text-zinc-400">{{ mat.consumed }} {{ mat.unit }}</td>
            <td class="py-2.5">
              <AppBadge v-if="mat.reserved >= mat.required" variant="success">Ready</AppBadge>
              <AppBadge v-else variant="warning">Insufficient</AppBadge>
            </td>
          </tr>
        </tbody>
      </table>
    </AppCard>

    <!-- Activity Log -->
    <AppCard>
      <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Activity Log</p>
      <div class="space-y-3">
        <div v-for="log in activityLog" :key="log.id" class="flex items-start gap-3">
          <div class="w-1.5 h-1.5 rounded-full mt-2 shrink-0" :class="log.dotColor" />
          <div class="flex-1">
            <p class="text-sm text-zinc-700 dark:text-zinc-300">{{ log.message }}</p>
            <p class="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">{{ log.time }}</p>
          </div>
        </div>
      </div>
    </AppCard>

    <!-- Record result modal -->
    <AppModal v-model="showComplete" title="Record Production Result" size="md">
      <div class="flex flex-col gap-4">
        <div class="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Target Quantity</p>
          <p class="font-semibold text-zinc-900 dark:text-white">35 PCS</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <AppInput v-model="result.good" label="Good Quantity" type="number" placeholder="0" />
          <AppInput v-model="result.reject" label="Reject Quantity" type="number" placeholder="0" />
        </div>
        <AppSelect v-model="result.rejectReason" label="Reject Reason" :options="rejectReasons" placeholder="Select reason (if any)" />
        <AppTextarea v-model="result.notes" label="Notes" placeholder="Production notes..." :rows="2" />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showComplete = false">Cancel</AppButton>
        <AppButton @click="saveResult">Submit to QC</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ClipboardCheck, CheckCircle } from 'lucide-vue-next'
import AppButton from '../../components/ui/AppButton.vue'
import AppCard from '../../components/ui/AppCard.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import AppModal from '../../components/ui/AppModal.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppTextarea from '../../components/ui/AppTextarea.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const showComplete = ref(false)
const result = reactive({ good: '', reject: '', rejectReason: '', notes: '' })
const materials = [
  { name: 'Kayu Jati', required: 420, reserved: 420, consumed: 0, unit: 'KG' },
  { name: 'Busa Sofa Density 40', required: 525, reserved: 525, consumed: 0, unit: 'KG' },
  { name: 'Kain Oscar', required: 280, reserved: 280, consumed: 0, unit: 'M' },
  { name: 'Lem Kayu Fox', required: 35, reserved: 35, consumed: 0, unit: 'KG' },
]
const activityLog = [
  { id: 1, message: 'Production order created', time: 'Sep 20, 2026 09:00', dotColor: 'bg-zinc-400' },
  { id: 2, message: 'Material check completed', time: 'Sep 21, 2026 08:30', dotColor: 'bg-blue-500' },
  { id: 3, message: 'Material reservation confirmed — 1,260 KG total', time: 'Sep 21, 2026 08:45', dotColor: 'bg-emerald-500' },
  { id: 4, message: 'Production started by Hendra Kusuma', time: 'Sep 21, 2026 09:00', dotColor: 'bg-blue-500' },
]
const rejectReasons = [
  { value: 'MATERIAL_DEFECT', label: 'Material Defect' },
  { value: 'PRODUCTION_DEFECT', label: 'Production Defect' },
  { value: 'SIZE_NOT_MATCH', label: 'Size Not Match' },
  { value: 'COLOR_NOT_MATCH', label: 'Color Not Match' },
  { value: 'DAMAGE', label: 'Damage' },
  { value: 'OTHER', label: 'Other' },
]
function saveResult() {
  uiStore.addToast('success', 'Production result recorded. Sent to QC.')
  showComplete.value = false
}
</script>

