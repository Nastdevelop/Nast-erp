<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>
    <textarea
      :id="id"
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :class="[
        'w-full border rounded-md text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 transition-colors px-3 py-2 resize-none',
        'focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        error ? 'border-red-400 dark:border-red-600' : 'border-zinc-300 dark:border-zinc-700',
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string
  label?: string
  id?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  rows?: number
}>(), { rows: 3, id: () => 'ta-' + Math.random().toString(36).slice(2) })

defineEmits<{ 'update:modelValue': [v: string] }>()
</script>
