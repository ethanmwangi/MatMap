import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("controller"); // default role
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isNewUser) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        setIsAuthenticated(true);
        navigate("/dashboard-controller");
      }
    } catch (error) {
      console.error("Error during authentication", error);
      alert(error.message);
    }
  };

  return (
   // ...existing code...
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-950">
      <div className="bg-white border border-blue-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center">
          {isNewUser ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-blue-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-blue-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-blue-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
            >
              <option value="Controller">Controller</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            {isNewUser ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-300">
          {isNewUser ? "Already have an account?" : "New user?"}{" "}
          <button
            onClick={() => setIsNewUser(!isNewUser)}
            className="text-blue-600 dark:text-blue-300 hover:underline font-semibold"
            type="button"
            >
                      {isNewUser ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
            
        
  );
};

export default Login;