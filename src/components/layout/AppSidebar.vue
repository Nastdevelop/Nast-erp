<template>
  <!-- Mobile overlay -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    @click="mobileOpen = false"
  />

  <aside
    :class="[
      'flex flex-col bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 shrink-0 z-50',
      collapsed ? 'w-16' : 'w-60',
      mobileOpen ? 'fixed inset-y-0 left-0' : 'hidden lg:flex'
    ]"
  >
    <!-- Logo -->
    <div class="h-14 flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
      <div class="flex items-center gap-2 overflow-hidden">
        <div class="w-7 h-7 bg-zinc-900 dark:bg-white rounded flex items-center justify-center shrink-0">
          <span class="text-white dark:text-zinc-900 text-xs font-bold">N</span>
        </div>
        <span v-if="!collapsed" class="font-semibold text-zinc-900 dark:text-white text-sm truncate">Nast ERP</span>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 overflow-y-auto py-3 scrollbar-thin">
      <div v-for="section in visibleNavSections" :key="section.title" class="mb-1">
        <div v-if="!collapsed" class="px-4 py-1.5">
          <span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            {{ section.title }}
          </span>
        </div>
        <div v-else class="border-t border-zinc-100 dark:border-zinc-800 my-1 mx-3"></div>

        <RouterLink
          v-for="item in section.items"
          :key="item.path"
          :to="item.path"
          :title="collapsed ? item.label : undefined"
          :class="[
            'flex items-center gap-3 px-3 mx-2 py-2 rounded-md text-sm transition-colors',
            isActive(item.path)
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
          ]"
        >
          <component :is="item.icon" class="w-4 h-4 shrink-0" />
          <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Collapse toggle -->
    <div class="h-12 border-t border-zinc-200 dark:border-zinc-800 flex items-center px-4 shrink-0">
      <button
        @click="toggleSidebar"
        class="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm"
      >
        <ChevronLeft v-if="!collapsed" class="w-4 h-4" />
        <ChevronRight v-else class="w-4 h-4" />
        <span v-if="!collapsed" class="text-xs">Collapse</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  LayoutDashboard, Package, Layers, Tag, Ruler, Truck, Users, Warehouse,
  ListTree, ShoppingCart, ClipboardList, ReceiptText, BoxesIcon, ArrowLeftRight,
  ClipboardCheck, Factory, BarChart3, CheckSquare, ShoppingBag, PackageCheck,
  DollarSign, TrendingUp, Calculator, FileBarChart, UserCog,
  ChevronLeft, ChevronRight
} from 'lucide-vue-next'
import { useUiStore } from '../../stores/ui'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const uiStore = useUiStore()
const authStore = useAuthStore()

const mobileOpen = ref(false)
const collapsed = computed(() => uiStore.sidebarCollapsed)

function toggleSidebar() {
  uiStore.toggleSidebar()
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

defineExpose({ toggleMobile })

function isActive(path: string) {
  return route.path === path || route.path.startsWith(path + '/')
}

const allSections = [
  {
    title: 'Overview',
    roles: ['ADMIN', 'MANAGER', 'PURCHASING', 'WAREHOUSE', 'PRODUCTION', 'FINANCE'],
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Master Data',
    roles: ['ADMIN', 'MANAGER'],
    items: [
      { label: 'Products', path: '/products', icon: Package },
      { label: 'Materials', path: '/materials', icon: Layers },
      { label: 'Categories', path: '/categories', icon: Tag },
      { label: 'Units', path: '/units', icon: Ruler },
      { label: 'Suppliers', path: '/suppliers', icon: Truck },
      { label: 'Customers', path: '/customers', icon: Users },
      { label: 'Warehouses', path: '/warehouses', icon: Warehouse },
      { label: 'BOM', path: '/bom', icon: ListTree },
    ]
  },
  {
    title: 'Purchasing',
    roles: ['ADMIN', 'MANAGER', 'PURCHASING'],
    items: [
      { label: 'Purchase Requests', path: '/purchasing/requests', icon: ShoppingCart },
      { label: 'Purchase Orders', path: '/purchasing/orders', icon: ClipboardList },
      { label: 'Goods Receipt', path: '/purchasing/receipts', icon: ReceiptText },
    ]
  },
  {
    title: 'Inventory',
    roles: ['ADMIN', 'MANAGER', 'WAREHOUSE'],
    items: [
      { label: 'Stock', path: '/inventory', icon: BoxesIcon },
      { label: 'Stock Movement', path: '/inventory/movements', icon: ArrowLeftRight },
      { label: 'Stock Transfer', path: '/inventory/transfers', icon: Truck },
      { label: 'Stock Opname', path: '/inventory/opname', icon: ClipboardCheck },
    ]
  },
  {
    title: 'Production',
    roles: ['ADMIN', 'MANAGER', 'PRODUCTION'],
    items: [
      { label: 'Planning', path: '/production/planning', icon: BarChart3 },
      { label: 'Production Orders', path: '/production/orders', icon: Factory },
      { label: 'Results', path: '/production/results', icon: CheckSquare },
      { label: 'Quality Control', path: '/production/qc', icon: CheckSquare },
    ]
  },
  {
    title: 'Sales',
    roles: ['ADMIN', 'MANAGER', 'PURCHASING'],
    items: [
      { label: 'Sales Orders', path: '/sales/orders', icon: ShoppingBag },
      { label: 'Deliveries', path: '/sales/deliveries', icon: PackageCheck },
    ]
  },
  {
    title: 'Finance',
    roles: ['ADMIN', 'MANAGER', 'FINANCE'],
    items: [
      { label: 'Transactions', path: '/finance/transactions', icon: DollarSign },
      { label: 'Production Cost', path: '/finance/production-cost', icon: TrendingUp },
      { label: 'HPP', path: '/finance/hpp', icon: Calculator },
    ]
  },
  {
    title: 'Reports',
    roles: ['ADMIN', 'MANAGER', 'FINANCE'],
    items: [
      { label: 'Reports', path: '/reports', icon: FileBarChart },
    ]
  },
  {
    title: 'Administration',
    roles: ['ADMIN'],
    items: [
      { label: 'Users', path: '/users', icon: UserCog },
    ]
  },
]

const visibleNavSections = computed(() => {
  const role = authStore.userRole
  if (!role) return allSections
  return allSections.filter(s => s.roles.includes(role))
})
</script>
