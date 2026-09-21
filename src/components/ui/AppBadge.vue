<template>
  <span :class="['inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full', variantClasses]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
}>(), { variant: 'neutral' })

const variantClasses = computed(() => ({
  neutral: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
  default: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
  success: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400',
  warning: 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400',
  danger: 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400',
  info: 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400',
}[props.variant]))
</script>
