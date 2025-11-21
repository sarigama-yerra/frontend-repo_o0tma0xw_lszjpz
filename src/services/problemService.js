import api from './api'

export const getProblems = async () => {
  const { data } = await api.get('/problems')
  return data
}

export const getProblemById = async (id) => {
  const { data } = await api.get(`/problems/${id}`)
  return data
}

export const createProblem = async (payload) => {
  const { data } = await api.post('/problems', payload)
  return data
}
