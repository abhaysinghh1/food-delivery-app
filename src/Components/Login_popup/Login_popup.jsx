import React, { useState, useContext } from 'react'
import './Login_popup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const Login_popup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    const { setIsLoggedIn } = useContext(StoreContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        setShowLogin(false);
    }

    return (
        <div className='login-popup' onClick={() => setShowLogin(false)}>
            <form className='login-popup-container' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Login" ? <></> : <>
                        <input type="text" placeholder='Name' required />
                    </>}

                    <input type="email" placeholder='Email' required />
                    <input type="password" placeholder='Password' required />
                </div>
                <button type="submit">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    )
}

export default Login_popup 