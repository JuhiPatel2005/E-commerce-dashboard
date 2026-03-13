import { useEffect, useMemo, useState } from 'react'

const API = 'https://dummyjson.com/products?limit=24'

export function useProducts() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const ctrl = new AbortController()
    async function run() {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(API, { signal: ctrl.signal })
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        if (e?.name === 'AbortError') return
        setError(e?.message || 'Failed to load products.')
      } finally {
        setLoading(false)
      }
    }
    run()
    return () => ctrl.abort()
  }, [])

  const products = useMemo(() => {
    const list = data?.products
    return Array.isArray(list) ? list : []
  }, [data])

  return { products, loading, error }
}

