import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-100 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:flex lg:items-center lg:justify-between">
        {/* Left Side - Text Content */}
        <div className="mb-8 lg:mb-0 lg:w-1/2">
          <p className="text-gray-600 text-sm md:text-base font-medium mb-2">Welcome!</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">Manage your Deals</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            Get Started
          </button>
        </div>

        {/* Right Side - Illustration */}
        <div className="lg:w-1/2">
          <img
            src="/src/assets/client-cover.png" // Replace with the actual path to your image
            alt="Office Illustration"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;