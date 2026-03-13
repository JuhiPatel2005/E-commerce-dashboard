import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth.js'

export function RequireGuest({ children }) {
  const { session } = useAuth()
  if (session) return <Navigate to="/app/dashboard" replace />
  return children
}

