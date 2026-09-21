<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <RouterLink to="/purchasing/requests" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <ArrowLeft class="w-4 h-4" />
          </RouterLink>
          <h1 class="text-xl font-semibold text-zinc-900 dark:text-white">PR-2026-002</h1>
          <StatusBadge status="SUBMITTED" />
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">Requested by Sari Dewi · September 15, 2026</p>
      </div>
      <div class="flex items-center gap-2">
        <AppButton variant="danger" size="sm" @click="showReject = true">
          <X class="w-3.5 h-3.5" />Reject
        </AppButton>
        <AppButton size="sm" @click="showApprove = true">
          <Check class="w-3.5 h-3.5" />Approve
        </AppButton>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mb-4">
      <AppCard>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">PR Number</p>
        <p class="font-mono font-semibold text-zinc-900 dark:text-white">PR-2026-002</p>
      </AppCard>
      <AppCard>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Status</p>
        <StatusBadge status="SUBMITTED" />
      </AppCard>
      <AppCard>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Request Date</p>
        <p class="font-medium text-zinc-900 dark:text-white">September 15, 2026</p>
      </AppCard>
    </div>

    <!-- Items -->
    <AppCard class="mb-4">
      <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Requested Items</p>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-zinc-200 dark:border-zinc-800">
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">#</th>
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Material</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Qty</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Unit Price</th>
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in prItems" :key="i" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <td class="py-2.5 text-zinc-500">{{ i+1 }}</td>
            <td class="py-2.5 text-zinc-800 dark:text-zinc-200">{{ item.material }}</td>
            <td class="py-2.5 text-right font-medium text-zinc-800 dark:text-zinc-200">{{ item.qty }} {{ item.unit }}</td>
            <td class="py-2.5 text-right text-zinc-600 dark:text-zinc-400">{{ item.price ? 'Rp '+item.price.toLocaleString('id-ID') : '-' }}</td>
            <td class="py-2.5 text-zinc-500">{{ item.notes || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </AppCard>

    <!-- Activity Log -->
    <AppCard class="mb-4">
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

    <!-- Approve Modal -->
    <ConfirmDialog
      v-model="showApprove"
      title="Approve Purchase Request"
      message="Are you sure you want to approve PR-2026-002? This will allow a Purchase Order to be created."
      confirm-label="Approve"
      @confirm="() => uiStore.addToast('success', 'Purchase request approved.')"
    />

    <!-- Reject Modal -->
    <AppModal v-model="showReject" title="Reject Purchase Request" size="sm">
      <div class="flex flex-col gap-3">
        <p class="text-sm text-zinc-600 dark:text-zinc-400">Please provide a reason for rejecting this request.</p>
        <AppTextarea v-model="rejectReason" label="Rejection Reason" placeholder="Enter reason..." required />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showReject = false">Cancel</AppButton>
        <AppButton variant="danger" @click="handleReject">Reject</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, Check, X } from 'lucide-vue-next'
import AppButton from '../../components/ui/AppButton.vue'
import AppCard from '../../components/ui/AppCard.vue'
import AppModal from '../../components/ui/AppModal.vue'
import AppTextarea from '../../components/ui/AppTextarea.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import ConfirmDialog from '../../components/ui/ConfirmDialog.vue'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const showApprove = ref(false)
const showReject = ref(false)
const rejectReason = ref('')
const prItems = [
  { material: 'Kayu Jati', qty: 200, unit: 'KG', price: 85000, notes: '' },
  { material: 'Busa Sofa Density 40', qty: 150, unit: 'KG', price: 32000, notes: 'Density 40 minimum' },
]
const activityLog = [
  { id: 1, message: 'Purchase request created by Sari Dewi', time: 'Sep 15, 2026 09:00', dotColor: 'bg-zinc-400' },
  { id: 2, message: 'Submitted for manager approval', time: 'Sep 15, 2026 09:15', dotColor: 'bg-amber-500' },
]
function handleReject() {
  uiStore.addToast('success', 'Purchase request rejected.')
  showReject.value = false
  rejectReason.value = ''
}
</script>
