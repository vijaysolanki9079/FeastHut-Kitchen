import React, { useState } from 'react'
import { Navbar } from './componemts/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import { Cart } from './pages/Cart/Cart';
import Footer from './componemts/Footer/Footer';


const App = () => {
  const [showLogin, setShowLogin] = useStatee(false);

  return (
    <>
    {showLogin ? <LoginPopup /> : <></> } 
      <div className='app'> 
        <Navbar />
        <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/cart' element = {<Cart />} />
            <Route path='/placeorder' element = {<PlaceOrder />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
  
};

export default App;
