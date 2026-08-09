import React, { useState, useContext } from 'react'
import './Login_popup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';

const Login_popup = ({ setShowLogin }) => {
    const { url, setToken, setUserRole, setUserName, setUserEmail } = useContext(StoreContext);
    const [role, setRole] = useState('customer'); // 'customer' | 'owner'
    const [currState, setCurrState] = useState("Login"); // 'Login' | 'Sign Up'

    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState('');

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
        setError('');
    }

    const switchRole = (newRole) => {
        setRole(newRole);
        setError('');
        setCurrState("Login");
        setData({ name: '', email: '', password: '' });
    }

    const onLogin = async (e) => {
        e.preventDefault();
        setError('');

        const endpoint = currState === "Login"
            ? url + "/api/user/login"
            : url + "/api/user/register";

        const payload = currState === "Sign Up"
            ? { name: data.name, email: data.email, password: data.password, role }
            : { email: data.email, password: data.password };

        try {
            const response = await axios.post(endpoint, payload);
            if (response.data.success) {
                const { token, name, email: userEmail, role: userRole } = response.data;

                // Verify the user logged in with the correct role tab
                if (userRole !== role) {
                    setError(`This account is registered as a "${userRole}". Please switch to the correct tab.`);
                    return;
                }

                localStorage.setItem("token", token);
                localStorage.setItem('userRole', userRole);
                localStorage.setItem('userName', name);
                localStorage.setItem('userEmail', userEmail);

                setToken(token);
                setUserRole(userRole);
                setUserName(name);
                setUserEmail(userEmail);
                setShowLogin(false);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <div className='login-popup' onClick={() => setShowLogin(false)}>
            <form onSubmit={onLogin} className='login-popup-container' onClick={(e) => e.stopPropagation()}>

                {/* Role Tabs */}
                <div className='role-tabs'>
                    <button
                        type='button'
                        className={`role-tab ${role === 'customer' ? 'active' : ''}`}
                        onClick={() => switchRole('customer')}
                    >
                        🍽️ Customer
                    </button>
                    <button
                        type='button'
                        className={`role-tab ${role === 'owner' ? 'active' : ''}`}
                        onClick={() => switchRole('owner')}
                    >
                        🏪 Restaurant Owner
                    </button>
                </div>

                <div className='login-popup-title'>
                    <h2>{currState === "Sign Up"
                        ? (role === 'owner' ? 'Register as Owner' : 'Create Account')
                        : (role === 'owner' ? 'Owner Login' : 'Login')
                    }</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className='login-popup-inputs'>
                    {currState === "Sign Up" && (
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text"
                            placeholder={role === 'owner' ? 'Restaurant / Owner Name' : 'Your Name'} required />
                    )}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email"
                        placeholder='Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password"
                        placeholder='Password (min 8 characters)' required />
                </div>

                {error && <p className='login-error'>{error}</p>}

                <button type="submit">
                    {currState === "Sign Up"
                        ? (role === 'owner' ? 'Register Restaurant' : 'Create Account')
                        : (role === 'owner' ? 'Enter Dashboard' : 'Login')
                    }
                </button>

                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login"
                    ? <p>
                        {role === 'owner' ? 'New restaurant owner? ' : 'Create a new account? '}
                        <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
                      </p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
                }

            </form>
        </div>
    )
}

export default Login_popup