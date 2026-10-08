import { api } from './api'

export interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  user: {
    id: string
    name: string
    email: string
    role: string
    isActive: boolean
  }
}

export async function login(email: string, password: string) {
  const res = await api.post('/auth/login', { email, password })
  return res.data.data as LoginResponse
}

export async function getMe() {
  const res = await api.get('/auth/me')
  return res.data.data
}

export async function logout() {
  try {
    await api.post('/auth/logout')
  } catch {
    /* token may already be invalid */
  }
}
