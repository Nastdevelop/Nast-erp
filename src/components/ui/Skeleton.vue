<template>
  <div :class="['animate-pulse rounded bg-zinc-200 dark:bg-zinc-800', classes]" :style="style" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  width?: string
  height?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}>(), {
  width: '100%',
  height: '1rem',
  rounded: 'md'
})
const classes = computed(() => ({
  'rounded-sm': props.rounded === 'sm',
  'rounded-md': props.rounded === 'md',
  'rounded-lg': props.rounded === 'lg',
  'rounded-full': props.rounded === 'full',
}))
const style = computed(() => ({
  width: props.width,
  height: props.height,
}))
</script>
