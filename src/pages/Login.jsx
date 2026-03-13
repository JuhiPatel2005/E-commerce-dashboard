import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/layout/AuthLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'
import { useAuth } from '../store/auth/useAuth.js'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = useMemo(() => location.state?.from || '/app/dashboard', [location.state])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const res = login({ email, password })
    setBusy(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <AuthLayout
      title="Login"
      subtitle="Sign in to access your dashboard"
      footer={
        <>
          Don’t have an account?{' '}
          <Link className="font-semibold text-indigo-700 hover:underline" to="/register">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
        ) : null}

        <Button disabled={busy} className="w-full" type="submit">
          {busy ? 'Signing in…' : 'Login'}
        </Button>
      </form>
    </AuthLayout>
  )
}

