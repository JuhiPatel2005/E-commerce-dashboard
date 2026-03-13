import { Link } from 'react-router-dom'
import { Container } from '../ui/Container.jsx'
import { Logo } from '../ui/Logo.jsx'

export function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      <Container className="py-10">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex justify-center">
            <Link to="/login" className="rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40">
              <Logo />
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-6 text-center">
              <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</div>
              {subtitle ? <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</div> : null}
            </div>
            {children}
          </div>
          {footer ? <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">{footer}</div> : null}
        </div>
      </Container>
    </div>
  )
}

