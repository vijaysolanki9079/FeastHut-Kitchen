import React, { useEffect } from "react";
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, useLocation } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import './App.css' 
import { ToastContainer, toast } from "react-toastify";

function App() {
  const location = useLocation();
  const url = "http://localhost:4000";

  useEffect(() => {
    toast.dismiss();
  }, [location.pathname]);

  return (
    <>
    <div className="app">
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <div className="app-main">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List  />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
    <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
