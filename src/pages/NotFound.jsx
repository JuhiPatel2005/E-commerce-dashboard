import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'

export function NotFound() {
  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center px-4 py-14 text-center">
        <div className="text-6xl font-semibold text-slate-900">404</div>
        <div className="mt-2 text-lg font-semibold text-slate-900">Page not found</div>
        <div className="mt-1 text-sm text-slate-600">The page you’re looking for doesn’t exist.</div>
        <div className="mt-6">
          <Button as={Link} to="/login" variant="primary">
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  )
}

