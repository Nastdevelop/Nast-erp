<template>
  <div>
    <PageHeader title="Users" description="Manage system users and permissions">
      <template #actions>
        <AppButton @click="showForm = true"><Plus class="w-3.5 h-3.5" />Add User</AppButton>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :data="mockUsers" search-placeholder="Search users...">
      <template #cell-name="{ value, row }">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-300">{{ initials(value) }}</span>
          </div>
          <div>
            <p class="font-medium text-zinc-900 dark:text-white text-sm">{{ value }}</p>
            <p class="text-xs text-zinc-500 dark:text-zinc-400">{{ row.email }}</p>
          </div>
        </div>
      </template>
      <template #cell-role="{ value }">
        <AppBadge :variant="roleVariant(value)">{{ value }}</AppBadge>
      </template>
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'ACTIVE' : 'INACTIVE'" />
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-1">
          <AppButton variant="ghost" size="sm" @click="edit(row)"><Pencil class="w-3.5 h-3.5" /></AppButton>
          <AppButton variant="ghost" size="sm" @click="confirmDeactivate(row)">
            <Power class="w-3.5 h-3.5" :class="row.isActive ? 'text-red-400' : 'text-emerald-500'" />
          </AppButton>
        </div>
      </template>
    </DataTable>

    <AppModal v-model="showForm" :title="editingUser ? 'Edit User' : 'Add User'" size="md">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-3">
          <AppInput v-model="form.name" label="Full Name" placeholder="John Doe" required />
          <AppInput v-model="form.email" label="Email" type="email" placeholder="user@erp.com" required />
        </div>
        <AppSelect v-model="form.role" label="Role" :options="roleOptions" placeholder="Select role" required />
        <AppInput v-if="!editingUser" v-model="form.password" label="Password" type="password" placeholder="••••••••" required />
        <div v-if="editingUser" class="p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p class="text-xs text-amber-700 dark:text-amber-400">Leave password blank to keep the current password.</p>
        </div>
      </div>
      <template #footer>
        <AppButton variant="ghost" @click="showForm = false">Cancel</AppButton>
        <AppButton @click="save">{{ editingUser ? 'Update User' : 'Create User' }}</AppButton>
      </template>
    </AppModal>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Plus, Pencil, Power } from 'lucide-vue-next'
import PageHeader from '../../components/ui/PageHeader.vue'
import AppButton from '../../components/ui/AppButton.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppSelect from '../../components/ui/AppSelect.vue'
import AppBadge from '../../components/ui/AppBadge.vue'
import AppModal from '../../components/ui/AppModal.vue'
import DataTable from '../../components/ui/DataTable.vue'
import StatusBadge from '../../components/ui/StatusBadge.vue'
import { mockUsers } from '../../data/mock'
import { useUiStore } from '../../stores/ui'
const uiStore = useUiStore()
const showForm = ref(false)
const editingUser = ref<any>(null)
const form = reactive({ name: '', email: '', role: '', password: '' })
const columns = [
  { key: 'name', label: 'User' },
  { key: 'role', label: 'Role' },
  { key: 'createdAt', label: 'Created' },
  { key: 'isActive', label: 'Status' },
  { key: 'actions', label: '' },
]
const roleOptions = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'PURCHASING', label: 'Purchasing' },
  { value: 'WAREHOUSE', label: 'Warehouse' },
  { value: 'PRODUCTION', label: 'Production' },
  { value: 'FINANCE', label: 'Finance' },
]
const roleVariants: Record<string, any> = {
  ADMIN: 'danger', MANAGER: 'info', PURCHASING: 'warning',
  WAREHOUSE: 'neutral', PRODUCTION: 'success', FINANCE: 'neutral',
}
function initials(name: string) { return name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase() }
function roleVariant(role: string) { return roleVariants[role] ?? 'neutral' }
function edit(row: any) { editingUser.value = row; Object.assign(form, row); showForm.value = true }
function confirmDeactivate(row: any) { uiStore.addToast('success', `User ${row.isActive ? 'deactivated' : 'activated'}.`) }
function save() { uiStore.addToast('success', editingUser.value ? 'User updated.' : 'User created.'); showForm.value = false; editingUser.value = null }
</script>
