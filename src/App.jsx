import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardController from "./pages/DashboardController";
import DashboardCustomer from "./pages/DashboardCustomer";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <BrowserRouter>
      <Navbar />
      {/* Add dark/light background here */}
      <div className="min-h-screen bg-blue-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard-customer" element={<DashboardCustomer />} />
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route
                path="/dashboard-controller"
                element={<DashboardController />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;