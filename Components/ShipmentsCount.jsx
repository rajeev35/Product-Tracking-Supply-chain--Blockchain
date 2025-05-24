import React, { useState, useEffect, useContext } from 'react';
import { TrackingContext } from '../Conetxt/Tracking';

export default function ShipCount({ countModel, setCountModel }) {
  const { currentUser, getShipmentsCount } = useContext(TrackingContext);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!countModel) return;
    let isMounted = true;
    setLoading(true);
    setError('');
    getShipmentsCount(currentUser)
      .then((res) => {
        if (isMounted) setCount(res.toString());
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setError('Failed to fetch shipment count');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [countModel, currentUser, getShipmentsCount]);

  if (!countModel) return null;
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={() => setCountModel(false)}
      />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setCountModel(false)}
          >
            ✕
          </button>
          <h3 className="text-xl font-semibold mb-4">Total Shipments</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-4xl font-bold">{count}</p>
          )}
        </div>
      </div>
    </div>
  );
}
