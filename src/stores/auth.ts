import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type UserRole = 'ADMIN' | 'MANAGER' | 'PURCHASING' | 'WAREHOUSE' | 'PRODUCTION' | 'FINANCE'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userRole = computed(() => user.value?.role)

  function login(userData: User, authToken: string) {
    user.value = userData
    token.value = authToken
    localStorage.setItem('token', authToken)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  // Mock login for UI purposes
  function mockLogin(email: string, _password: string) {
    const mockUsers: Record<string, User> = {
      'admin@erp.com': { id: '1', name: 'Admin User', email: 'admin@erp.com', role: 'ADMIN', isActive: true },
      'manager@erp.com': { id: '2', name: 'Budi Santoso', email: 'manager@erp.com', role: 'MANAGER', isActive: true },
      'purchasing@erp.com': { id: '3', name: 'Sari Dewi', email: 'purchasing@erp.com', role: 'PURCHASING', isActive: true },
      'warehouse@erp.com': { id: '4', name: 'Andi Wijaya', email: 'warehouse@erp.com', role: 'WAREHOUSE', isActive: true },
      'production@erp.com': { id: '5', name: 'Hendra Kusuma', email: 'production@erp.com', role: 'PRODUCTION', isActive: true },
      'finance@erp.com': { id: '6', name: 'Rina Pertiwi', email: 'finance@erp.com', role: 'FINANCE', isActive: true },
    }
    const found = mockUsers[email]
    if (found) {
      login(found, 'mock-jwt-token-' + found.id)
      return true
    }
    return false
  }

  return { user, token, isAuthenticated, userRole, login, logout, mockLogin }
})
