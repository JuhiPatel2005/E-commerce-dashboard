import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button.jsx'
import { useCart } from '../store/cart/useCart.js'
import { formatCurrency } from '../utils/format.js'

function Qty({ qty, onDec, onInc }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <button
        type="button"
        className="h-9 w-9 text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-900"
        onClick={onDec}
        disabled={qty <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <div className="min-w-10 px-2 text-center text-sm font-semibold text-slate-900 tabular-nums dark:text-slate-100">{qty}</div>
      <button
        type="button"
        className="h-9 w-9 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
        onClick={onInc}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}

export function Cart() {
  const { items, total, inc, dec, removeItem, clear } = useCart()
  const [lastOrder, setLastOrder] = useState(null)

  const totalNow = useMemo(() => total, [total])
  const hasActiveCart = items.length > 0
  const hasLastOrder = Boolean(lastOrder?.items?.length)

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">Cart</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Manage items in your cart and view totals.</div>
        </div>
        {hasActiveCart ? (
          <Button variant="subtle" onClick={clear}>
            Clear cart
          </Button>
        ) : null}
      </div>

      <div className="mt-6">
        {!hasActiveCart && !hasLastOrder ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            Your cart is empty.
          </div>
        ) : hasLastOrder && !hasActiveCart ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
              <div className="text-sm font-semibold">Order placed</div>
              <div className="mt-1 text-sm">
                Total amount of bill: <span className="font-semibold">{formatCurrency(lastOrder.total)}</span>
              </div>
            </div>

            <div className="space-y-3">
              {lastOrder.items.map((i) => {
                const subtotal = Number(i.price || 0) * Number(i.qty || 0)
                return (
                  <div
                    key={i.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-lg bg-slate-50">
                        {i.thumbnail ? (
                          <img
                            src={i.thumbnail}
                            alt={i.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{i.title}</div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {formatCurrency(i.price)} × <span className="font-semibold tabular-nums">{i.qty}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center justify-end text-right text-sm text-slate-600 dark:text-slate-300">
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Subtotal</div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(subtotal)}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="subtle" onClick={() => setLastOrder(null)}>
                Start new cart
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              {items.map((i) => {
                const subtotal = Number(i.price || 0) * Number(i.qty || 0)
                return (
                  <div key={i.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-lg bg-slate-50">
                        {i.thumbnail ? (
                          <img src={i.thumbnail} alt={i.title} className="h-full w-full object-cover" loading="lazy" />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{i.title}</div>
                        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{formatCurrency(i.price)}</div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                      <Qty qty={i.qty} onDec={() => dec(i.id)} onInc={() => inc(i.id)} />
                      <div className="text-right text-sm text-slate-600 dark:text-slate-300">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Subtotal</div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(subtotal)}</div>
                      </div>
                      <Button variant="ghost" onClick={() => removeItem(i.id)} className="justify-center sm:justify-start">
                        Remove
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Summary</div>
              <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Items</span>
                  <span className="font-semibold tabular-nums">{items.length}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-600 dark:text-slate-300">Total</span>
                  <span className="text-base font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  onClick={() => {
                    setLastOrder({ items: items.map((x) => ({ ...x })), total: totalNow })
                    clear()
                  }}
                >
                  Place order
                </Button>
                <div className="text-xs text-slate-500 dark:text-slate-400">No backend / demo checkout.</div>
              </div>
              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                This is a demo checkout (no backend).
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

