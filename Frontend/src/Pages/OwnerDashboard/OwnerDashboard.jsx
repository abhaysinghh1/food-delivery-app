import React, { useState, useContext } from 'react'
import './OwnerDashboard.css'
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom'
import OwnerAdd from './OwnerAdd'
import OwnerList from './OwnerList'
import OwnerOrders from './OwnerOrders'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'

const OwnerDashboard = () => {
    const { setToken, setUserRole, url, userName, userEmail } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setToken('');
        setUserRole('customer');
        navigate('/');
    }

    return (
        <div className='owner-dashboard'>
            {/* Owner Sidebar */}
            <aside className='owner-sidebar'>
                <div className='owner-sidebar-header'>
                    <div className='owner-avatar'>🏪</div>
                    <div>
                        <p className='owner-name'>{userName || 'Restaurant Owner'}</p>
                        <p className='owner-email'>{userEmail || 'owner@quickbite.com'}</p>
                    </div>
                </div>

                <nav className='owner-nav'>
                    <NavLink to='/owner/add' className={({ isActive }) => `owner-nav-item ${isActive ? 'active' : ''}`}>
                        <span>➕</span> Add Product
                    </NavLink>
                    <NavLink to='/owner/list' className={({ isActive }) => `owner-nav-item ${isActive ? 'active' : ''}`}>
                        <span>📋</span> Food Items
                    </NavLink>
                    <NavLink to='/owner/orders' className={({ isActive }) => `owner-nav-item ${isActive ? 'active' : ''}`}>
                        <span>📦</span> Orders
                    </NavLink>
                </nav>

                <button className='owner-logout' onClick={handleLogout}>
                    🚪 Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className='owner-main'>
                <Routes>
                    <Route path='add'    element={<OwnerAdd url={url} />} />
                    <Route path='list'   element={<OwnerList url={url} />} />
                    <Route path='orders' element={<OwnerOrders url={url} />} />
                    <Route path='*'      element={<Navigate to='add' replace />} />
                </Routes>
            </main>
        </div>
    )
}

export default OwnerDashboard
