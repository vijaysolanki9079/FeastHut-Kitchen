import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="place-order">
      {/* Left side - Billing & Shipping */}
      <div className="place-order-left">
        <h2>Billing & Shipping Details</h2>
        <form className="place-order-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="text" placeholder="Address Line 1" required />
          <input type="text" placeholder="Address Line 2" />
          <div className="form-row">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
            <input type="text" placeholder="Zip Code" required />
          </div>
          <button type="submit">Place Order</button>
        </form>
      </div>

      {/* Right side - Cart Summary */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
              <div class="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()} $</p>
              </div>
              <hr/>
              <div class="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? "0" : 2.5} $</p>
              </div>
              <hr/>
              <div class="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmount() === 0 ? "0" : getTotalCartAmount() + 2.5} $</b>
              </div>
          </div>
          <button className="checkout-btn">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
