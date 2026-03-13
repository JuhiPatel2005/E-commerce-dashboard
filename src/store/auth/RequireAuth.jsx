import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth.js'

export function RequireAuth({ children }) {
  const { session } = useAuth()
  const location = useLocation()
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

