const LS_THEME = 'riptt_theme'

export function getTheme() {
  if (typeof window === 'undefined') return 'light'
  const v = window.localStorage.getItem(LS_THEME)
  return v === 'dark' ? 'dark' : 'light'
}

export function setTheme(theme) {
  window.localStorage.setItem(LS_THEME, theme)
}

