import React, { useState } from 'react'
import NavBar from './Components/NavBar/navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import Login_popup from './Components/Login_popup/Login_popup'
import OrderConfirmed from './Pages/OrderConfirmed/OrderConfirmed'
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>

      {
        showLogin ? <Login_popup setShowLogin={setShowLogin} /> : <></>
      }
      <div className='app'>
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/order-confirmed' element={<OrderConfirmed />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>

      </div>
      <Footer />
    </>
  )
}

export default App
