<template>
  <div class="flex h-screen bg-zinc-50 dark:bg-black overflow-hidden">
    <!-- Sidebar -->
    <AppSidebar ref="sidebarRef" />

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <AppHeader @toggle-mobile="toggleMobile" />
      <main class="flex-1 overflow-y-auto p-4 sm:p-6">
        <RouterView />
      </main>
    </div>

    <!-- Toast notifications -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppSidebar from '../components/layout/AppSidebar.vue'
import AppHeader from '../components/layout/AppHeader.vue'
import ToastContainer from '../components/ui/ToastContainer.vue'

const sidebarRef = ref()

function toggleMobile() {
  sidebarRef.value?.toggleMobile()
}
</script>
