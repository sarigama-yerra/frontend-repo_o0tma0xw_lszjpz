import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../services/authService'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const user = getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !user.isAdmin) return <Navigate to="/" replace />
  return children
}
