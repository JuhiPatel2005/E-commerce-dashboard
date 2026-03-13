import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import {
  clearSession,
  getSession,
  getUsers,
  isSessionValid,
  setSession,
  setUsers,
} from './authStorage.js'

const SESSION_MS = 5 * 60 * 1000

export const AuthContext = createContext(null)

function makeToken() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function AuthProvider({ children }) {
  const [session, setSessionState] = useState(() => getSession())
  const [tick, setTick] = useState(0)

  const logout = useCallback(() => {
    clearSession()
    setSessionState(null)
  }, [])

  useEffect(() => {
    if (!isSessionValid(session)) {
      if (session) logout()
      return
    }
    const id = window.setInterval(() => setTick((t) => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [session, logout])

  const register = useCallback(({ name, email, password }) => {
    const cleanEmail = String(email || '').trim().toLowerCase()
    const cleanName = String(name || '').trim()

    if (!cleanName) return { ok: false, error: 'Name is required.' }
    if (!cleanEmail) return { ok: false, error: 'Email is required.' }
    if (!String(password || '').trim()) return { ok: false, error: 'Password is required.' }

    const users = getUsers()
    const exists = users.some((u) => String(u.email).toLowerCase() === cleanEmail)
    if (exists) return { ok: false, error: 'Email is already registered.' }

    const nextUsers = [
      ...users,
      { id: makeToken(), name: cleanName, email: cleanEmail, password: String(password) },
    ]
    setUsers(nextUsers)
    return { ok: true }
  }, [])

  const login = useCallback(({ email, password }) => {
    const cleanEmail = String(email || '').trim().toLowerCase()
    const users = getUsers()
    const user = users.find((u) => String(u.email).toLowerCase() === cleanEmail)
    if (!user || String(user.password) !== String(password)) {
      return { ok: false, error: 'Invalid email or password.' }
    }

    const nextSession = {
      token: makeToken(),
      email: user.email,
      expiresAt: Date.now() + SESSION_MS,
    }
    setSession(nextSession)
    setSessionState(nextSession)
    return { ok: true }
  }, [])

  const user = useMemo(() => {
    if (!isSessionValid(session)) return null
    const users = getUsers()
    return users.find((u) => String(u.email).toLowerCase() === String(session.email).toLowerCase()) || null
  }, [session, tick])

  const sessionMsLeft = useMemo(() => {
    if (!isSessionValid(session)) return 0
    return Math.max(0, Number(session.expiresAt) - Date.now())
  }, [session, tick])

  const updateProfile = useCallback(({ name, email, password }) => {
    const current = getSession()
    if (!isSessionValid(current)) return { ok: false, error: 'Session expired. Please login again.' }

    const cleanEmail = String(email || '').trim().toLowerCase()
    const cleanName = String(name || '').trim()

    if (!cleanName) return { ok: false, error: 'Name is required.' }
    if (!cleanEmail) return { ok: false, error: 'Email is required.' }
    if (!String(password || '').trim()) return { ok: false, error: 'Password is required.' }

    const users = getUsers()
    const idx = users.findIndex((u) => String(u.email).toLowerCase() === String(current.email).toLowerCase())
    if (idx === -1) return { ok: false, error: 'User not found.' }

    const emailTaken = users.some(
      (u, i) => i !== idx && String(u.email).toLowerCase() === cleanEmail,
    )
    if (emailTaken) return { ok: false, error: 'Email is already used by another account.' }

    const nextUsers = [...users]
    nextUsers[idx] = { ...nextUsers[idx], name: cleanName, email: cleanEmail, password: String(password) }
    setUsers(nextUsers)

    const nextSession = { ...current, email: cleanEmail }
    setSession(nextSession)
    setSessionState(nextSession)
    return { ok: true }
  }, [])

  const value = useMemo(
    () => ({
      session: isSessionValid(session) ? session : null,
      user,
      sessionMsLeft,
      register,
      login,
      logout,
      updateProfile,
    }),
    [session, user, sessionMsLeft, register, login, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

