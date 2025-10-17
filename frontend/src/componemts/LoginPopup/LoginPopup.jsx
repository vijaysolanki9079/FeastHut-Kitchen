import React, { useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

  const [currState, setCurrState] = useState("Sign Up")

  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
            <div class="login-popup-title">
              <h2>{currState}</h2>
              <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div class="login-popup-inputs">
              {/* At Login Time Just email and pass fields req. */}
              {currState === "Login" ? <></> : <input type="text" placeholder='Your Name' requierd />}
              <input type="email" placeholder='Your Email' required />
              <input type="password" placeholder='Password' required />
            </div>

            <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
            <div class="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login" ? 
              <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
              : <p>Already have a account? <span onClick={() => setCurrState("Login")}>Login here</span> </p>
            }
            
        </form>
    </div>
  )
}

export default LoginPopup