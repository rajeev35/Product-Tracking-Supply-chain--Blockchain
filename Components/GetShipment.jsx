// Components/GetShipment.jsx
import React, { useState, useContext } from "react";
import { TrackingContext } from "../Conetxt/Tracking";

const STATUS_MAP = {
  0: "PENDING",
  1: "IN_TRANSIT",
  2: "DELIVERED",
};

export default function GetShipmentModal({ getModel, setGetModel }) {
  const { getShipment, currentUser } = useContext(TrackingContext);

  const [index, setIndex] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGet = async () => {
    if (!currentUser) return alert("Please connect your wallet first");
    if (index === "") return alert("Enter an index");

    setLoading(true);
    setError("");
    try {
      const data = await getShipment(parseInt(index, 10));
      setShipment(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch shipment");
    } finally {
      setLoading(false);
    }
  };

  const fmtDate = (ms) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ms));

  if (!getModel) return null;
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={() => setGetModel(false)}
      />

      {/* modal */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative w-full max-w-md p-6 bg-white rounded shadow-lg">
          {/* close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setGetModel(false)}
          >
            ✕
          </button>

          <h3 className="text-xl font-semibold mb-4">Get Shipment</h3>

          {/* input + button */}
          <div className="flex space-x-2 mb-4">
            <input
              type="number"
              min="0"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              placeholder="Index"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              onClick={handleGet}
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {loading ? "Loading…" : "Fetch"}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

          {/* results */}
          {shipment && (
            <div className="space-y-2 text-gray-800">
              <p>
                <strong>Sender:</strong> {shipment.sender}
              </p>
              <p>
                <strong>Receiver:</strong> {shipment.receiver}
              </p>
              <p>
                <strong>Pickup:</strong> {fmtDate(shipment.pickupTime)}
              </p>
              <p>
                <strong>Delivery:</strong>{" "}
                {shipment.deliveryTime > 0
                  ? fmtDate(shipment.deliveryTime)
                  : "—"}
              </p>
              <p>
                <strong>Distance:</strong> {shipment.distance} m
              </p>
              <p>
                <strong>Price:</strong> {shipment.price} ETH
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {STATUS_MAP[shipment.status] ?? shipment.status}
              </p>
              <p>
                <strong>Paid:</strong>{" "}
                {shipment.isPaid ? "✅ Yes" : "❌ No"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
