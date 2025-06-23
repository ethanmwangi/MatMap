import React, { useEffect, useState, useRef } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate, Link } from 'react-router-dom';

function getInitials(user) {
  if (!user) return "?";
  if (user.displayName) {
    const parts = user.displayName.split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  }
  if (user.email) return user.email[0].toUpperCase();
  return "?";
}

const Navbar = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [user, setUser] = useState(auth.currentUser);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }
    if (dropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdown]);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 dark:bg-gray-900 text-white p-4 shadow transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MatMap</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard-controller" className="hover:underline">Controller</Link>
          <Link to="/dashboard-customer" className="hover:underline">Public View</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <button
            onClick={() => setDark((d) => !d)}
            className="ml-4 px-3 py-1 rounded bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-yellow-300 transition"
            aria-label="Toggle dark mode"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown((d) => !d)}
                className="ml-4 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold border-2 border-white dark:border-gray-700 shadow"
                aria-label="Profile"
              >
                {getInitials(user)}
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white mr-3">
                      {getInitials(user)}
                    </div>
                    <div>
                      <div className="font-semibold text-blue-700 dark:text-blue-300">
                        {user.displayName || "User"}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                     >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;