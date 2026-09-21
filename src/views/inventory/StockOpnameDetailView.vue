<template>
  <div class="max-w-4xl">
    <div class="flex items-start justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <RouterLink to="/inventory/opname" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <ArrowLeft class="w-4 h-4" />
          </RouterLink>
          <template v-if="loading">
            <Skeleton width="160px" height="1.5rem" />
            <Skeleton width="100px" height="1.25rem" rounded="full" />
          </template>
          <template v-else>
            <h1 class="text-xl font-semibold text-zinc-900 dark:text-white">OP-2026-002</h1>
            <StatusBadge status="COUNTING" />
          </template>
        </div>
        <template v-if="!loading">
          <p class="text-sm text-zinc-500 dark:text-zinc-400">Gudang Barang Jadi · Created by Andi Wijaya · September 20, 2026</p>
        </template>
      </div>
      <div class="flex items-center gap-2">
        <AppButton variant="outline" size="sm" @click="showApprove = true">
          <CheckSquare class="w-3.5 h-3.5" />Submit for Approval
        </AppButton>
      </div>
    </div>

    <AppCard :loading="loading">
      <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Physical Count</p>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-zinc-200 dark:border-zinc-800">
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Product</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">System Qty</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Physical Qty</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Difference</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in opnameItems" :key="item.product" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <td class="py-2.5 text-zinc-800 dark:text-zinc-200">{{ item.product }}</td>
            <td class="py-2.5 text-right text-zinc-600 dark:text-zinc-400">{{ item.systemQty }} {{ item.unit }}</td>
            <td class="py-2.5">
              <div class="flex justify-end">
                <AppInput v-model="item.physicalQty" type="number" class="w-24 text-right" />
              </div>
            </td>
            <td class="py-2.5 text-right font-semibold">
              <span :class="getDiff(item) === 0 ? 'text-zinc-400' : getDiff(item) > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'">
                {{ getDiff(item) >= 0 ? '+' : '' }}{{ getDiff(item) }} {{ item.unit }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-4">
        <AppButton size="sm" @click="save">Save Count</AppButton>
      </div>
    </AppCard>

    <!-- Activity Log -->
    <AppCard class="mt-4" :loading="loading">
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

    <ConfirmDialog
      v-model="showApprove"
      title="Submit for Approval"
      message="Submit this stock opname for manager approval? Adjustments will be applied after approval."
      confirm-label="Submit"
      @confirm="() => uiStore.addToast('success', 'Opname submitted for approval.')"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, CheckSquare } from 'lucide-vue-next'
import AppButton from '../../components/ui/AppButton.vue'
import AppCard from '../../components/ui/AppCard.vue'
import AppInput from '../../components/ui/AppInput.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import ConfirmDialog from '../../components/ui/ConfirmDialog.vue'
import Skeleton from '../../components/ui/Skeleton.vue'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
const loading = ref(true)
const showApprove = ref(false)

setTimeout(() => { loading.value = false }, 500)

const opnameItems = reactive([
  { product: 'Sofa 3 Seater Minimalis', systemQty: 15, physicalQty: '15', unit: 'PCS' },
  { product: 'Lemari Pakaian 3 Pintu', systemQty: 8, physicalQty: '7', unit: 'PCS' },
  { product: 'Meja Makan 6 Kursi', systemQty: 20, physicalQty: '20', unit: 'PCS' },
  { product: 'Kursi Makan Jati', systemQty: 45, physicalQty: '44', unit: 'PCS' },
  { product: 'Tempat Tidur 160x200', systemQty: 3, physicalQty: '3', unit: 'PCS' },
])
const activityLog = [
  { id: 1, message: 'Stock opname started by Andi Wijaya', time: 'Sep 20, 2026 08:00', dotColor: 'bg-zinc-400' },
  { id: 2, message: 'Physical counting in progress', time: 'Sep 20, 2026 08:30', dotColor: 'bg-blue-500' },
]
function getDiff(item: any) { return Number(item.physicalQty) - item.systemQty }
function save() { uiStore.addToast('success', 'Count saved.') }
</script>
