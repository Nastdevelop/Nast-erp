<template>
  <AuthLayout>
    <div class="w-full max-w-sm">
      <!-- Logo -->
      <div class="flex items-center justify-center mb-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center">
            <span class="text-white dark:text-zinc-900 text-lg font-bold">N</span>
          </div>
          <div>
            <p class="font-semibold text-zinc-900 dark:text-white text-lg leading-none">Nast ERP</p>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Furniture Manufacturing</p>
          </div>
        </div>
      </div>

      <!-- Card -->
      <div class="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-7 shadow-sm">
        <h2 class="text-lg font-semibold text-zinc-900 dark:text-white mb-1">Sign in</h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Enter your credentials to access the system.</p>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <AppInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="you@erp.com"
            required
            :error="errors.email"
          >
            <template #prefix><Mail class="w-3.5 h-3.5" /></template>
          </AppInput>

          <AppInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            :error="errors.password"
          >
            <template #prefix><Lock class="w-3.5 h-3.5" /></template>
          </AppInput>

          <p v-if="errors.general" class="text-sm text-red-500 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md px-3 py-2">
            {{ errors.general }}
          </p>

          <AppButton type="submit" class="w-full mt-1" :loading="loading">
            Sign in
          </AppButton>
        </form>
      </div>

      <!-- Demo hint -->
      <div class="mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <p class="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">Demo accounts</p>
        <div class="grid grid-cols-2 gap-1">
          <button
            v-for="demo in demoAccounts"
            :key="demo.email"
            @click="fillDemo(demo)"
            class="text-left text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors py-0.5"
          >
            <span class="font-medium">{{ demo.role }}</span>
          </button>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock } from 'lucide-vue-next'
import AuthLayout from '../../layouts/AuthLayout.vue'
import AppInput from '../../components/ui/AppInput.vue'
import AppButton from '../../components/ui/AppButton.vue'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '', general: '' })
const loading = ref(false)

const demoAccounts = [
  { role: 'Admin', email: 'admin@erp.com', password: 'password' },
  { role: 'Manager', email: 'manager@erp.com', password: 'password' },
  { role: 'Purchasing', email: 'purchasing@erp.com', password: 'password' },
  { role: 'Warehouse', email: 'warehouse@erp.com', password: 'password' },
  { role: 'Production', email: 'production@erp.com', password: 'password' },
  { role: 'Finance', email: 'finance@erp.com', password: 'password' },
]

function fillDemo(demo: { email: string; password: string }) {
  form.email = demo.email
  form.password = demo.password
}

async function handleLogin() {
  errors.email = ''
  errors.password = ''
  errors.general = ''

  if (!form.email) { errors.email = 'Email is required'; return }
  if (!form.password) { errors.password = 'Password is required'; return }

  loading.value = true
  await new Promise(r => setTimeout(r, 600))

  const ok = authStore.mockLogin(form.email, form.password)
  loading.value = false

  if (ok) {
    router.push('/dashboard')
  } else {
    errors.general = 'Invalid email or password.'
  }
}
</script>
