<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :class="[
          'w-full border rounded-md text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors appearance-none pr-8 pl-3 py-2 h-9',
          'focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-red-400 dark:border-red-600' : 'border-zinc-300 dark:border-zinc-700',
        ]"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-if="placeholder" value="" disabled :selected="!modelValue">{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <ChevronDown class="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
    </div>
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

defineProps<{
  modelValue?: string | number
  label?: string
  id?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  options: { value: string | number; label: string }[]
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
