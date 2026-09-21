<template>
  <div class="max-w-4xl">
    <div class="flex items-start justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <RouterLink to="/purchasing/orders" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <ArrowLeft class="w-4 h-4" />
          </RouterLink>
          <template v-if="loading">
            <Skeleton width="160px" height="1.5rem" />
            <Skeleton width="100px" height="1.25rem" rounded="full" />
          </template>
          <template v-else>
            <h1 class="text-xl font-semibold text-zinc-900 dark:text-white">PO-2026-002</h1>
            <StatusBadge status="SENT" />
          </template>
        </div>
        <template v-if="!loading">
          <p class="text-sm text-zinc-500 dark:text-zinc-400">CV Busa Sejahtera · Order Date: September 16, 2026</p>
        </template>
      </div>
      <div class="flex items-center gap-2">
        <RouterLink to="/purchasing/receipts">
          <AppButton variant="outline" size="sm"><ReceiptText class="w-3.5 h-3.5" />Receive Goods</AppButton>
        </RouterLink>
        <AppButton size="sm"><Send class="w-3.5 h-3.5" />Mark as Sent</AppButton>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <AppCard :loading="loading">
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Supplier</p>
        <p class="font-medium text-zinc-900 dark:text-white text-sm">CV Busa Sejahtera</p>
      </AppCard>
      <AppCard :loading="loading">
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Order Date</p>
        <p class="font-medium text-zinc-900 dark:text-white text-sm">Sep 16, 2026</p>
      </AppCard>
      <AppCard :loading="loading">
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Expected</p>
        <p class="font-medium text-zinc-900 dark:text-white text-sm">Sep 23, 2026</p>
      </AppCard>
      <AppCard :loading="loading">
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total Value</p>
        <p class="font-semibold text-zinc-900 dark:text-white">Rp 4.200.000</p>
      </AppCard>
    </div>

    <AppCard class="mb-4" :loading="loading">
      <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Order Items</p>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-zinc-200 dark:border-zinc-800">
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Material</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Ordered</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Received</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Unit Price</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in poItems" :key="i" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <td class="py-2.5 text-zinc-800 dark:text-zinc-200">{{ item.material }}</td>
            <td class="py-2.5 text-right text-zinc-700 dark:text-zinc-300">{{ item.ordered }} {{ item.unit }}</td>
            <td class="py-2.5 text-right">
              <span :class="item.received === 0 ? 'text-zinc-400' : item.received >= item.ordered ? 'text-emerald-600' : 'text-amber-500'">
                {{ item.received }} {{ item.unit }}
              </span>
            </td>
            <td class="py-2.5 text-right text-zinc-600 dark:text-zinc-400">Rp {{ item.price.toLocaleString('id-ID') }}</td>
            <td class="py-2.5 text-right font-medium text-zinc-800 dark:text-zinc-200">Rp {{ (item.ordered * item.price).toLocaleString('id-ID') }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t border-zinc-200 dark:border-zinc-800">
            <td colspan="4" class="pt-3 text-right font-semibold text-zinc-700 dark:text-zinc-300 text-sm">Total</td>
            <td class="pt-3 text-right font-bold text-zinc-900 dark:text-white">Rp 4.200.000</td>
          </tr>
        </tfoot>
      </table>
    </AppCard>

    <!-- Activity Log -->
    <AppCard :loading="loading">
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
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ReceiptText, Send } from 'lucide-vue-next'
import AppButton from '../../components/ui/AppButton.vue'
import AppCard from '../../components/ui/AppCard.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import Skeleton from '../../components/ui/Skeleton.vue'

const loading = ref(true)
setTimeout(() => { loading.value = false }, 500)

const poItems = [
  { material: 'Busa Sofa Density 40', ordered: 100, received: 0, unit: 'KG', price: 32000 },
  { material: 'Busa Sofa Density 30', ordered: 50, received: 0, unit: 'KG', price: 28000 },
]
const activityLog = [
  { id: 1, message: 'PO created based on PR-2026-001', time: 'Sep 16, 2026 11:00', dotColor: 'bg-zinc-400' },
  { id: 2, message: 'PO sent to supplier', time: 'Sep 16, 2026 14:00', dotColor: 'bg-blue-500' },
]
</script>
