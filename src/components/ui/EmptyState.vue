<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div v-if="icon" :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-4', iconBg || 'bg-zinc-100 dark:bg-zinc-800']">
      <component :is="icon" :class="['w-6 h-6', iconColor || 'text-zinc-400 dark:text-zinc-500']" />
    </div>
    <h3 class="text-sm font-semibold text-zinc-900 dark:text-white mb-1">{{ title }}</h3>
    <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-4">{{ description }}</p>
    <slot />
  </div>
</template>
<script setup lang="ts">
import type { Component } from 'vue'
defineProps<{
  title: string
  description: string
  icon?: Component
  iconBg?: string
  iconColor?: string
}>()
</script>
