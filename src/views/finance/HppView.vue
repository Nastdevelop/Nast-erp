<template>
  <div>
    <PageHeader title="HPP — Harga Pokok Produksi" description="Cost of goods manufactured per product" />

    <div class="grid grid-cols-1 gap-4">
      <AppCard v-for="item in hppData" :key="item.product">
        <div class="flex items-start justify-between mb-4">
          <div>
            <p class="font-semibold text-zinc-900 dark:text-white">{{ item.product }}</p>
            <p class="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">{{ item.orderRef }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-zinc-500 dark:text-zinc-400">HPP per Unit</p>
            <p class="text-xl font-bold text-zinc-900 dark:text-white">Rp {{ item.hpp.toLocaleString('id-ID') }}</p>
          </div>
        </div>

        <div class="grid grid-cols-4 gap-3">
          <div class="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3">
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Material Cost</p>
            <p class="font-semibold text-zinc-900 dark:text-white">Rp {{ item.materialCost.toLocaleString('id-ID') }}</p>
            <p class="text-xs text-zinc-400 mt-0.5">{{ Math.round(item.materialCost / item.totalCost * 100) }}% of total</p>
          </div>
          <div class="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3">
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Labor Cost</p>
            <p class="font-semibold text-zinc-900 dark:text-white">Rp {{ item.laborCost.toLocaleString('id-ID') }}</p>
            <p class="text-xs text-zinc-400 mt-0.5">{{ Math.round(item.laborCost / item.totalCost * 100) }}% of total</p>
          </div>
          <div class="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3">
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Overhead</p>
            <p class="font-semibold text-zinc-900 dark:text-white">Rp {{ item.overhead.toLocaleString('id-ID') }}</p>
            <p class="text-xs text-zinc-400 mt-0.5">{{ Math.round(item.overhead / item.totalCost * 100) }}% of total</p>
          </div>
          <div class="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total Cost</p>
            <p class="font-bold text-zinc-900 dark:text-white">Rp {{ item.totalCost.toLocaleString('id-ID') }}</p>
            <p class="text-xs text-zinc-400 mt-0.5">{{ item.qty }} units</p>
          </div>
        </div>

        <!-- Cost bar -->
        <div class="mt-4">
          <div class="flex h-2 rounded-full overflow-hidden gap-0.5">
            <div class="bg-zinc-600 dark:bg-zinc-400 rounded-l-full" :style="{ width: (item.materialCost / item.totalCost * 100) + '%' }" />
            <div class="bg-blue-500" :style="{ width: (item.laborCost / item.totalCost * 100) + '%' }" />
            <div class="bg-amber-500 rounded-r-full" :style="{ width: (item.overhead / item.totalCost * 100) + '%' }" />
          </div>
          <div class="flex items-center gap-4 mt-2">
            <div class="flex items-center gap-1"><div class="w-2 h-2 bg-zinc-600 dark:bg-zinc-400 rounded-full"></div><span class="text-xs text-zinc-500">Material</span></div>
            <div class="flex items-center gap-1"><div class="w-2 h-2 bg-blue-500 rounded-full"></div><span class="text-xs text-zinc-500">Labor</span></div>
            <div class="flex items-center gap-1"><div class="w-2 h-2 bg-amber-500 rounded-full"></div><span class="text-xs text-zinc-500">Overhead</span></div>
          </div>
        </div>
      </AppCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppCard from '../../components/ui/AppCard.vue'
import { api } from '../../services/api'

const hppData = ref<any[]>([])
onMounted(async () => {
  try {
    const res = await api.get('/reports/hpp')
    hppData.value = (res.data.data?.rows ?? []).map((r: any) => ({
      product: r.product,
      orderRef: r.orderCode,
      qty: r.goodQuantity,
      materialCost: r.materialCost,
      laborCost: 0,
      overhead: 0,
      totalCost: r.materialCost,
      hpp: r.hppPerUnit,
    }))
  } catch {}
})
</script>
