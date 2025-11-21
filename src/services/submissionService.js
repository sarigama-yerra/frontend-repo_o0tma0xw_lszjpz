import api from './api'

export const runCode = async ({ problem_id, language, code }) => {
  const { data } = await api.post('/submit/run', { problem_id, language, code })
  return data
}

export const submitCode = async ({ problem_id, language, code }) => {
  const { data } = await api.post('/submit', { problem_id, language, code })
  return data
}
