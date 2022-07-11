// React Router dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import {
  ShoppingCart,
  Shops,
  Landing,
  Register,
  Login,
  Error,
  LandingLayout,
  ProtectedRoute,
  History,
} from './pages'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<LandingLayout />}>
            <Route index element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="shops" element={<Shops />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="history" element={<History />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
