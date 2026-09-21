<template>
  <AppModal :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :title="title" size="sm">
    <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ message }}</p>
    <template #footer>
      <AppButton variant="ghost" size="sm" @click="$emit('update:modelValue', false)">Cancel</AppButton>
      <AppButton :variant="confirmVariant" size="sm" @click="handleConfirm">{{ confirmLabel }}</AppButton>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from './AppModal.vue'
import AppButton from './AppButton.vue'

withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  message?: string
  confirmLabel?: string
  confirmVariant?: 'primary' | 'danger'
}>(), {
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  confirmLabel: 'Confirm',
  confirmVariant: 'primary',
})

const emit = defineEmits<{
  'update:modelValue': [v: boolean]
  confirm: []
}>()

function handleConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>
