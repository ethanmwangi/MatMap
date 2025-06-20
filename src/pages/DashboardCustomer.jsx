import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const DashboardCustomer = () => {
  const [fares, setFares] = useState([]);
  const [filter, setFilter] = useState(''); // <-- Added: state for search bar

  useEffect(() => {
    const q = query(collection(db, 'fares'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate().toLocaleString() // format time
      }));
      setFares(data);
    });

    return () => unsubscribe();
  }, []);

  // Filter fares by route name (case-insensitive)
  const filteredFares = fares.filter(fare =>
    fare.route?.toLowerCase().includes(filter.toLowerCase())
  ); // <-- Added: filtering logic

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Live Matatu Fare Updates</h2>

      {/* Search bar for filtering */}
      <input
        type="text"
        placeholder="Search by route..."
        className="w-full p-2 border mb-4"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      /> {/* <-- Added: search bar */}

      {filteredFares.length === 0 && <p>No fare updates yet.</p>}

      {filteredFares.map(fare => (
        <div key={fare.id} className="border p-4 mb-4 rounded shadow-sm">
          <h3 className="text-lg font-semibold">{fare.route}</h3>
          <p><strong>Fare:</strong> KES {fare.fare}</p>
          {fare.notes && <p><strong>Note:</strong> {fare.notes}</p>}
          <p className="text-sm text-gray-500">Posted: {fare.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCustomer;