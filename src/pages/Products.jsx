import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button.jsx'
import { useCart } from '../store/cart/useCart.js'
import { useProducts } from '../hooks/useProducts.js'
import { formatCurrency } from '../utils/format.js'

function Qty({ qty, onDec, onInc }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-1 py-0.5 dark:border-slate-800 dark:bg-slate-950">
      <button
        type="button"
        className="h-7 w-7 text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-900"
        onClick={onDec}
        disabled={qty <= 0}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <div className="min-w-[20px] text-center text-sm font-semibold text-slate-900 tabular-nums dark:text-slate-100">{qty}</div>
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

function ProductCard({ p, cartItem, onAdd, onInc, onDec }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50 dark:bg-slate-900">
        <img
          src={p.thumbnail}
          alt={p.title}
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="line-clamp-2 min-h-10 text-sm font-semibold text-slate-900 dark:text-slate-100">{p.title}</div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(p.price)}</div>
          {cartItem ? (
            <Qty qty={cartItem.qty} onDec={onDec} onInc={onInc} />
          ) : (
            <Button size="sm" variant="primary" onClick={onAdd} title="Add to cart">
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export function Products() {
  const { products, loading, error } = useProducts()
  const { items, addItem, inc, dec } = useCart()
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('all')

  const cartMap = useMemo(() => {
    const m = new Map()
    for (const i of items) m.set(i.id, i)
    return m
  }, [items])

  const categories = useMemo(() => {
    const set = new Set()
    for (const p of products) if (p?.category) set.add(p.category)
    return ['all', ...Array.from(set).sort()]
  }, [products])

  const filtered = useMemo(() => {
    const query = String(q || '').trim().toLowerCase()
    return products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!query) return true
      return String(p.title || '').toLowerCase().includes(query)
    })
  }, [products, q, category])

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">Products</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Browse products and add items to your cart.</div>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{filtered.length ? `${filtered.length} items` : null}</div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">Search</div>
          <input
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none ring-indigo-500/30 placeholder:text-slate-400 focus:ring-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title…"
          />
        </label>

        <label className="block">
          <div className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-200">Category</div>
          <select
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none ring-indigo-500/30 focus:ring-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All categories' : c}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <Button
            variant="subtle"
            className="h-11 w-full"
            onClick={() => {
              setQ('')
              setCategory('all')
            }}
          >
            Clear filters
          </Button>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            Loading products…
          </div>
        ) : error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            No products match your search/filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                cartItem={cartMap.get(p.id)}
                onAdd={() => addItem(p)}
                onInc={() => inc(p.id)}
                onDec={() => dec(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

