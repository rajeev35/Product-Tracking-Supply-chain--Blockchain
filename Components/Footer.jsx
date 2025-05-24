import React from 'react';
import Link from 'next/link';
import { Fot1, Fot2 } from '../Components';

export default function Footer() {
  const footerNavs = [
    { href: '#', name: 'Terms' },
    { href: '#', name: 'License' },
    { href: '#', name: 'Privacy' },
    { href: '#', name: 'About Us' },
  ];

  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand + Links */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="inline-block text-2xl font-bold text-indigo-600">
              MyDapp
            </Link>
            <p className="text-gray-600 max-w-md">
              Transparent, blockchain-based shipment tracking you can trust. Secure, end-to-end visibility for every step of your supply chain.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {footerNavs.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* App Download */}
          <div className="flex flex-col space-y-4">
            <p className="text-gray-700 font-semibold text-center">Get the app</p>
            <div className="flex space-x-4">
              <Link href="#" className="block w-32 h-auto">
                <Fot1 className="w-full h-full" />
              </Link>
              <Link href="#" className="block w-32 h-auto">
                <Fot2 className="w-full h-full" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rajeev Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
