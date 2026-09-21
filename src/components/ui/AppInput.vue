<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>
    <div class="relative">
      <span v-if="$slots.prefix" class="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 dark:text-zinc-400 pointer-events-none">
        <slot name="prefix" />
      </span>
      <input
        :id="id"
        v-bind="$attrs"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full border rounded-md text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-950',
          error ? 'border-red-400 dark:border-red-600' : 'border-zinc-300 dark:border-zinc-700',
          $slots.prefix ? 'pl-9' : 'pl-3',
          $slots.suffix ? 'pr-9' : 'pr-3',
          'py-2 h-9',
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span v-if="$slots.suffix" class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 dark:text-zinc-400">
        <slot name="suffix" />
      </span>
    </div>
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-zinc-500 dark:text-zinc-400">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string | number
  label?: string
  id?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
}>(), {
  type: 'text',
  id: () => 'input-' + Math.random().toString(36).slice(2),
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
