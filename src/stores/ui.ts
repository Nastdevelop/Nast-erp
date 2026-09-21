import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
}

export const useUiStore = defineStore('ui', () => {
  const sidebarCollapsed = ref(false)
  const toasts = ref<Toast[]>([])

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function addToast(type: Toast['type'], message: string) {
    const id = Date.now().toString()
    toasts.value.push({ id, type, message })
    setTimeout(() => removeToast(id), 4000)
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return { sidebarCollapsed, toasts, toggleSidebar, addToast, removeToast }
})
