import React, { useState } from 'react';
import { ethers } from 'ethers';

export default function ERC20Generator() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerate = async () => {
    if (!window.ethereum) return alert('Install MetaMask');
    if (!name || !symbol) return alert('Enter both name and symbol');
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      // Placeholder logic for ERC20 deployment
      setMessage(`✅ Mock token generated: ${name} (${symbol})`);
    } catch (err) {
      console.error(err);
      setMessage('❌ Error generating token');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          ERC20 Token Generator
        </h1>
        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Token Name</label>
            <input
              type="text"
              placeholder="MyToken"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Token Symbol</label>
            <input
              type="text"
              placeholder="MTK"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition"
          >
            Generate Token
          </button>

          {message && (
            <p className="mt-4 text-center text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
