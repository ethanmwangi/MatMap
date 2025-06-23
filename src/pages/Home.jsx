import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-950 relative overflow-hidden">
    {/* SVG Pattern Background */}
    <svg
      className="absolute inset-0 w-full h-full opacity-10"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 640 480"
    >
      <defs>
        <pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width="40"
          height="40"
        >
          <circle cx="20" cy="20" r="4" fill="#2563eb" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern)" />
    </svg>

    {/* Main Content */}
    <div className="relative z-10 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 border border-blue-200 dark:border-gray-700 rounded-xl shadow-xl p-10 max-w-xl w-full text-center">
      <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-4">Welcome to MatMap</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
        <span className="font-semibold text-blue-600 dark:text-blue-300">MatMap</span> is your real-time matatu fare tracker for Nairobi and beyond.
         Instantly view, share, and update fare prices and route notes. Whether you’re a commuter or a controller, MatMap keeps you informed and connected on the go!
      </p>
      <Link
        to="/login"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
      >
        Get Started
         </Link>
    </div>
  </div>
);

export default Home;