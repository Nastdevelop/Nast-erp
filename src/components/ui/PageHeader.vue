<template>
  <div class="flex items-center justify-between mb-6">
    <div>
      <template v-if="loading">
        <Skeleton width="200px" height="1.5rem" class="mb-1" />
        <Skeleton width="300px" height="0.875rem" />
      </template>
      <template v-else>
        <h1 class="text-xl font-semibold text-zinc-900 dark:text-white">{{ title }}</h1>
        <p v-if="description" class="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{{ description }}</p>
      </template>
    </div>
    <div v-if="$slots.actions" class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton.vue'
defineProps<{ title: string; description?: string; loading?: boolean }>()
</script>
