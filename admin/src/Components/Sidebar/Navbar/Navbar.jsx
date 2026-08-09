import React from 'react'
import './Navbar.css'
import { assets } from '../../../assets/assets.js'

const Navbar = ({ logout }) => {
    return (
        <div className="admin-navbar">
            <div className='admin-navbar-left'>
                <img className='admin-logo' src={assets.logo} alt="QuickBite" />
                <div className='admin-title'>
                    <span className='admin-panel-label'>Admin Panel</span>
                    <span className='admin-panel-sub'>Restaurant Dashboard</span>
                </div>
            </div>
            <div className='admin-navbar-right'>
                <div className='admin-user-info'>
                    <div className='admin-avatar'>A</div>
                    <div>
                        <p className='admin-name'>Admin</p>
                        <p className='admin-email'>admin@quickbite.com</p>
                    </div>
                </div>
                <button className='admin-logout-btn' onClick={logout}>
                    <img src={assets.logout_icon} alt="" />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar