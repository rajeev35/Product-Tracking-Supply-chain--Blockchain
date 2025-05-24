import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { TrackingContext } from '../Conetxt/Tracking';
import { Nav1, Nav2, Nav3 } from '../Components';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, connectWallet } = useContext(TrackingContext);

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'ERC20 Generator', path: '/erc20' },
  ];

  useEffect(() => {
    function handleOutsideClick(e) {
      if (!e.target.closest('.menu-btn') && !e.target.closest('.mobile-menu')) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const shortAddr = currentUser
    ? `${currentUser.slice(0, 6)}...${currentUser.slice(-4)}`
    : null;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            MyDapp
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Desktop Connect */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <span className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">
                {shortAddr}
              </span>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-500 transition"
              >
                Connect Wallet <Nav3 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Connect & Menu */}
          <div className="md:hidden flex items-center space-x-3">
            {currentUser ? (
              <span className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                {shortAddr}
              </span>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-500 transition"
              >
                Connect Wallet <Nav3 className="w-4 h-4" />
              </button>
            )}
            <button
              className="menu-btn p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <Nav1 className="w-6 h-6" /> : <Nav2 className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu md:hidden mt-2 space-y-2 pb-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                {item.title}
              </Link>
            ))}
            <div className="px-4">
              {currentUser ? (
                <span className="block px-4 py-2 bg-indigo-600 text-white rounded-full text-center text-sm">
                  {shortAddr}
                </span>
              ) : (
                <button
                  onClick={connectWallet}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-500 transition"
                >
                  Connect Wallet <Nav3 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
