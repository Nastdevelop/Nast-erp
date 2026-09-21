<template>
  <div>
    <PageHeader title="Bill of Materials" description="Define material requirements per finished product" :loading="loading">
      <template #actions>
        <RouterLink to="/bom/create">
          <AppButton><Plus class="w-3.5 h-3.5" />Create BOM</AppButton>
        </RouterLink>
      </template>
    </PageHeader>

    <template v-if="loading">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SkeletonCard v-for="i in 2" :key="i" />
      </div>
    </template>
    <template v-else-if="mockBoms.length === 0">
      <EmptyState
        title="No BOMs"
        description="Create your first bill of materials to define material requirements for products."
        :icon="FileText"
      >
        <RouterLink to="/bom/create">
          <AppButton><Plus class="w-3.5 h-3.5" />Create BOM</AppButton>
        </RouterLink>
      </EmptyState>
    </template>
    <template v-else>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div
        v-for="bom in mockBoms"
        :key="bom.id"
        class="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
      >
        <div class="p-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <div>
            <p class="font-semibold text-zinc-900 dark:text-white">{{ bom.product }}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="font-mono text-xs text-zinc-500 dark:text-zinc-400">{{ bom.productCode }}</span>
              <AppBadge variant="neutral">{{ bom.version }}</AppBadge>
              <AppBadge variant="success">Active</AppBadge>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <RouterLink :to="`/bom/${bom.id}`">
              <AppButton variant="ghost" size="sm"><Eye class="w-3.5 h-3.5" /></AppButton>
            </RouterLink>
            <AppButton variant="ghost" size="sm"><Pencil class="w-3.5 h-3.5" /></AppButton>
          </div>
        </div>
        <div class="p-4">
          <p class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">Materials Required (per unit)</p>
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-zinc-100 dark:border-zinc-900">
                <th class="text-left text-xs text-zinc-500 dark:text-zinc-400 pb-1.5 font-medium">Material</th>
                <th class="text-right text-xs text-zinc-500 dark:text-zinc-400 pb-1.5 font-medium">Qty</th>
                <th class="text-right text-xs text-zinc-500 dark:text-zinc-400 pb-1.5 font-medium">Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in bom.items" :key="item.material" class="border-b border-zinc-50 dark:border-zinc-900 last:border-0">
                <td class="py-1.5 text-zinc-700 dark:text-zinc-300">{{ item.material }}</td>
                <td class="py-1.5 text-right text-zinc-700 dark:text-zinc-300 font-medium">{{ item.quantity }}</td>
                <td class="py-1.5 text-right text-zinc-500 dark:text-zinc-400">{{ item.unit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Plus, Eye, Pencil, FileText } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import EmptyState from '../../components/ui/EmptyState.vue'
import SkeletonCard from '../../components/ui/SkeletonCard.vue'
import { mockBoms } from '../../data/mock'

const loading = ref(true)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
</script>
