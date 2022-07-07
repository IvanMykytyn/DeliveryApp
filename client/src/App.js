import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ShoppingCart, Shops, Landing, Register,Login, Error } from './pages'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route path='landing' element={<Landing/>} />
        <Route path='register' element={<Register />}/>
        <Route path='login' element={<Login />}/>
        <Route path='shops' element={<Shops />}/>
        <Route path='cart' element={<ShoppingCart />}/>
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
