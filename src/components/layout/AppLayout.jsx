import { Outlet, useNavigate } from 'react-router-dom'
import { Container } from '../ui/Container.jsx'
import { Logo } from '../ui/Logo.jsx'
import { Button } from '../ui/Button.jsx'
import { NavLinkItem } from './NavLinkItem.jsx'
import { useAuth } from '../../store/auth/useAuth.js'
import { useCart } from '../../store/cart/useCart.js'
import { useTheme } from '../../store/theme/useTheme.js'
import { formatMs } from '../../utils/format.js'
import { useEffect, useState } from 'react'

function Sidebar({ onNavigate }) {
  return (
    <nav className="space-y-1">
      <NavLinkItem to="/app/dashboard" label="Dashboard" end onClick={onNavigate} />
      <NavLinkItem to="/app/products" label="Products" onClick={onNavigate} />
      <NavLinkItem to="/app/cart" label="Cart" onClick={onNavigate} />
      <NavLinkItem to="/app/profile" label="Profile" onClick={onNavigate} />
    </nav>
  )
}

export function AppLayout() {
  const { user, logout, sessionMsLeft } = useAuth()
  const { count } = useCart()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [])

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 lg:hidden dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
              type="button"
            >
              <span className="text-lg leading-none">≡</span>
            </button>
            <button type="button" className="text-left" onClick={() => navigate('/app/dashboard')}>
              <Logo />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 sm:flex dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
              <span className="text-slate-500 dark:text-slate-400">Session</span>
              <span className="font-semibold tabular-nums">{formatMs(sessionMsLeft)}</span>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
              onClick={toggle}
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-14a1 1 0 0 1 1-1h0a1 1 0 1 1-1 1Zm0 20a1 1 0 1 1 1-1 1 1 0 0 1-1 1ZM4 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm20 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM5.64 6.64a1 1 0 0 1 1.41-1.41l.01.01a1 1 0 1 1-1.42 1.4Zm12.72 12.72a1 1 0 0 1 1.41-1.41l.01.01a1 1 0 1 1-1.42 1.4ZM6.64 18.36a1 1 0 0 1 1.41 1.41l-.01.01a1 1 0 1 1-1.4-1.42Zm12.72-12.72a1 1 0 0 1 1.41 1.41l-.01.01a1 1 0 1 1-1.4-1.42Z"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
                  />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
              onClick={() => navigate('/app/cart')}
            >
              <span>Cart</span>
              <span className="grid h-6 min-w-6 place-items-center rounded-md bg-slate-100 px-2 text-xs font-semibold text-slate-800 tabular-nums dark:bg-slate-900 dark:text-slate-100">
                {count}
              </span>
            </button>
            <Button
              variant="subtle"
              className="hidden sm:inline-flex"
              onClick={() => {
                logout()
                navigate('/login', { replace: true })
              }}
            >
              Logout
            </Button>
          </div>
        </Container>
      </header>

      <Container className="py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden rounded-xl border border-slate-200 bg-white p-4 lg:block dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4">
              <div className="text-xs text-slate-500">Signed in as</div>
              <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'User'}</div>
              <div className="truncate text-sm text-slate-600 dark:text-slate-300">{user?.email || ''}</div>
            </div>
            <Sidebar />
            <div className="mt-6 rounded-lg bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Session</span>
                <span className="font-semibold tabular-nums">{formatMs(sessionMsLeft)}</span>
              </div>
            </div>
            <div className="mt-3">
              <Button
                variant="subtle"
                className="w-full"
                onClick={() => {
                  logout()
                  navigate('/login', { replace: true })
                }}
              >
                Logout
              </Button>
            </div>
          </aside>

          <main className="min-w-0">
            {mobileOpen ? (
              <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 lg:hidden dark:border-slate-800 dark:bg-slate-950">
                <Sidebar onNavigate={() => setMobileOpen(false)} />
                <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  <span className="text-slate-500">Session</span>
                  <span className="font-semibold tabular-nums">{formatMs(sessionMsLeft)}</span>
                </div>
                <div className="mt-3">
                  <Button
                    variant="subtle"
                    className="w-full"
                    onClick={() => {
                      logout()
                      navigate('/login', { replace: true })
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-950">
              <Outlet />
            </div>
          </main>
        </div>
      </Container>
    </div>
  )
}

