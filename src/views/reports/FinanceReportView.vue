<template>
  <div>
    <div class="flex items-center gap-2 mb-6">
      <RouterLink to="/reports" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"><ArrowLeft class="w-4 h-4" /></RouterLink>
      <PageHeader title="Finance Report" class="mb-0" />
    </div>
    <div class="grid grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Income" value="Rp 31.5M" :icon="TrendingUp" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" />
      <StatCard label="Total Expense" value="Rp 11.0M" :icon="TrendingDown" icon-bg="bg-red-50 dark:bg-red-950" icon-color="text-red-500" />
      <StatCard label="Production Cost" value="Rp 19.5M" :icon="Factory" icon-bg="bg-amber-50 dark:bg-amber-950" icon-color="text-amber-500" />
      <StatCard label="Est. Profit" value="Rp 20.5M" :icon="DollarSign" icon-bg="bg-blue-50 dark:bg-blue-950" icon-color="text-blue-500" />
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <AppCard>
        <p class="font-semibold text-sm text-zinc-900 dark:text-white mb-4">Income vs Expense</p>
        <div class="space-y-3">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-zinc-500">Income</span>
              <span class="text-xs font-medium text-emerald-600">Rp 31.5M</span>
            </div>
            <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full"><div class="h-full bg-emerald-500 rounded-full" style="width:74%"></div></div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs text-zinc-500">Expense</span>
              <span class="text-xs font-medium text-red-500">Rp 11.0M</span>
            </div>
            <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full"><div class="h-full bg-red-400 rounded-full" style="width:26%"></div></div>
          </div>
          <div class="pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Net</span>
              <span class="font-bold text-zinc-900 dark:text-white">Rp 20.5M</span>
            </div>
          </div>
        </div>
      </AppCard>
      <AppCard>
        <p class="font-semibold text-sm text-zinc-900 dark:text-white mb-4">Production Cost Breakdown</p>
        <div class="space-y-2">
          <div class="flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-900">
            <span class="text-sm text-zinc-600 dark:text-zinc-400">Material Cost</span>
            <span class="font-medium text-zinc-900 dark:text-white">Rp 14.3M</span>
          </div>
          <div class="flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-900">
            <span class="text-sm text-zinc-600 dark:text-zinc-400">Labor Cost</span>
            <span class="font-medium text-zinc-900 dark:text-white">Rp 3.15M</span>
          </div>
          <div class="flex items-center justify-between py-1.5">
            <span class="text-sm text-zinc-600 dark:text-zinc-400">Overhead</span>
            <span class="font-medium text-zinc-900 dark:text-white">Rp 2.09M</span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <span class="text-sm font-semibold text-zinc-900 dark:text-white">Total</span>
            <span class="font-bold text-zinc-900 dark:text-white">Rp 19.54M</span>
          </div>
        </div>
      </AppCard>
    </div>

    <DataTable :columns="columns" :data="mockTransactions">
      <template #cell-type="{ value }"><StatusBadge :status="value" /></template>
      <template #cell-amount="{ row }">
        <span :class="row.type === 'INCOME' ? 'text-emerald-600 font-semibold' : 'text-red-500 font-semibold'">
          {{ row.type === 'INCOME' ? '+' : '-' }}Rp {{ row.amount.toLocaleString('id-ID') }}
        </span>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Factory } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppCard from '../../components/ui/AppCard.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockTransactions } from '../../data/mock'
const columns = [{ key:'date',label:'Date'},{key:'type',label:'Type'},{key:'referenceType',label:'Ref Type'},{key:'reference',label:'Ref'},{key:'description',label:'Description'},{key:'amount',label:'Amount'}]
</script>
