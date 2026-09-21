<template>
  <div class="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5">
    <template v-if="loading">
      <div class="flex items-start justify-between">
        <div class="space-y-2">
          <Skeleton width="80px" height="0.75rem" />
          <Skeleton width="60px" height="1.5rem" />
          <Skeleton width="100px" height="0.625rem" />
        </div>
        <Skeleton width="40px" height="40px" rounded="lg" />
      </div>
    </template>
    <template v-else>
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">{{ label }}</p>
          <p class="text-2xl font-semibold text-zinc-900 dark:text-white mt-1">{{ value }}</p>
          <p v-if="sub" class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{{ sub }}</p>
        </div>
        <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', iconBg]">
          <component :is="icon" class="w-5 h-5" :class="iconColor" />
        </div>
      </div>
      <div v-if="trend !== undefined" class="flex items-center gap-1 mt-3">
        <TrendingUp v-if="trend >= 0" class="w-3 h-3 text-emerald-500" />
        <TrendingDown v-else class="w-3 h-3 text-red-500" />
        <span :class="['text-xs font-medium', trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400']">
          {{ Math.abs(trend) }}%
        </span>
        <span class="text-xs text-zinc-400 dark:text-zinc-600">vs last month</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import Skeleton from './Skeleton.vue'

defineProps<{
  label: string
  value: string | number
  sub?: string
  icon: any
  iconBg?: string
  iconColor?: string
  trend?: number
  loading?: boolean
}>()
</script>
