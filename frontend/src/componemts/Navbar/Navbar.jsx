import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <img src = {assets.logo} alt="" className="logo" />
      <ul className='navbar-menu'>
          <li>Home</li>
          <li>Menu</li>
          <li>Mobile-App</li>
          <li>Contact Us</li>
      </ul>

      <div className='navbar-right'>
        <img src = {assets.search_icon} alt="" />
        <div class="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div class="dot"></div>
        </div>
        <button>Sign in</button>
      </div>
    </div>
  );
}
