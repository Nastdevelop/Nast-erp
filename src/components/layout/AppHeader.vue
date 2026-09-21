<template>
  <header class="h-14 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-4 shrink-0">
    <!-- Mobile menu button -->
    <button
      @click="$emit('toggle-mobile')"
      class="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white lg:hidden"
    >
      <Menu class="w-5 h-5" />
    </button>

    <!-- Breadcrumb -->
    <div class="flex-1 flex items-center gap-1.5 text-sm">
      <span class="text-zinc-400 dark:text-zinc-600">
        <component :is="currentSection?.icon" class="w-3.5 h-3.5" />
      </span>
      <template v-for="(crumb, i) in breadcrumbs" :key="crumb.path">
        <span v-if="i > 0" class="text-zinc-300 dark:text-zinc-700">/</span>
        <RouterLink
          v-if="i < breadcrumbs.length - 1"
          :to="crumb.path"
          class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="text-zinc-900 dark:text-white font-medium">{{ crumb.label }}</span>
      </template>
    </div>

    <!-- Right side -->
    <div class="flex items-center gap-2">
      <!-- Search -->
      <button class="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-md text-sm transition-colors">
        <Search class="w-3.5 h-3.5" />
        <span class="hidden sm:block text-xs text-zinc-400">Quick search...</span>
      </button>

      <!-- Notifications -->
      <button class="relative p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <Bell class="w-4 h-4" />
        <span class="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
      </button>

      <!-- Theme toggle -->
      <button
        @click="themeStore.toggle()"
        class="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <Sun v-if="themeStore.isDark" class="w-4 h-4" />
        <Moon v-else class="w-4 h-4" />
      </button>

      <!-- User -->
      <div class="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
        <div class="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
          <span class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            {{ initials }}
          </span>
        </div>
        <div class="hidden sm:block">
          <p class="text-xs font-medium text-zinc-900 dark:text-white leading-none">{{ authStore.user?.name }}</p>
          <p class="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{{ authStore.user?.role }}</p>
        </div>
        <button
          @click="handleLogout"
          class="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-red-500 transition-colors rounded"
          title="Logout"
        >
          <LogOut class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { Search, Bell, Moon, Sun, LogOut, Menu } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'
import { useThemeStore } from '../../stores/theme'

defineEmits<{ 'toggle-mobile': [] }>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const initials = computed(() => {
  const name = authStore.user?.name || ''
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
})

const breadcrumbs = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  const crumbs = []
  let path = ''
  for (const part of parts) {
    path += '/' + part
    crumbs.push({
      path,
      label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
    })
  }
  return crumbs
})

const currentSection = computed(() => null)

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>
