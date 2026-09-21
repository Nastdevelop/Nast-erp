<template>
  <div :class="['bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg', padding ? 'p-5' : '', $attrs.class]">
    <div v-if="loading" class="space-y-3">
      <div class="flex items-center justify-between">
        <Skeleton width="40%" height="1rem" />
        <Skeleton width="20%" height="1rem" />
      </div>
      <Skeleton width="60%" height="1.5rem" />
      <div class="space-y-2">
        <Skeleton width="100%" height="0.75rem" />
        <Skeleton width="80%" height="0.75rem" />
      </div>
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton.vue'
withDefaults(defineProps<{ padding?: boolean; loading?: boolean }>(), { padding: true, loading: false })
</script>
