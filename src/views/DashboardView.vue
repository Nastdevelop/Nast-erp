<template>
  <div>
    <PageHeader title="Dashboard" :description="`Good morning, ${authStore.user?.name}`" />

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Total Products"
        value="124"
        sub="6 low stock"
        :icon="Package"
        icon-bg="bg-zinc-100 dark:bg-zinc-800"
        icon-color="text-zinc-600 dark:text-zinc-300"
        :trend="3"
      />
      <StatCard
        label="Low Stock Alert"
        value="8"
        sub="Needs reorder"
        :icon="AlertTriangle"
        icon-bg="bg-amber-50 dark:bg-amber-950"
        icon-color="text-amber-500"
      />
      <StatCard
        label="Production Today"
        value="240"
        sub="units produced"
        :icon="Factory"
        icon-bg="bg-blue-50 dark:bg-blue-950"
        icon-color="text-blue-500"
        :trend="12"
      />
      <StatCard
        label="Pending Approval"
        value="5"
        sub="requires action"
        :icon="Clock"
        icon-bg="bg-amber-50 dark:bg-amber-950"
        icon-color="text-amber-500"
      />
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="Sales This Month"
        value="Rp 238M"
        sub="18 orders"
        :icon="ShoppingBag"
        icon-bg="bg-emerald-50 dark:bg-emerald-950"
        icon-color="text-emerald-500"
        :trend="8"
      />
      <StatCard
        label="Purchase Value"
        value="Rp 124M"
        sub="12 orders"
        :icon="ShoppingCart"
        icon-bg="bg-zinc-100 dark:bg-zinc-800"
        icon-color="text-zinc-500"
      />
      <StatCard
        label="Total Reject"
        value="14"
        sub="units this month"
        :icon="XCircle"
        icon-bg="bg-red-50 dark:bg-red-950"
        icon-color="text-red-500"
        :trend="-5"
      />
      <StatCard
        label="Est. Profit"
        value="Rp 68M"
        sub="this month"
        :icon="TrendingUp"
        icon-bg="bg-emerald-50 dark:bg-emerald-950"
        icon-color="text-emerald-500"
        :trend="15"
      />
    </div>

    <!-- Middle row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      <!-- Production Overview -->
      <AppCard class="lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-zinc-900 dark:text-white text-sm">Production This Month</h3>
          <AppBadge variant="info">September 2026</AppBadge>
        </div>
        <div class="space-y-3">
          <div v-for="item in productionOverview" :key="item.product">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm text-zinc-700 dark:text-zinc-300">{{ item.product }}</span>
              <span class="text-xs text-zinc-500 dark:text-zinc-400">{{ item.produced }}/{{ item.target }} PCS</span>
            </div>
            <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="item.produced >= item.target ? 'bg-emerald-500' : item.produced / item.target > 0.5 ? 'bg-blue-500' : 'bg-amber-500'"
                :style="{ width: Math.min(100, (item.produced / item.target) * 100) + '%' }"
              />
            </div>
          </div>
        </div>
      </AppCard>

      <!-- Inventory Alert -->
      <AppCard>
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-zinc-900 dark:text-white text-sm">Inventory Alert</h3>
          <RouterLink to="/inventory" class="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white">View all</RouterLink>
        </div>
        <div class="space-y-2">
          <div v-for="item in lowStockItems" :key="item.product" class="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <div>
              <p class="text-sm text-zinc-800 dark:text-zinc-200 font-medium">{{ item.product }}</p>
              <p class="text-xs text-zinc-500 dark:text-zinc-400">{{ item.warehouse }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold" :class="item.stock <= item.min ? 'text-red-500' : 'text-amber-500'">
                {{ item.stock }} {{ item.unit }}
              </p>
              <p class="text-xs text-zinc-400">min {{ item.min }}</p>
            </div>
          </div>
        </div>
      </AppCard>
    </div>

    <!-- Bottom row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Pending Approvals -->
      <AppCard>
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-zinc-900 dark:text-white text-sm">Pending Approvals</h3>
          <AppBadge variant="warning">5 pending</AppBadge>
        </div>
        <div class="space-y-2">
          <div v-for="item in pendingApprovals" :key="item.id" class="flex items-center gap-3 py-2 border-b border-zinc-100 dark:border-zinc-900 last:border-0">
            <div :class="['w-8 h-8 rounded-lg flex items-center justify-center shrink-0', item.iconBg]">
              <component :is="item.icon" class="w-4 h-4" :class="item.iconColor" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-zinc-800 dark:text-zinc-200 font-medium truncate">{{ item.title }}</p>
              <p class="text-xs text-zinc-500 dark:text-zinc-400">{{ item.sub }}</p>
            </div>
            <RouterLink :to="item.path" class="shrink-0">
              <AppButton variant="outline" size="sm">Review</AppButton>
            </RouterLink>
          </div>
        </div>
      </AppCard>

      <!-- Recent Activity -->
      <AppCard>
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-zinc-900 dark:text-white text-sm">Recent Activity</h3>
        </div>
        <div class="space-y-3">
          <div v-for="act in recentActivity" :key="act.id" class="flex items-start gap-3">
            <div class="w-1.5 h-1.5 rounded-full mt-2 shrink-0" :class="act.dotColor" />
            <div class="flex-1">
              <p class="text-sm text-zinc-700 dark:text-zinc-300">{{ act.message }}</p>
              <p class="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">{{ act.time }}</p>
            </div>
          </div>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Package, AlertTriangle, Factory, Clock, ShoppingBag, ShoppingCart,
  XCircle, TrendingUp, ClipboardList, CheckSquare
} from 'lucide-vue-next'
import PageHeader from '../components/ui/PageHeader.vue'
import StatCard from '../components/ui/StatCard.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppBadge from '../components/ui/AppBadge.vue'
import AppButton from '../components/ui/AppButton.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const productionOverview = [
  { product: 'Sofa 3 Seater Minimalis', produced: 10, target: 35 },
  { product: 'Lemari Pakaian 3 Pintu', produced: 0, target: 12 },
  { product: 'Kursi Makan Jati', produced: 33, target: 35 },
  { product: 'Tempat Tidur 160x200', produced: 0, target: 12 },
]

