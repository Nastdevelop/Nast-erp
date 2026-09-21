<template>
  <div>
    <PageHeader title="Transactions" description="Record income and expense transactions" :loading="loading">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Transaction</AppButton>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Income" value="Rp 31.5M" :icon="TrendingUp" icon-bg="bg-emerald-50 dark:bg-emerald-950" icon-color="text-emerald-500" :loading="loading" />
      <StatCard label="Total Expense" value="Rp 11.0M" :icon="TrendingDown" icon-bg="bg-red-50 dark:bg-red-950" icon-color="text-red-500" :loading="loading" />
      <StatCard label="Net Balance" value="Rp 20.5M" :icon="DollarSign" icon-bg="bg-blue-50 dark:bg-blue-950" icon-color="text-blue-500" :loading="loading" />
      <StatCard label="This Month Txn" value="4" :icon="Receipt" icon-bg="bg-zinc-100 dark:bg-zinc-800" icon-color="text-zinc-600 dark:text-zinc-300" :loading="loading" />
    </div>

    <DataTable :columns="columns" :data="mockTransactions" :loading="loading" empty-message="No transactions found. Add your first transaction to get started.">
      <template #empty-action>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add Transaction</AppButton>
      </template>
      <template #cell-type="{ value }">
        <StatusBadge :status="value" />
      </template>
      <template #cell-amount="{ row }">
        <span :class="row.type === 'INCOME' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-red-500 font-semibold'">
          {{ row.type === 'INCOME' ? '+' : '-' }} Rp {{ row.amount.toLocaleString('id-ID') }}
        </span>
      </template>
    </DataTable>

    <AppModal v-model="showForm" title="Add Transaction" size="md">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-3">
          <AppSelect v-model="form.type" label="Type" :options="[{value:'INCOME',label:'Income'},{value:'EXPENSE',label:'Expense'}]" placeholder="Select type" required />
          <AppSelect v-model="form.refType" label="Reference Type" :options="refTypeOptions" placeholder="Select type" />
        </div>
        <AppInput v-model="form.amount" label="Amount" type="number" placeholder="0">
          <template #prefix><span class="text-xs">Rp</span></template>
        </AppInput>
        <AppInput v-model="form.date" label="Date" type="date" />
        <AppInput v-model="form.description" label="Description" placeholder="Transaction description..." />
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">Save Transaction</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import StatCard from '../../components/ui/StatCard.vue'
import { mockTransactions } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const loading = ref(true)
const showForm = ref(false)

// Simulate loading
setTimeout(() => { loading.value = false }, 500)
const form = reactive({ type: '', refType: '', amount: '', date: '2026-09-21', description: '' })
const columns = [
  { key: 'date', label: 'Date' },
  { key: 'type', label: 'Type' },
  { key: 'referenceType', label: 'Ref Type' },
  { key: 'reference', label: 'Reference' },
  { key: 'description', label: 'Description' },
  { key: 'amount', label: 'Amount' },
  { key: 'createdBy', label: 'Created By' },
]
const refTypeOptions = [
  { value: 'SALES', label: 'Sales' },
  { value: 'PURCHASE', label: 'Purchase' },
  { value: 'PRODUCTION', label: 'Production' },
  { value: 'OTHER', label: 'Other' },
]
function save() { uiStore.addToast('success', 'Transaction saved.'); showForm.value = false }
</script>
