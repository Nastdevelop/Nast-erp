<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          @click="!persistent && $emit('update:modelValue', false)"
        />
        <!-- Dialog -->
        <div :class="['relative bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xl w-full', sizeClass]">
          <!-- Header -->
          <div v-if="title" class="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-white">{{ title }}</h3>
            <button
              v-if="!persistent"
              @click="$emit('update:modelValue', false)"
              class="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
          <!-- Body -->
          <div class="p-5">
            <slot />
          </div>
          <!-- Footer -->
          <div v-if="$slots.footer" class="px-5 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  persistent?: boolean
}>(), { size: 'md' })

defineEmits<{ 'update:modelValue': [v: boolean] }>()

const sizeClass = computed(() => ({
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}[props.size]))
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.15s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
