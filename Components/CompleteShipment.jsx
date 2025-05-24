// Components/CompleteShipment.jsx
import React, { useState } from "react";

export default function CompleteShipment({
  completeModal,
  setCompleteModal,
  completeShipment,
}) {
  const [form, setForm] = useState({ receiver: "", index: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleComplete = async () => {
    if (!form.receiver || form.index === "") {
      return alert("Please fill both Receiver address and Index");
    }
    setLoading(true);
    setError("");
    try {
      await completeShipment({
        receiver: form.receiver,
        index: parseInt(form.index, 10),
      });
      alert("✅ Shipment marked as DELIVERED!");
      setCompleteModal(false);
      setForm({ receiver: "", index: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to complete shipment");
    } finally {
      setLoading(false);
    }
  };

  if (!completeModal) return null;
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={() => setCompleteModal(false)}
      />
      {/* modal */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative w-full max-w-md p-6 bg-white rounded shadow-lg">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setCompleteModal(false)}
          >
            ✕
          </button>
          <h3 className="text-xl font-semibold mb-4">Complete Shipment</h3>

          <div className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="Receiver Address"
              value={form.receiver}
              onChange={handleChange("receiver")}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="number"
              min="0"
              placeholder="Shipment Index"
              value={form.index}
              onChange={handleChange("index")}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

          <button
            onClick={handleComplete}
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-500"
            }`}
          >
            {loading ? "Processing…" : "Mark Delivered"}
          </button>
        </div>
      </div>
    </div>
  );
}
