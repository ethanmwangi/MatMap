import React, { useState } from 'react';
import { db, auth } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import ControllerUpdates from '../components/ControllerUpdates';

const DashboardController = () => {
  const [route, setRoute] = useState('');
  const [fare, setFare] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const handlePostFare = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'fares'), {
        id: uuidv4(),
        route,
        fare,
        notes,
        timestamp: Timestamp.now(),
        // userId: auth.currentUser.uid // Uncomment if you want to filter by user
      });
      setMessage('✅ Fare update posted!');
      setRoute('');
      setFare('');
      setNotes('');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to post update.');
    }
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Post Fare Update</h2>

      {message && <p className="mb-2 text-sm text-green-600">{message}</p>}

      <form onSubmit={handlePostFare} className="space-y-4">
        <input
          type="text"
          placeholder="Route (e.g. CBD to Rongai)"
          className="w-full p-2 border"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Fare (KES)"
          className="w-full p-2 border"
          value={fare}
          onChange={(e) => setFare(e.target.value)}
          required
        />

        <textarea
          placeholder="Optional notes (e.g. Traffic, strike...)"
          className="w-full p-2 border"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Update
        </button>
      </form>

      {/* Show the list of updates with edit/delete buttons and filter */}
      <div className="mt-8">
        <ControllerUpdates />
      </div>
    </div>
  );
};

export default DashboardController;