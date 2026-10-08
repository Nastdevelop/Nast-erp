import axios, { AxiosError } from 'axios'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1'

export const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (window.location.pathname !== '/login') window.location.href = '/login'
    }
    const message =
      error.response?.data?.message ?? error.message ?? 'Request failed'
    return Promise.reject(new Error(Array.isArray(message) ? message.join(', ') : message))
  },
)

export interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
  errorCode: string | null
}

export interface Paginated<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ListParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  isActive?: string
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
}
