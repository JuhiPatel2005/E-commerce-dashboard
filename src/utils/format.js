export function formatCurrency(amount) {
  const n = Number(amount)
  const safe = Number.isFinite(n) ? n : 0
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(safe)
}

export function formatMs(ms) {
  const total = Math.max(0, Math.floor(Number(ms || 0) / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

