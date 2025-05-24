// Components/Form.jsx
import React, { useState, useContext } from "react";
import { TrackingContext } from "../Conetxt/Tracking";

export default function CreateShipmentModal({
  createShipmentModel,    // boolean: show/hide modal
  setCreateShipmentModel, // fn: to close modal
}) {
  const { createShipment, currentUser } = useContext(TrackingContext);
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",   // will be ISO string from <input type="datetime-local">
    distance: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setShipment((s) => ({ ...s, [field]: e.target.value }));

  const handleCreate = async () => {
    if (!currentUser) {
      return alert("Please connect your wallet first");
    }
    setLoading(true);
    try {
      await createShipment({
        receiver: shipment.receiver,
        pickupTime: shipment.pickupTime,      // your context code does new Date().getTime()
        distance: parseInt(shipment.distance, 10),
        price: shipment.price,                // your context does parseUnits inside
      });
      alert("✅ Shipment created!");
      setCreateShipmentModel(false);
      setShipment({ receiver: "", pickupTime: "", distance: "", price: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create shipment");
    } finally {
      setLoading(false);
    }
  };

  if (!createShipmentModel) return null;
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateShipmentModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
          <button
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setCreateShipmentModel(false)}
          >
            ✕
          </button>
          <h4 className="text-xl font-semibold mb-4">Create Shipment</h4>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Receiver Address"
              className="w-full border px-3 py-2 rounded"
              value={shipment.receiver}
              onChange={handleChange("receiver")}
              required
            />

            <input
              type="datetime-local"
              className="w-full border px-3 py-2 rounded"
              value={shipment.pickupTime}
              onChange={handleChange("pickupTime")}
              required
            />

            <input
              type="number"
              placeholder="Distance (meters)"
              className="w-full border px-3 py-2 rounded"
              value={shipment.distance}
              onChange={handleChange("distance")}
              required
            />

            <input
              type="text"
              placeholder="Price (ETH)"
              className="w-full border px-3 py-2 rounded"
              value={shipment.price}
              onChange={handleChange("price")}
              required
            />

            <button
              type="button"
              onClick={handleCreate}
              disabled={loading}
              className={`w-full py-2 rounded text-white ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {loading ? "Creating…" : "Create Shipment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
