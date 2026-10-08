<template>
  <div>
    <div class="flex items-center gap-2 mb-6">
      <RouterLink to="/reports" class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"><ArrowLeft class="w-4 h-4" /></RouterLink>
      <PageHeader title="Purchasing Report" class="mb-0" />
    </div>
    <div class="grid grid-cols-3 gap-4 mb-6">
      <StatCard label="Total PO Value" value="Rp 28.3M" :icon="ShoppingCart" icon-bg="bg-zinc-100 dark:bg-zinc-800" icon-color="text-zinc-500" />
      <StatCard label="Orders This Month" value="4" :icon="ClipboardList" icon-bg="bg-blue-50 dark:bg-blue-950" icon-color="text-blue-500" />
      <StatCard label="Suppliers Used" value="3" :icon="Truck" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" />
    </div>
    <div class="flex gap-1 mb-4 border-b border-zinc-200 dark:border-zinc-800">
      <button v-for="t in ['Purchase Requests','Purchase Orders','Goods Receipts']" :key="t"
        @click="activeTab = t"
        :class="['px-4 py-2 text-sm border-b-2 -mb-px transition-colors', activeTab === t ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-medium' : 'border-transparent text-zinc-500 hover:text-zinc-700']">
        {{ t }}
      </button>
    </div>
    <DataTable v-if="activeTab === 'Purchase Requests'" :columns="prColumns" :data="pr">
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
    </DataTable>
    <DataTable v-else-if="activeTab === 'Purchase Orders'" :columns="poColumns" :data="po">
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
      <template #cell-total="{ value }">Rp {{ value.toLocaleString('id-ID') }}</template>
    </DataTable>
    <DataTable v-else :columns="grColumns" :data="gr" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ShoppingCart, ClipboardList, Truck } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { purchaseRequestsService, purchaseOrdersService, goodsReceiptsService } from '../../services/crud'
const activeTab = ref('Purchase Requests')
const pr = ref<any[]>([])
const po = ref<any[]>([])
const gr = ref<any[]>([])
onMounted(async () => {
  const [p1, p2, g] = await Promise.all([purchaseRequestsService.list(), purchaseOrdersService.list(), goodsReceiptsService.list()])
  pr.value = p1.data.map(r => ({ ...r, number: r.code, requestDate: r.requestDate?.slice(0,10), items: r.items?.length ?? 0 }))
  po.value = p2.data.map(r => ({ ...r, number: r.code, orderDate: r.orderDate?.slice(0,10), supplier: r.supplier?.name, total: (r.items??[]).reduce((s:any,it:any)=>s+Number(it.quantity)*Number(it.unitPrice),0) }))
  gr.value = g.data.map(r => ({ ...r, number: r.code, purchaseOrder: r.supplier?.name, receivedAt: r.receiptDate?.slice(0,10), warehouse: '-' }))
})
const prColumns = [{ key:'number',label:'PR #'},{key:'requestedBy',label:'Requested By'},{key:'requestDate',label:'Date'},{key:'items',label:'Items'},{key:'status',label:'Status'}]
const poColumns = [{ key:'number',label:'PO #'},{key:'supplier',label:'Supplier'},{key:'orderDate',label:'Date'},{key:'total',label:'Total'},{key:'status',label:'Status'}]
const grColumns = [{ key:'number',label:'GR #'},{key:'purchaseOrder',label:'PO Ref'},{key:'warehouse',label:'Warehouse'},{key:'receivedAt',label:'Date'},{key:'receivedBy',label:'Received By'}]
</script>
