
// src/components/Login.js
import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "firebase/auth";
const Login = ({ setUser, setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("controller"); // default role
  const [isNewUser, setIsNewUser] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isNewUser) {
        // Create account
        userCredential = await createUserWithEmailAndPassword(auth, email, 
password);
      } else {
        // Sign in
        userCredential = await signInWithEmailAndPassword(auth, email, 
password);
      }
      setUser(userCredential.user);
      setUserRole(role);
    } catch (error) {
      console.error("Error during authentication", error);
      alert(error.message);
    }
  };
  return (
    <div>
      <h2>{isNewUser ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <div>
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Controller">Controller</option>
            <option value="Customer">Customer</option>
          </select>
        </div>
        <button type="submit">{isNewUser ? "Sign Up" : "Login"}</button>
      </form>
      <p>
        {isNewUser ? "Already have an account?" : "New user?"}{" "}
        <button onClick={() => setIsNewUser(!isNewUser)}>
          {isNewUser ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};
export default Login;