const lowStockItems = [
  { product: 'Lem Kayu Fox', warehouse: 'Gudang BB', stock: 12, min: 20, unit: 'KG' },
  { product: 'Kain Oscar', warehouse: 'Gudang BB', stock: 45, min: 30, unit: 'M' },
  { product: 'Tempat Tidur 160x200', warehouse: 'Gudang FG', stock: 3, min: 5, unit: 'PCS' },
  { product: 'Cat Dasar', warehouse: 'Gudang BB', stock: 28, min: 15, unit: 'LTR' },
]

const pendingApprovals = [
  { id: 1, title: 'PR-2026-002', sub: 'Purchase Request · 2 items', path: '/purchasing/requests/2', icon: ShoppingCart, iconBg: 'bg-blue-50 dark:bg-blue-950', iconColor: 'text-blue-500' },
  { id: 2, title: 'OP-2026-002', sub: 'Stock Opname · Gudang FG', path: '/inventory/opname/2', icon: CheckSquare, iconBg: 'bg-amber-50 dark:bg-amber-950', iconColor: 'text-amber-500' },
  { id: 3, title: 'TR-2026-003', sub: 'Stock Transfer · 2 items', path: '/inventory/transfers/3', icon: ClipboardList, iconBg: 'bg-zinc-100 dark:bg-zinc-800', iconColor: 'text-zinc-500' },
]

const recentActivity = [
  { id: 1, message: 'GR-2026-002 received — 30M Kain Oscar added to stock', time: '2 hours ago', dotColor: 'bg-emerald-500' },
  { id: 2, message: 'PRD-2026-001 production started', time: '3 hours ago', dotColor: 'bg-blue-500' },
  { id: 3, message: 'PO-2026-004 created by Sari Dewi', time: '5 hours ago', dotColor: 'bg-zinc-400' },
  { id: 4, message: 'SO-2026-003 confirmed — Hotel Bintang Lima', time: '6 hours ago', dotColor: 'bg-emerald-500' },
  { id: 5, message: 'PR-2026-003 submitted for approval', time: '8 hours ago', dotColor: 'bg-amber-500' },
  { id: 6, message: 'Stock Opname OP-2026-002 started', time: 'Yesterday', dotColor: 'bg-zinc-400' },
]
</script>
