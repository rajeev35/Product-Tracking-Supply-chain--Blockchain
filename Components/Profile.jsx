import React, { useState, useEffect } from "react";
import Image from "next/image";
import images from "../Images";

export default function Profile({
  openProfile,
  setOpenProfile,
  currentUser,
  getShipmentCount,
}) {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch shipment count when modal opens
  useEffect(() => {
    if (!openProfile) return;
    let isMounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getShipmentCount(currentUser);
        if (isMounted) setCount(result.toString());
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Failed to fetch count");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [openProfile, currentUser, getShipmentCount]);

  if (!openProfile) return null;

  const shortAddr = currentUser
    ? `${currentUser.slice(0, 6)}...${currentUser.slice(-4)}`
    : "Not connected";

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={() => setOpenProfile(false)}
      />

      {/* card container */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={() => setOpenProfile(false)}
          >
            ✕
          </button>

          {/* profile content */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500">
              <Image
                src={images.avatar}
                alt="Profile Avatar"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {shortAddr}
            </h3>
            <p className="text-sm text-gray-500 break-all text-center">
              {currentUser}
            </p>
            {loading ? (
              <p className="text-gray-600">Loading shipments...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-gray-700">
                <span className="font-medium">Total Shipments:</span> {count}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
