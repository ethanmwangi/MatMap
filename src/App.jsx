import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import DashboardController from './pages/DashboardController'; 
import DashboardCustomer from './pages/DashboardCustomer';


const App = () => {
  return (
   <BrowserRouter>
   <Navbar />
    
      
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard-controller" element={<DashboardController />} />
       <Route path="/dashboard-customer" element={<DashboardCustomer />} />

        </Routes>
      </div>
    
   </BrowserRouter>
  );
};

export default App;
