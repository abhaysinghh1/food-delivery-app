import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalCartAmount, setCartItems, isLoggedIn } = useContext(StoreContext);
  const navigate = useNavigate();
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in before placing an order.");
      return;
    }
    setCartItems({});
    navigate('/order-confirmed');
  }

  return (
    <form onSubmit={handleSubmit} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' required />
          <input type="text" placeholder='Last Name' required />
        </div>
        <input type="email" placeholder='Email' required />
        <input type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input type="text" placeholder='City' required />
          <input type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' required />
          <input type="text" placeholder='Country' required />
        </div>
        <input type="tel" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>
          <button type="submit">PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder