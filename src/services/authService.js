import api from './api'

export const login = async ({ email, password }) => {
  const params = new URLSearchParams()
  params.append('username', email)
  params.append('password', password)
  const { data } = await api.post('/auth/login', params)
  const user = { ...data.user, token: data.access_token }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export const register = async ({ name, email, password, isAdmin = false }) => {
  const { data } = await api.post('/auth/signup', { name, email, password, is_admin: isAdmin })
  const user = { ...data.user, token: data.access_token }
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export const logout = () => {
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}
