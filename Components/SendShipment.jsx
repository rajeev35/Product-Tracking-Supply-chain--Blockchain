import React, { useState, useContext } from "react";
import { TrackingContext } from "../Conetxt/Tracking";
import { ethers } from "ethers";

export default function SendShipment({
  sendModel,
  setSendModel,
}) {
  const { createShipment, currentUser } = useContext(TrackingContext);
  const [form, setForm] = useState({ receiver: "", pickupTime: "", distance: "", price: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSend = async () => {
    if (!currentUser) {
      return alert("Please connect your wallet first");
    }
    const { receiver, pickupTime, distance, price } = form;
    if (!receiver || !pickupTime || !distance || !price) {
      return alert("Fill all fields");
    }
    setLoading(true);
    try {
      // createShipment expects: { receiver, pickupTime: ISO string, distance: int, price: string }
      await createShipment({
        receiver,
        pickupTime,
        distance: parseInt(distance, 10),
        price,
      });
      alert("✅ Shipment sent!");
      setSendModel(false);
      setForm({ receiver: "", pickupTime: "", distance: "", price: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send shipment");
    } finally {
      setLoading(false);
    }
  };

  if (!sendModel) return null;
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={() => setSendModel(false)}
      />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setSendModel(false)}
          >
            ✕
          </button>
          <h3 className="text-xl font-semibold mb-4">Send Shipment</h3>

          <div className="space-y-4">
            <input
              type="text"
              value={form.receiver}
              onChange={handleChange("receiver")}
              placeholder="Receiver Address"
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="datetime-local"
              value={form.pickupTime}
              onChange={handleChange("pickupTime")}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="number"
              min="0"
              value={form.distance}
              onChange={handleChange("distance")}
              placeholder="Distance (m)"
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="text"
              value={form.price}
              onChange={handleChange("price")}
              placeholder="Price (ETH)"
              className="w-full border px-3 py-2 rounded"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={loading}
              className={`w-full py-2 rounded text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {loading ? "Sending…" : "Send Shipment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
