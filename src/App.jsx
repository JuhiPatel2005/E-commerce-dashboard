import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './store/auth/AuthContext.jsx'
import { CartProvider } from './store/cart/CartContext.jsx'
import { ThemeProvider } from './store/theme/ThemeContext.jsx'
import { RequireAuth } from './store/auth/RequireAuth.jsx'
import { RequireGuest } from './store/auth/RequireGuest.jsx'
import { AppLayout } from './components/layout/AppLayout.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Products } from './pages/Products.jsx'
import { Cart } from './pages/Cart.jsx'
import { Profile } from './pages/Profile.jsx'
import { NotFound } from './pages/NotFound.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />

              <Route
                path="/login"
                element={
                  <RequireGuest>
                    <Login />
                  </RequireGuest>
                }
              />
              <Route
                path="/register"
                element={
                  <RequireGuest>
                    <Register />
                  </RequireGuest>
                }
              />

              <Route
                path="/app"
                element={
                  <RequireAuth>
                    <AppLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="cart" element={<Cart />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
