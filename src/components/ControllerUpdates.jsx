import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function ControllerUpdates() {
  const [updates, setUpdates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ route: '', fare: '', notes: '' });
  const [filter, setFilter] = useState('');

  const fetchUpdates = async () => {
    const querySnapshot = await getDocs(collection(db, 'fares'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUpdates(data);
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleEdit = (update) => {
    setEditingId(update.id);
    setEditedData({ route: update.route, fare: update.fare, notes: update.notes });
  };

  const handleSave = async (id) => {
    const updatedDoc = {
      route: editedData.route.trim(),
      fare: Number(editedData.fare),
      notes: editedData.notes.trim(),
    };

    try {
      await updateDoc(doc(db, 'fares', id), updatedDoc);
      setEditingId(null);
      fetchUpdates();
    } catch (err) {
      console.error('⚠️ Error saving update:', err);
      alert('Something went wrong while saving. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fare update?')) {
      await deleteDoc(doc(db, 'fares', id));
      fetchUpdates();
    }
  };

  const filteredUpdates = updates.filter(update =>
    update.route?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search your posts by route..."
        className="w-full p-2 border mb-4"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
        }}
      >
        {filteredUpdates.map((update) => (
          <div key={update.id} className="min-w-[350px] border p-4 rounded bg-white shadow">
            {editingId === update.id ? (
              <form
                className="flex flex-col gap-2"
                onSubmit={e => {
                  e.preventDefault();
                  handleSave(update.id);
                }}
              >
                <input
                  name="route"
                  value={editedData.route}
                  onChange={handleChange}
                  placeholder="Route"
                  className="border p-2 rounded"
                />
                <input
                  name="fare"
                  value={editedData.fare}
                  onChange={handleChange}
                  placeholder="Fare"
                  className="border p-2 rounded"
                />
                <input
                  name="notes"
                  value={editedData.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                  className="border p-2 rounded"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-1 rounded w-full"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-3 py-1 rounded w-full"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p><strong>Route:</strong> {update.route}</p>
                <p><strong>Fare:</strong> {update.fare}</p>
                <p><strong>Notes:</strong> {update.notes}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(update)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(update.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ControllerUpdates;