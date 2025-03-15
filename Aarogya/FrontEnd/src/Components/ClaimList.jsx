import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClaimList = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Your Claims</h2>

        {claims.length === 0 ? (
          <p className="text-gray-500 text-center">No claims submitted yet.</p>
        ) : (
          <div className="space-y-6">
            {claims.map((claim) => (
              <div key={claim._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">{claim.name}</h3>
                <p className="text-gray-600"><strong>Claim Amount:</strong> ${claim.claimAmount}</p>
                
                <p className={`font-semibold mt-2 ${claim.status === 'Approved' ? 'text-green-600' : claim.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                  <strong>Status:</strong> {claim.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimList;
