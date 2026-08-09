import React, { useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'

import axios from 'axios'

const Login = ({ setToken, url }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const response = await axios.post(`${url}/api/user/login`, { email, password });
            if (response.data.success && response.data.role === 'owner') {
                const token = response.data.token;
                localStorage.setItem('adminToken', token);
                setToken(token);
            } else if (response.data.success) {
                setError('Access denied: You must be an owner to use this panel.');
            } else {
                setError(response.data.message || 'Invalid email or password.');
            }
        } catch (err) {
            setError('Error connecting to the server. Please try again.');
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
                        <p>Sign in with your <strong>Owner</strong> account credentials.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
