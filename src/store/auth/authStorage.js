const LS_USERS = 'riptt_users'
const LS_SESSION = 'riptt_session'

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function getUsers() {
  if (typeof window === 'undefined') return []
  return safeParse(window.localStorage.getItem(LS_USERS), [])
}

export function setUsers(users) {
  window.localStorage.setItem(LS_USERS, JSON.stringify(users))
}

export function getSession() {
  if (typeof window === 'undefined') return null
  return safeParse(window.localStorage.getItem(LS_SESSION), null)
}

export function setSession(session) {
  window.localStorage.setItem(LS_SESSION, JSON.stringify(session))
}

export function clearSession() {
  window.localStorage.removeItem(LS_SESSION)
}

export function isSessionValid(session) {
  if (!session) return false
  if (!session.email || !session.expiresAt) return false
  return Date.now() < Number(session.expiresAt)
}

