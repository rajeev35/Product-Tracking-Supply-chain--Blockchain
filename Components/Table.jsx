import React from 'react';

export default function Table({ setCreateShipmentModel, allShipmentsdata }) {
  const formatDateTime = (ms) => {
    const dt = new Date(ms);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dt);
  };

  const statusBadge = (status) => {
    const map = {
      0: { text: 'Pending',    bg: 'bg-yellow-100', textColor: 'text-yellow-800' },
      1: { text: 'In Transit', bg: 'bg-blue-100',   textColor: 'text-blue-800'   },
      2: { text: 'Delivered',  bg: 'bg-green-100',  textColor: 'text-green-800'  },
    };
    const { text, bg, textColor } = map[status] || {};
    return (
      <span className={`${bg} ${textColor} px-2 py-1 rounded-full text-xs font-medium`}>
        {text}
      </span>
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Shipments</h2>
        <button
          onClick={() => setCreateShipmentModel(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition"
        >
          Add Tracking
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sender
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receiver
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Time
              </th>
              <th className="sticky top-0 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance (km)
              </th>
              <th className="sticky top-0 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price (ETH)
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Time
              </th>
              <th className="sticky top-0 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid
              </th>
              <th className="sticky top-0 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allShipmentsdata?.map((shipment, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {shipment.sender.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {shipment.receiver.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDateTime(shipment.pickupTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                  {shipment.distance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                  {parseFloat(shipment.price).toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {shipment.deliveryTime > 0
                    ? formatDateTime(shipment.deliveryTime)
                    : '–'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {shipment.isPaid ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {statusBadge(shipment.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
