import React, { useState, useEffect } from 'react'
import Navbar from './Components/Sidebar/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Order from './Pages/Order/Order'
import Login from './Pages/Login/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
  }

  if (!token) {
    return (
      <>
        <ToastContainer theme='colored' />
        <Login setToken={setToken} url={url} />
      </>
    )
  }

  return (
    <div className='admin-layout'>
      <ToastContainer theme='colored' />
      <Navbar logout={logout} />
      <div className="admin-body">
        <Sidebar />
        <main className="admin-main">
          <Routes>
            <Route path='/add' element={<Add url={url} token={token} />} />
            <Route path='/list' element={<List url={url} token={token} />} />
            <Route path='/order' element={<Order url={url} token={token} />} />
            <Route path='/' element={<Navigate to='/add' replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App