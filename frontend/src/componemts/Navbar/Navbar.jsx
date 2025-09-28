import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" />
    </div>
  );
}
