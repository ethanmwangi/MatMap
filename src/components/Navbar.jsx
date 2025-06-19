// src/components/Navbar.jsx

import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"; // make sure this is the right path
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MatMap</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard-controller" className="hover:underline">Controller</Link>
          <Link to="/dashboard-customer" className="hover:underline">Customer</Link>
          <Link to="/Login" className="hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
};



export default Navbar;
