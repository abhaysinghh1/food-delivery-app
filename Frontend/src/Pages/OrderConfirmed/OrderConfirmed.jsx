import React from 'react'
import './OrderConfirmed.css'
import { useNavigate } from 'react-router-dom'

const OrderConfirmed = () => {
    const navigate = useNavigate();

    return (
        <div className="order-confirmed">
            <div className="order-confirmed-card">
                <div className="checkmark-circle">
                    <span className="checkmark">✓</span>
                </div>
                <h1>Order Confirmed!</h1>
                <p>Thank you for your order. Your delicious food is being prepared and will be delivered soon.</p>
                <p className="order-id">Order ID: #{Math.floor(100000 + Math.random() * 900000)}</p>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        </div>
    )
}

export default OrderConfirmed
