import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

export const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

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
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div class="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
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
                <p>{0}</p>
              </div>
              <hr/>
              <div class="cart-total-details">
                <p>Delivery Fee</p>
                <p>{2}</p>
              </div>
              <hr/>
              <div class="cart-total-details">
                <p>Total</p>
                <p>{0}</p>
              </div>
              <button>PROCEED TO CHECKOUT</button>
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
