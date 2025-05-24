// Components/StartShipment.jsx
import React, { useState, useContext } from "react";
import { TrackingContext } from "../Conetxt/Tracking";

export default function StartShipmentModal({ startModel, setStartModel }) {
  const { startShipment, currentUser } = useContext(TrackingContext);

  const [form, setForm] = useState({ receiver: "", index: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleStart = async () => {
    if (!currentUser) {
      alert("Please connect your wallet first");
      return;
    }
    if (!form.receiver || form.index === "") {
      alert("Fill both Receiver and Index");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await startShipment({
        receiver: form.receiver,
        index: parseInt(form.index, 10),
      });
      alert("✅ Shipment started!");
      setStartModel(false);
      setForm({ receiver: "", index: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to start shipment");
    } finally {
      setLoading(false);
    }
  };

  if (!startModel) return null;
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={() => setStartModel(false)}
      />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative w-full max-w-md p-6 bg-white rounded shadow-lg">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setStartModel(false)}
          >
            ✕
          </button>
          <h3 className="text-xl font-semibold mb-4">Start Shipment</h3>

          <div className="space-y-3 mb-4">
            <input
              type="text"
              value={form.receiver}
              onChange={handleChange("receiver")}
              placeholder="Receiver Address"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="number"
              min="0"
              value={form.index}
              onChange={handleChange("index")}
              placeholder="Shipment Index"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

          <button
            onClick={handleStart}
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "Starting…" : "Start Shipment"}
          </button>
        </div>
      </div>
    </div>
  );
}
