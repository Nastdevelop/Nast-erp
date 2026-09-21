<template>
  <div class="flex flex-col gap-3">
    <!-- Toolbar -->
    <div v-if="searchable || $slots.actions" class="flex items-center gap-2">
      <div v-if="searchable" class="relative flex-1 max-w-xs">
        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
        <input
          v-model="search"
          :placeholder="searchPlaceholder"
          class="w-full pl-8 pr-3 py-2 h-9 text-sm border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>
      <div class="ml-auto flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- Table -->
    <div class="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
              <th v-if="selectable" class="w-10 px-4 py-3 text-left">
                <input type="checkbox" class="rounded" @change="toggleAll" />
              </th>
              <th
                v-for="col in columns"
                :key="col.key"
                :class="['px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide whitespace-nowrap', col.class]"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr v-for="i in 5" :key="i" class="border-b border-zinc-100 dark:border-zinc-900">
                <td v-if="selectable" class="px-4 py-3">
                  <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-4"></div>
                </td>
                <td v-for="col in columns" :key="col.key" class="px-4 py-3">
                  <div class="h-4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" :style="{ width: Math.random() * 40 + 40 + '%' }"></div>
                </td>
              </tr>
            </template>
            <template v-else-if="filteredData.length === 0">
              <tr>
                <td :colspan="columns.length + (selectable ? 1 : 0)" class="px-4 py-16 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <component :is="emptyIcon" class="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ emptyMessage }}</p>
                    <slot name="empty-action" />
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr
                v-for="(row, idx) in paginatedData"
                :key="idx"
                :class="['border-b border-zinc-100 dark:border-zinc-900 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors', rowClass?.(row)]"
                @click="$emit('row-click', row)"
              >
                <td v-if="selectable" class="px-4 py-3">
                  <input type="checkbox" class="rounded" />
                </td>
                <td v-for="col in columns" :key="col.key" :class="['px-4 py-3 text-zinc-700 dark:text-zinc-300', col.cellClass]">
                  <slot :name="`cell-${col.key}`" :row="row" :value="getNestedValue(row, col.key)">
                    {{ getNestedValue(row, col.key) }}
                  </slot>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="filteredData.length > pageSize" class="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
      <span>Showing {{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, filteredData.length) }} of {{ filteredData.length }}</span>
      <div class="flex items-center gap-1">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft class="w-3.5 h-3.5" />
        </button>
        <span class="px-3 py-1 text-xs">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="p-1.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, ChevronLeft, ChevronRight, InboxIcon } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  columns: { key: string; label: string; class?: string; cellClass?: string }[]
  data: Record<string, any>[]
  loading?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  selectable?: boolean
  pageSize?: number
  emptyMessage?: string
  emptyIcon?: any
  rowClass?: (row: any) => string
}>(), {
  loading: false,
  searchable: true,
  searchPlaceholder: 'Search...',
  selectable: false,
  pageSize: 10,
  emptyMessage: 'No data found.',
  emptyIcon: InboxIcon,
})

defineEmits<{ 'row-click': [row: any] }>()

const search = ref('')
const currentPage = ref(1)

const filteredData = computed(() => {
  if (!search.value) return props.data
  const q = search.value.toLowerCase()
  return props.data.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(q))
  )
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.pageSize))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filteredData.value.slice(start, start + props.pageSize)
})

function getNestedValue(obj: any, key: string) {
  return key.split('.').reduce((o, k) => o?.[k], obj)
}

function toggleAll() {}
</script>
