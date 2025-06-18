import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('controller'); // default role

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // You can store role in Firestore later if needed
      alert(`Account created successfully for ${role}`);
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register for MatMap</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-2 border"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="controller">Matatu Controller</option>
          <option value="customer">Passenger / Customer</option>
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
