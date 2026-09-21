<template>
  <AppBadge :variant="badgeVariant">{{ label }}</AppBadge>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppBadge from './AppBadge.vue'

const props = defineProps<{ status: string }>()

const statusMap: Record<string, { variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral'; label: string }> = {
  // General
  ACTIVE: { variant: 'success', label: 'Active' },
  INACTIVE: { variant: 'neutral', label: 'Inactive' },
  // Purchase Request / Order
  DRAFT: { variant: 'neutral', label: 'Draft' },
  SUBMITTED: { variant: 'info', label: 'Submitted' },
  APPROVED: { variant: 'success', label: 'Approved' },
  REJECTED: { variant: 'danger', label: 'Rejected' },
  CANCELLED: { variant: 'danger', label: 'Cancelled' },
  SENT: { variant: 'info', label: 'Sent' },
  PARTIAL: { variant: 'warning', label: 'Partial' },
  COMPLETED: { variant: 'success', label: 'Completed' },
  // Production
  CONFIRMED: { variant: 'info', label: 'Confirmed' },
  MATERIAL_CHECK: { variant: 'warning', label: 'Material Check' },
  MATERIAL_RESERVED: { variant: 'info', label: 'Material Reserved' },
  IN_PROGRESS: { variant: 'info', label: 'In Progress' },
  QC: { variant: 'warning', label: 'QC' },
  // Transfer
  REQUESTED: { variant: 'neutral', label: 'Requested' },
  IN_TRANSIT: { variant: 'info', label: 'In Transit' },
  RECEIVED: { variant: 'success', label: 'Received' },
  // Opname
  COUNTING: { variant: 'info', label: 'Counting' },
  // Sales
  CONFIRMED_SO: { variant: 'info', label: 'Confirmed' },
  // Finance
  INCOME: { variant: 'success', label: 'Income' },
  EXPENSE: { variant: 'danger', label: 'Expense' },
}

const mapped = computed(() => statusMap[props.status] ?? { variant: 'neutral' as const, label: props.status })
const badgeVariant = computed(() => mapped.value.variant)
const label = computed(() => mapped.value.label)
</script>
