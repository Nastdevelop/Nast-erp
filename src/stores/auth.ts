import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authService from '../services/auth.service'

export type UserRole = 'ADMIN' | 'MANAGER' | 'PURCHASING' | 'WAREHOUSE' | 'PRODUCTION' | 'FINANCE'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref<string | null>(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role)

  function setSession(userData: User, authToken: string) {
    user.value = userData
    token.value = authToken
    localStorage.setItem('token', authToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  async function login(email: string, password: string) {
    const res = await authService.login(email, password)
    setSession(res.user as User, res.access_token)
  }

  async function fetchMe() {
    if (!token.value) return
    try {
      const me = await authService.getMe()
      if (me) {
        user.value = me as User
        localStorage.setItem('user', JSON.stringify(me))
      }
    } catch {
      /* 401 interceptor handles logout */
    }
  }

  function logout() {
    authService.logout()
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { user, token, isAuthenticated, userRole, login, logout, fetchMe }
})
