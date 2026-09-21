<template>
  <div>
    <PageHeader title="Warehouses" description="Manage warehouse locations" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Warehouse</AppButton>
      </template>
    </PageHeader>
    <template v-if="loading">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SkeletonCard v-for="i in 3" :key="i" />
      </div>
    </template>
    <template v-else-if="mockWarehouses.length === 0">
      <EmptyState
        title="No warehouses"
        description="Add your first warehouse to start managing inventory locations."
        :icon="Warehouse"
      >
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Warehouse</AppButton>
      </EmptyState>
    </template>
    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div v-for="wh in mockWarehouses" :key="wh.id"
          class="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5">
          <div class="flex items-start justify-between mb-3">
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', warehouseIcon(wh.type).bg]">
              <Warehouse class="w-5 h-5" :class="warehouseIcon(wh.type).color" />
            </div>
            <StatusBadge :status="wh.isActive ? 'ACTIVE' : 'INACTIVE'" />
          </div>
          <p class="font-semibold text-zinc-900 dark:text-white">{{ wh.name }}</p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{{ wh.code }}</p>
          <AppBadge :variant="warehouseIcon(wh.type).badge" class="mt-2">{{ wh.type.replace('_', ' ') }}</AppBadge>
          <div class="flex items-center gap-1 mt-4">
            <AppButton variant="outline" size="sm" class="flex-1" @click="edit(wh)">Edit</AppButton>
          </div>
        </div>
      </div>
    </template>

    <AppModal v-model="showForm" title="Warehouse" size="sm">
      <div class="flex flex-col gap-4">
        <AppInput v-model="form.code" label="Code" placeholder="WH-001" />
        <AppInput v-model="form.name" label="Warehouse Name" placeholder="Gudang Bahan Baku" />
        <AppSelect v-model="form.type" label="Type" :options="[
          { value: 'RAW_MATERIAL', label: 'Raw Material' },
          { value: 'WIP', label: 'WIP' },
          { value: 'FINISHED_GOOD', label: 'Finished Good' },
        ]" placeholder="Select type" />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">Save</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Plus, Warehouse } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import AppModal from '../../components/ui/AppModal.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import EmptyState from '../../components/ui/EmptyState.vue'
import SkeletonCard from '../../components/ui/SkeletonCard.vue'
import { mockWarehouses } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)
const form = reactive({ code: '', name: '', type: '' })

// Simulate loading
setTimeout(() => { loading.value = false }, 500)

function warehouseIcon(type: string) {
  if (type === 'RAW_MATERIAL') return { bg: 'bg-amber-50 dark:bg-amber-950', color: 'text-amber-500', badge: 'warning' as const }
  if (type === 'WIP') return { bg: 'bg-blue-50 dark:bg-blue-950', color: 'text-blue-500', badge: 'info' as const }
  return { bg: 'bg-emerald-50 dark:bg-emerald-950', color: 'text-emerald-500', badge: 'success' as const }
}
function edit(row: any) { Object.assign(form, row); showForm.value = true }
function save() { uiStore.addToast('success', 'Warehouse saved.'); showForm.value = false }
</script>
