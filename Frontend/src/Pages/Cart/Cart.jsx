import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
const promoCodes = {
  "SAVE10": { discount: 10, type: "percent" },
  "SAVE20": { discount: 20, type: "percent" },
  "FREEDEL": { discount: 0, type: "free_delivery" },
}

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, deleteFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");
  const navigate = useNavigate();
  const handlePromoSubmit = () => {
    const code = promoInput.trim().toUpperCase();
    if (appliedPromo) {
      setPromoMessage("A promo code is already applied!");
      return;
    }
    if (promoCodes[code]) {
      setAppliedPromo({ code, ...promoCodes[code] });
      setPromoMessage(`Promo code "${code}" applied successfully!`);
    } else {
      setPromoMessage("Invalid promo code. Try again.");
    }
  }

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoMessage("");
  }

  const subtotal = getTotalCartAmount;
  const discountAmount = appliedPromo
    ? appliedPromo.type === "percent"
      ? (subtotal * appliedPromo.discount) / 100
      : 0
    : 0;
  const deliveryFee = subtotal === 0
    ? 0
    : appliedPromo && appliedPromo.type === "free_delivery"
      ? 0
      : 2;
  const total = subtotal === 0 ? 0 : subtotal - discountAmount + deliveryFee;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className="cart-quantity-controls">
                    <button onClick={() => removeFromCart(item._id)}>-</button>
                    <p>{cartItems[item._id]}</p>
                    <button onClick={() => addToCart(item._id)}>+</button>
                  </div>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => deleteFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            {discountAmount > 0 && (
              <>
                <div className="cart-total-details cart-discount">
                  <p>Discount ({appliedPromo.discount}%)</p>
                  <p>-${discountAmount.toFixed(2)}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{deliveryFee === 0 && subtotal > 0 ? <span className="free-tag">FREE</span> : `$${deliveryFee}`}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>
          {total === 0 ? null : <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>}
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder='Promo Code'
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              disabled={!!appliedPromo}
            />
            {appliedPromo
              ? <button onClick={removePromo} className="remove-promo-btn">Remove</button>
              : <button onClick={handlePromoSubmit}>Submit</button>
            }
          </div>
          {promoMessage && (
            <p className={`promo-message ${appliedPromo ? 'success' : 'error'}`}>
              {promoMessage}
            </p>
          )}
          <p className="promo-hint">Try: SAVE10, SAVE20, FREEDEL</p>
        </div>
      </div>
    </div>
  )
}

export default Cart