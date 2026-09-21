<template>
  <div>
    <PageHeader title="Reports" description="Business intelligence and operational reports" />

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <RouterLink v-for="report in reports" :key="report.title" :to="report.path"
        class="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group">
        <div class="flex items-start justify-between mb-3">
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', report.iconBg]">
            <component :is="report.icon" class="w-5 h-5" :class="report.iconColor" />
          </div>
          <ChevronRight class="w-4 h-4 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors" />
        </div>
        <p class="font-semibold text-zinc-900 dark:text-white mb-1">{{ report.title }}</p>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">{{ report.description }}</p>
        <div class="flex flex-wrap gap-1 mt-3">
          <span v-for="tag in report.tags" :key="tag" class="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded">{{ tag }}</span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { BoxesIcon, ShoppingCart, Factory, ShoppingBag, DollarSign, ChevronRight } from 'lucide-vue-next'
const reports = [
  {
    title: 'Inventory Report',
    description: 'Current stock, reserved stock, available stock, and low stock alerts.',
    path: '/reports/inventory',
    icon: BoxesIcon,
    iconBg: 'bg-zinc-100 dark:bg-zinc-800',
    iconColor: 'text-zinc-600 dark:text-zinc-300',
    tags: ['Stock', 'Movement', 'Low Stock'],
  },
  {
    title: 'Purchasing Report',
    description: 'Purchase requests, orders, and goods receipt history.',
    path: '/reports/purchasing',
    icon: ShoppingCart,
    iconBg: 'bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-500',
    tags: ['PR', 'PO', 'GR'],
  },
  {
    title: 'Production Report',
    description: 'Production orders, results, good vs reject, and material consumption.',
    path: '/reports/production',
    icon: Factory,
    iconBg: 'bg-amber-50 dark:bg-amber-950',
    iconColor: 'text-amber-500',
    tags: ['Orders', 'Results', 'QC'],
  },
  {
    title: 'Sales Report',
    description: 'Sales orders, deliveries, and customer purchase history.',
    path: '/reports/sales',
    icon: ShoppingBag,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950',
    iconColor: 'text-emerald-500',
    tags: ['Orders', 'Deliveries', 'Revenue'],
  },
  {
    title: 'Finance Report',
    description: 'Income, expense, production cost, HPP, and profit summary.',
    path: '/reports/finance',
    icon: DollarSign,
    iconBg: 'bg-purple-50 dark:bg-purple-950',
    iconColor: 'text-purple-500',
    tags: ['Income', 'Expense', 'Profit', 'HPP'],
  },
]
</script>
