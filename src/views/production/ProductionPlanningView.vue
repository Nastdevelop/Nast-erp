<template>
  <div>
    <PageHeader title="Production Planning" description="Compare current stock vs target to determine production needs">
      <template #actions>
        <AppButton @click="showCreate = true">
          <Factory class="w-3.5 h-3.5" />Generate Production Orders
        </AppButton>
      </template>
    </PageHeader>

    <!-- Summary -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <StatCard label="Products Need Production" value="4" :icon="AlertTriangle" icon-bg="bg-amber-50 dark:bg-amber-950" icon-color="text-amber-500" />
      <StatCard label="Total Units Needed" value="94" :icon="Factory" icon-bg="bg-blue-50 dark:bg-blue-950" icon-color="text-blue-500" />
      <StatCard label="No Production Needed" value="1" :icon="CheckCircle" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" />
    </div>

    <AppCard :padding="false">
      <div class="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <p class="font-semibold text-sm text-zinc-900 dark:text-white">Planning Overview</p>
        <p class="text-xs text-zinc-500 dark:text-zinc-400">September 2026</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
              <th class="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Product</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Current Stock</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Target Stock</th>
              <th class="text-right px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Production Need</th>
              <th class="px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide">Progress</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in planningItems"
              :key="item.id"
              :class="['border-b border-zinc-100 dark:border-zinc-900 last:border-0', item.need > 0 ? '' : 'opacity-60']"
            >
              <td class="px-4 py-3">
                <p class="font-medium text-zinc-900 dark:text-white">{{ item.product }}</p>
                <p class="text-xs font-mono text-zinc-500">{{ item.code }}</p>
              </td>
              <td class="px-4 py-3 text-right text-zinc-700 dark:text-zinc-300">{{ item.currentStock }} PCS</td>
              <td class="px-4 py-3 text-right text-zinc-700 dark:text-zinc-300">
                <div class="flex items-center justify-end gap-1">
                  <span>{{ item.editTarget ?? item.targetStock }}</span>
                  <button @click="startEdit(item)" class="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                    <Pencil class="w-3 h-3" />
                  </button>
                </div>
              </td>
              <td class="px-4 py-3 text-right">
                <span v-if="item.need <= 0" class="text-zinc-400">—</span>
                <span v-else class="font-semibold text-amber-600 dark:text-amber-400">{{ item.need }} PCS</span>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden min-w-[80px]">
                    <div
                      class="h-full bg-blue-500 rounded-full"
                      :style="{ width: Math.min(100, (item.currentStock / item.targetStock) * 100) + '%' }"
                    />
                  </div>
                  <span class="text-xs text-zinc-400 shrink-0">{{ Math.round((item.currentStock / item.targetStock) * 100) }}%</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <AppButton v-if="item.need > 0" size="sm" variant="outline" @click="createOrder(item)">
                  Create Order
                </AppButton>
                <span v-else class="text-xs text-zinc-400">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AppCard>

    <ConfirmDialog
      v-model="showCreate"
      title="Generate Production Orders"
      message="This will create production orders for all 4 products that need production. Continue?"
      confirm-label="Generate"
      @confirm="() => uiStore.addToast('success', '4 production orders created.')"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Factory, AlertTriangle, CheckCircle, Pencil } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppCard from '../../components/ui/AppCard.vue'
import StatCard from '../../components/ui/StatCard.vue'
import ConfirmDialog from '../../components/ui/ConfirmDialog.vue'
import { mockProductionPlanning } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const showCreate = ref(false)
const planningItems = ref(mockProductionPlanning.map(p => ({ ...p, editTarget: null as number | null })))
function startEdit(item: any) {
  item.editTarget = item.editTarget ?? item.targetStock
}
function createOrder(item: any) {
  uiStore.addToast('success', `Production order created for ${item.product}.`)
}
</script>
