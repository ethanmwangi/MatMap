import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <nav className="bg-blue-800 dark:bg-gray-900 text-white p-4 shadow transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MatMap</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard-controller" className="hover:underline">Controller</Link>
          <Link to="/dashboard-customer" className="hover:underline">Public View</Link>
          <Link to="/Login" className="hover:underline">Login</Link>
          <button
            onClick={() => setDark((d) => !d)}
            className="ml-4 px-3 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-yellow-300 transition"
            aria-label="Toggle dark mode"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;