// src/components/Navbar.jsx

import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"; // make sure this is the right path
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <h1>MatMap</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
