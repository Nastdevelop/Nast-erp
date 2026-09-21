<template>
  <div class="max-w-4xl">
    <div class="flex items-start justify-between mb-6">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <RouterLink to="/sales/orders" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
            <ArrowLeft class="w-4 h-4" />
          </RouterLink>
          <h1 class="text-xl font-semibold text-zinc-900 dark:text-white">SO-2026-002</h1>
          <StatusBadge status="PARTIAL" />
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">CV Toko Furnitur Makmur · September 16, 2026</p>
      </div>
      <div class="flex items-center gap-2">
        <RouterLink to="/sales/deliveries">
          <AppButton variant="outline" size="sm"><PackageCheck class="w-3.5 h-3.5" />Create Delivery</AppButton>
        </RouterLink>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4 mb-4">
      <AppCard><p class="text-xs text-zinc-500 mb-1">Customer</p><p class="font-medium text-sm text-zinc-900 dark:text-white">CV Toko Furnitur Makmur</p></AppCard>
      <AppCard><p class="text-xs text-zinc-500 mb-1">Order Date</p><p class="font-medium text-sm text-zinc-900 dark:text-white">Sep 16, 2026</p></AppCard>
      <AppCard><p class="text-xs text-zinc-500 mb-1">Total</p><p class="font-bold text-zinc-900 dark:text-white">Rp 27.600.000</p></AppCard>
    </div>
    <AppCard class="mb-4">
      <p class="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Order Items</p>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-zinc-200 dark:border-zinc-800">
            <th class="text-left text-xs text-zinc-500 uppercase pb-2 font-medium">Product</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Ordered</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Reserved</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Delivered</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Unit Price</th>
            <th class="text-right text-xs text-zinc-500 uppercase pb-2 font-medium">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in soItems" :key="item.product" class="border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <td class="py-2.5 text-zinc-800 dark:text-zinc-200">{{ item.product }}</td>
            <td class="py-2.5 text-right">{{ item.ordered }} PCS</td>
            <td class="py-2.5 text-right text-blue-500">{{ item.reserved }} PCS</td>
            <td class="py-2.5 text-right" :class="item.delivered >= item.ordered ? 'text-emerald-600' : 'text-amber-500'">{{ item.delivered }} PCS</td>
            <td class="py-2.5 text-right text-zinc-500">Rp {{ item.price.toLocaleString('id-ID') }}</td>
            <td class="py-2.5 text-right font-medium">Rp {{ (item.ordered * item.price).toLocaleString('id-ID') }}</td>
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
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft, PackageCheck } from 'lucide-vue-next'
import AppButton from '../../components/ui/AppButton.vue'
import AppCard from '../../components/ui/AppCard.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
const soItems = [
  { product: 'Sofa 3 Seater Minimalis', ordered: 3, reserved: 3, delivered: 2, price: 4500000 },
  { product: 'Lemari Pakaian 3 Pintu', ordered: 2, reserved: 2, delivered: 2, price: 3200000 },
  { product: 'Meja Makan 6 Kursi', ordered: 2, reserved: 2, delivered: 0, price: 5800000 },
]
const activityLog = [
  { id: 1, message: 'Sales order created by Sari Dewi', time: 'Sep 16, 2026 10:00', dotColor: 'bg-zinc-400' },
  { id: 2, message: 'Order confirmed — stock reserved for all items', time: 'Sep 16, 2026 10:15', dotColor: 'bg-emerald-500' },
  { id: 3, message: 'Partial delivery completed — 2 items delivered', time: 'Sep 19, 2026 14:30', dotColor: 'bg-blue-500' },
]
</script>
