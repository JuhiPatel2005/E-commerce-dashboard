import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'
import { useAuth } from '../store/auth/useAuth.js'

export function Profile() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setPassword(user?.password || '')
  }, [user])

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setBusy(true)
    const res = updateProfile({ name, email, password })
    setBusy(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    setSuccess('Profile updated successfully.')
  }

  return (
    <div>
      <div>
        <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">Profile</div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">View and edit your account details.</div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
          ) : null}
          {success ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {success}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <Button disabled={busy} type="submit">
              {busy ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>

        <div className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Account</div>
          <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Current name</div>
              <div className="font-semibold text-slate-900 dark:text-slate-100">{user?.name || '—'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Current email</div>
              <div className="truncate font-semibold text-slate-900 dark:text-slate-100">{user?.email || '—'}</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

