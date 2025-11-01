import "./Navbar.css"
import { assets } from '../../assets/assets';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
        <NavLink to="/" className="logo">
          <img src={assets.logo} alt="Logo" />
        </NavLink>
        <img className='profile' src={assets.profile_image} alt=""/>
    </div>
  )
}

export default Navbar