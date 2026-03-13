const LS_CART = 'riptt_cart'

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function getCart() {
  if (typeof window === 'undefined') return []
  return safeParse(window.localStorage.getItem(LS_CART), [])
}

export function setCart(items) {
  window.localStorage.setItem(LS_CART, JSON.stringify(items))
}

export function clearCart() {
  window.localStorage.removeItem(LS_CART)
}

