import React from 'react'
 import './Footer.css'
 import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p className='footer-content-left-p'>Quickbite is a restaurant delivery app that allows users to order food from their favorite restaurants and have it delivered to their doorstep.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />

                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in Touch</h2>
                <p>Bhopal, MP, India</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@quickbite.com</p>
            </div>
            
        </div>
        <hr />
        <div className="footer-copyright">
            <p>© 2026 Food Delivery App. All rights reserved.</p>
        </div>
        
    </div>
  )
}

export default Footer