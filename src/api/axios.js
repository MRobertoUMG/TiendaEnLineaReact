import axios from 'axios'

const API_URL = (
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.DEV ? 'http://localhost:5000' : '')
).replace(/\/+$/, '')

export const API_BASE_URL = API_URL
  ? (API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`)
  : null

const api = axios.create({
  baseURL: API_BASE_URL || undefined,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token')

    if (!token) {
      try {
        const session = JSON.parse(localStorage.getItem('tienda-session') || 'null')
        token = typeof session?.token === 'string' ? session.token : null
      } catch {
        token = null
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api
