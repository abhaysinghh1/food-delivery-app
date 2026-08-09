import React, { useState, useContext, Suspense, lazy } from 'react'
import NavBar from './Components/NavBar/navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Login_popup from './Components/Login_popup/Login_popup'
import { StoreContext } from './Context/StoreContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Lazy Load Pages
const Home = lazy(() => import('./Pages/Home/Home'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const PlaceOrder = lazy(() => import('./Pages/PlaceOrder/PlaceOrder'));
const OrderConfirmed = lazy(() => import('./Pages/OrderConfirmed/OrderConfirmed'));
const OwnerDashboard = lazy(() => import('./Pages/OwnerDashboard/OwnerDashboard'));

const OwnerRoute = ({ children }) => {
  const { userRole, token } = useContext(StoreContext);
  if (userRole === 'owner' && token) return children;
  return <Navigate to='/' replace />;
}

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      <ToastContainer theme='colored' />
      {showLogin && <Login_popup setShowLogin={setShowLogin} />}
      <div className='app'>
        <NavBar setShowLogin={setShowLogin} />
        <Suspense fallback={<div className="page-loader"><div className="spinner"></div></div>}>
          <Routes>
            {/* Customer Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/order-confirmed' element={<OrderConfirmed />} />

            {/* Owner / Admin Routes */}
            <Route path='/owner/*' element={
              <OwnerRoute><OwnerDashboard /></OwnerRoute>
            } />

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  )
}

export default App
