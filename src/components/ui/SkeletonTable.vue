<template>
  <div class="space-y-3">
    <div v-for="i in rows" :key="i" class="flex items-center gap-4">
      <Skeleton v-for="(col, j) in columns" :key="j" :width="col.width || '100%'" :height="col.height || '1rem'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Skeleton from './Skeleton.vue'
withDefaults(defineProps<{
  rows?: number
  columns?: Array<{ width?: string; height?: string }>
}>(), {
  rows: 5,
  columns: () => [
    { width: '10%' },
    { width: '25%' },
    { width: '15%' },
    { width: '20%' },
    { width: '15%' },
    { width: '15%' },
  ]
})
</script>
