import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InsurerDashboard = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getClaims')
      .then((response) => {
        setClaims(response.data);
      })
      .catch((error) => {
        console.error('Error fetching claims', error);
      });
  }, []);

  const updateClaim = async (id, status) => {
    const updatedClaim = { status };
    await axios.put(`http://localhost:5000/api/updateClaim/${id}`, updatedClaim);
    setClaims(claims.map((claim) => (claim._id === id ? { ...claim, status } : claim)));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Insurer Dashboard</h2>

        {claims.length === 0 ? (
          <p className="text-gray-500 text-center">No claims available.</p>
        ) : (
          <div className="space-y-6">
            {claims.map((claim) => (
              <div key={claim._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">{claim.name}</h3>
                <p className="text-gray-600"><strong>Status:</strong> {claim.status}</p>
                
                <div className="flex gap-4 mt-3">
                  <button 
                    onClick={() => updateClaim(claim._id, 'Approved')} 
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
                  >
                    Approve
                  </button>
                  
                  <button 
                    onClick={() => updateClaim(claim._id, 'Rejected')} 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InsurerDashboard;
