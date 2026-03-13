import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'
import { useAuth } from '../store/auth/useAuth.js'
import { useCart } from '../store/cart/useCart.js'
import { formatMs } from '../utils/format.js'

function QuickCard({ title, desc, action, onClick }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</div>
      <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{desc}</div>
      <div className="mt-4">
        <Button variant="subtle" onClick={onClick}>
          {action}
        </Button>
      </div>
    </div>
  )
}

export function Dashboard() {
  const { user, sessionMsLeft } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-400">Welcome</div>
          <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'User'}</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Session time left:{' '}
            <span className="font-semibold tabular-nums">{formatMs(sessionMsLeft)}</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          Items in cart: <span className="font-semibold tabular-nums">{count}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickCard
          title="Browse products"
          desc="View products in a responsive grid and add items to your cart."
          action="Go to Products"
          onClick={() => navigate('/app/products')}
        />
        <QuickCard
          title="Manage your cart"
          desc="Increase/decrease quantity, remove items, and see totals."
          action="Go to Cart"
          onClick={() => navigate('/app/cart')}
        />
        <QuickCard
          title="Edit profile"
          desc="Update your name, email, and password."
          action="Go to Profile"
          onClick={() => navigate('/app/profile')}
        />
      </div>
    </div>
  )
}

