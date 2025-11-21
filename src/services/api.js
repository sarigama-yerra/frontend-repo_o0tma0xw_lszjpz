import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
})

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('user')
  if (stored) {
    const user = JSON.parse(stored)
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
  }
  return config
})

export default api
