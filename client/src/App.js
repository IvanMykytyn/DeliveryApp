import { BrowserRouter, Routes, Route } from 'react-router-dom'

import {
  ShoppingCart,
  Shops,
  Landing,
  Register,
  Login,
  Error,
  LandingLayout,
  ProtectedRoute,
} from './pages'
import Something from './pages/Something'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<LandingLayout />}>
            <Route path="landing" element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="shops" element={<Shops />} />
            <Route path="cart" element={<ShoppingCart />} />
          </Route>
            <Route path='something' element={<Something />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
