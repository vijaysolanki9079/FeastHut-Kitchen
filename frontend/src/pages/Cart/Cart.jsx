import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="cart">
        <div class="cart-items">
          <div class="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div class="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price} $</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]} $</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
              );
            }
          })}
        </div>

        <div class="cart-bottom">
          <div class="cart-total">
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
              <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>

            <div class="cart-promo-code">
              <div>
                <p>If you have a promo code, Enter it here</p>
                <div className="cart-promo-code-input">
                    <input type="text " placeholder="Promo Code" />
                    <button>Submit</button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};
