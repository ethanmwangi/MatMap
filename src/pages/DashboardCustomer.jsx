import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const DashboardCustomer = () => {
  const [fares, setFares] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'fares'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate().toLocaleString()
      }));
      setFares(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredFares = fares.filter(fare =>
    fare.route?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Live Matatu Fare Updates</h2>

      <input
        type="text"
        placeholder="Search by route..."
        className="w-full p-2 border mb-4"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
        </div>
      ) : filteredFares.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <svg className="mx-auto mb-4 w-16 h-16 text-blue-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          <p>No fare updates yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredFares.map(fare => (
            <div
              key={fare.id}
              className="border p-6 rounded-lg bg-white shadow transition-transform duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-blue-600"
            >
              <h3 className="text-lg font-semibold text-blue-700">{fare.route}</h3>
              <p><strong>Fare:</strong> KES {fare.fare}</p>
              {fare.notes && <p><strong>Note:</strong> {fare.notes}</p>}
              <p className="text-sm text-gray-500">Posted: {fare.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardCustomer;