import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { getTheme, setTheme } from './themeStorage.js'

export const ThemeContext = createContext(null)

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => getTheme())

  useEffect(() => {
    applyTheme(theme)
    setTheme(theme)
  }, [theme])

  const toggle = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(() => ({ theme, setTheme: setThemeState, toggle }), [theme, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

