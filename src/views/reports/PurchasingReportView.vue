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
    <DataTable v-if="activeTab === 'Purchase Requests'" :columns="prColumns" :data="mockPurchaseRequests">
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
    </DataTable>
    <DataTable v-else-if="activeTab === 'Purchase Orders'" :columns="poColumns" :data="mockPurchaseOrders">
      <template #cell-status="{ value }"><StatusBadge :status="value" /></template>
      <template #cell-total="{ value }">Rp {{ value.toLocaleString('id-ID') }}</template>
    </DataTable>
    <DataTable v-else :columns="grColumns" :data="mockGoodsReceipts" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ShoppingCart, ClipboardList, Truck } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatCard from '../../components/ui/StatCard.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockPurchaseRequests, mockPurchaseOrders, mockGoodsReceipts } from '../../data/mock'
const activeTab = ref('Purchase Requests')
const prColumns = [{ key:'number',label:'PR #'},{key:'requestedBy',label:'Requested By'},{key:'requestDate',label:'Date'},{key:'items',label:'Items'},{key:'status',label:'Status'}]
const poColumns = [{ key:'number',label:'PO #'},{key:'supplier',label:'Supplier'},{key:'orderDate',label:'Date'},{key:'total',label:'Total'},{key:'status',label:'Status'}]
const grColumns = [{ key:'number',label:'GR #'},{key:'purchaseOrder',label:'PO Ref'},{key:'warehouse',label:'Warehouse'},{key:'receivedAt',label:'Date'},{key:'receivedBy',label:'Received By'}]
</script>
