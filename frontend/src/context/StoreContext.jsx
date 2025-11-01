import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios"
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000"; 
  const [token, setToken] = useState("")


  const [food_list, setFoodList] = useState([]);
  // -- food from the backend 

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        console.error("Failed to load food list:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  
  // ! ✅ Load token from localStorage on page load
  useEffect(() => {
    async function  loadData() {
      await fetchFoodList();;
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
    loadData();
  }, []);

  // ! ✅ Whenever token changes, store it in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token"); // in case of logout
    }
  }, [token]);

  // ---------------------------
  // ! Cart Handling
  // ---------------------------
  const addToCart = (itemId) => {
    // first time entering into the cart
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // cart total 
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = food_list.find((product) => product._id === item) 
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token, 
    setToken, 
    fetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
