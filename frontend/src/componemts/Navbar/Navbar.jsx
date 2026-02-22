import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("mobile-app");
  const { getTotalCartAmount, token, setToken, setCategory } = useContext(StoreContext);


  const navigate = useNavigate();
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate('/')
  };

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setCategory(name);
    setShowSuggestions(false);
    window.location.href = '#explore-menu';
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>

      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
      </ul>

      <div className='navbar-right'>
        <div className="navbar-search">
          <input
            type="text"
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);
              if (value === "") {
                setCategory("All");
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <img
            className='search'
            src={assets.search_icon}
            alt=""
            onClick={() => setShowSuggestions(!showSuggestions)}
          />
          {showSuggestions && (
            <ul className="search-suggestions">
              <li onClick={() => handleSuggestionClick("Salad")}>Salad</li>
              <li onClick={() => handleSuggestionClick("Rolls")}>Rolls</li>
              <li onClick={() => handleSuggestionClick("Deserts")}>Deserts</li>
              <li onClick={() => handleSuggestionClick("Sandwich")}>Sandwich</li>
              <li onClick={() => handleSuggestionClick("Cake")}>Cake</li>
              <li onClick={() => handleSuggestionClick("Pure Veg")}>Pure Veg</li>
              <li onClick={() => handleSuggestionClick("Pasta")}>Pasta</li>
              <li onClick={() => handleSuggestionClick("Noodles")}>Noodles</li>
            </ul>
          )}
        </div>
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate("/myorders")} ><img src={assets.bag_icon} alt="" />Orders</li>
              <hr />
              <li onClick={handleLogout}><img src={assets.logout_icon} alt="" />Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
