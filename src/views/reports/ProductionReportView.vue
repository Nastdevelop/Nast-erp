<template>
  <div>
    <div class="flex items-center gap-2 mb-6">
      <RouterLink to="/reports" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"><ArrowLeft class="w-4 h-4" /></RouterLink>
      <PageHeader title="Production Report" class="mb-0" />
    </div>
    <div class="grid grid-cols-4 gap-4 mb-6">
      <StatCard label="Orders This Month" value="4" :icon="Factory" icon-bg="bg-zinc-100 dark:bg-zinc-800" icon-color="text-zinc-500" />
      <StatCard label="Total Produced" value="43" :icon="CheckCircle" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" />
      <StatCard label="Total Reject" value="3" :icon="XCircle" icon-bg="bg-red-50 dark:bg-red-950" icon-color="text-red-500" />
      <StatCard label="Reject Rate" value="6.5%" :icon="BarChart3" icon-bg="bg-amber-50 dark:bg-amber-950" icon-color="text-amber-500" />
    </div>
    <div class="flex gap-1 mb-4 border-b border-zinc-200 dark:border-zinc-800">
      <button v-for="t in ['Orders','Results','QC']" :key="t" @click="activeTab = t"
        :class="['px-4 py-2 text-sm border-b-2 -mb-px', activeTab === t ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-medium' : 'border-transparent text-zinc-500 hover:text-zinc-700']">{{ t }}</button>
    </div>
    <DataTable v-if="activeTab === 'Orders'" :columns="orderColumns" :data="mockProductionOrders">
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
    </DataTable>
    <DataTable v-else-if="activeTab === 'Results'" :columns="resultColumns" :data="mockProductionResults">
      <template #cell-goodQty="{ value }"><span class="text-emerald-600 font-medium">{{ value }}</span></template>
      <template #cell-rejectQty="{ value }"><span :class="value > 0 ? 'text-red-500 font-medium' : 'text-zinc-400'">{{ value }}</span></template>
    </DataTable>
    <DataTable v-else :columns="qcColumns" :data="mockQCRecords">
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, Factory, CheckCircle, XCircle, BarChart3 } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockProductionOrders, mockProductionResults, mockQCRecords } from '../../data/mock'
const activeTab = ref('Orders')
const orderColumns = [{ key:'number',label:'Order #'},{key:'product',label:'Product'},{key:'quantity',label:'Qty'},{key:'plannedDate',label:'Planned'},{key:'status',label:'Status'}]
const resultColumns = [{ key:'productionOrder',label:'Order #'},{key:'product',label:'Product'},{key:'targetQty',label:'Target'},{key:'goodQty',label:'Good'},{key:'rejectQty',label:'Reject'},{key:'productionDate',label:'Date'}]
const qcColumns = [{ key:'productionOrder',label:'Order #'},{key:'product',label:'Product'},{key:'goodQty',label:'Good'},{key:'rejectQty',label:'Reject'},{key:'checkedBy',label:'Checked By'},{key:'status',label:'Status'}]
</script>
