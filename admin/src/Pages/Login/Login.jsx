import React, { useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const ADMIN_EMAIL = 'admin@quickbite.com'
    const ADMIN_PASSWORD = 'admin123'

    const handleLogin = (e) => {
        e.preventDefault()
        setError('')
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = btoa(`${email}:${Date.now()}`)
            localStorage.setItem('adminToken', token)
            setToken(token)
        } else {
            setError('Invalid email or password. Please try again.')
        }
    }

    return (
        <div className='admin-login-page'>
            <div className='login-left'>
                <div className='login-brand'>
                    <img src={assets.logo} alt="QuickBite" className='login-logo' />
                    <h1>QuickBite Admin</h1>
                    <p>Restaurant Management Dashboard</p>
                </div>
                <div className='login-features'>
                    <div className='feature-item'>
                        <span className='feature-icon'>🍔</span>
                        <span>Manage your menu items</span>
                    </div>
                    <div className='feature-item'>
                        <span className='feature-icon'>📦</span>
                        <span>Track & update orders</span>
                    </div>
                    <div className='feature-item'>
                        <span className='feature-icon'>📊</span>
                        <span>Monitor restaurant performance</span>
                    </div>
                </div>
            </div>

            <div className='login-right'>
                <div className='login-card'>
                    <div className='login-card-header'>
                        <div className='admin-badge'>🔐 Admin Access Only</div>
                        <h2>Welcome Back</h2>
                        <p>Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className='login-form'>
                        <div className='input-group'>
                            <label>Email Address</label>
                            <input
                                type='email'
                                placeholder='admin@quickbite.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <div className='login-error'>{error}</div>}

                        <button type='submit' className='login-btn'>
                            Sign In to Dashboard →
                        </button>
                    </form>

                    <div className='login-hint'>
                        <p>Demo credentials: <strong>admin@quickbite.com</strong> / <strong>admin123</strong></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
