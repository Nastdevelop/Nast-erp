<template>
  <div>
    <div class="flex items-center gap-2 mb-6">
      <RouterLink to="/reports" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"><ArrowLeft class="w-4 h-4" /></RouterLink>
      <PageHeader title="Sales Report" class="mb-0" />
    </div>
    <div class="grid grid-cols-3 gap-4 mb-6">
      <StatCard label="Total Revenue" value="Rp 94.9M" :icon="ShoppingBag" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" />
      <StatCard label="Orders This Month" value="4" :icon="ClipboardList" icon-bg="bg-blue-50 dark:bg-blue-950" icon-color="text-blue-500" />
      <StatCard label="Deliveries" value="2" :icon="PackageCheck" icon-bg="bg-zinc-100 dark:bg-zinc-800" icon-color="text-zinc-500" />
    </div>
    <div class="flex gap-1 mb-4 border-b border-zinc-200 dark:border-zinc-800">
      <button v-for="t in ['Sales Orders','Deliveries']" :key="t" @click="activeTab = t"
        :class="['px-4 py-2 text-sm border-b-2 -mb-px', activeTab === t ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-medium' : 'border-transparent text-zinc-500 hover:text-zinc-700']">{{ t }}</button>
    </div>
    <DataTable v-if="activeTab === 'Sales Orders'" :columns="soColumns" :data="so">
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
      <template #cell-total="{ value }">Rp {{ value.toLocaleString('id-ID') }}</template>
    </DataTable>
    <DataTable v-else :columns="dlvColumns" :data="dlv" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ShoppingBag, ClipboardList, PackageCheck } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { salesOrdersService, deliveriesService } from '../../services/crud'
const activeTab = ref('Sales Orders')
const so = ref<any[]>([])
const dlv = ref<any[]>([])
onMounted(async () => {
  const [s, d] = await Promise.all([salesOrdersService.list(), deliveriesService.list()])
  so.value = s.data.map(x => ({ ...x, number: x.code, customer: x.customer?.name, orderDate: x.orderDate?.slice(0,10), total: (x.items??[]).reduce((sum:any,it:any)=>sum+Number(it.quantity)*Number(it.unitPrice),0) }))
  dlv.value = d.data.map(x => ({ ...x, number: x.code, salesOrder: x.salesOrder?.code, warehouse: '-', deliveredBy: x.createdBy, deliveredAt: x.deliveryDate?.slice(0,10) }))
})
const soColumns = [{ key:'number',label:'SO #'},{key:'customer',label:'Customer'},{key:'orderDate',label:'Date'},{key:'total',label:'Total'},{key:'status',label:'Status'}]
const dlvColumns = [{ key:'number',label:'DLV #'},{key:'salesOrder',label:'SO Ref'},{key:'warehouse',label:'Warehouse'},{key:'deliveredBy',label:'By'},{key:'deliveredAt',label:'Date'}]
</script>
