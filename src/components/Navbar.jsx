import React from 'react';
import { FaAngleDown, FaBell } from 'react-icons/fa'; // Assuming you're using react-icons

function Navbar() {
  return (
    <nav className="bg-white border border-gray-300 text-black py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <span className="font-bold text-xl"># Roster Grid</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center border border-gray-200 p-3 bg-gray-200 rounded-4xl my-2 ">
          <a href="/" className="hover:text-gray-500 flex items-center">
            DashBoard
            <FaAngleDown className="ml-2" />
          </a>
          <a href="/roster" className="hover:text-gray-500 flex items-center">
            Roster
            <FaAngleDown className="ml-2" />
          </a>
          {/* Communications Label */}
          <div className="flex items-center">
            <label htmlFor="range" className="mr-2">Communications</label>
          </div>
         <div className="flex items-center rounded-2xl p-2 text-white bg-blue-500">
    <label htmlFor="range" className="mr-2">CRM</label>
    <FaAngleDown className="ml-2" />
          </div> 
          <a href="/contracts" className="hover:text-gray-500 flex items-center">
            Contracts
            <FaAngleDown className="ml-2" />
          </a>
          <a href="/settings" className="hover:text-gray-500 flex items-center">
            Settings
            <FaAngleDown className="ml-2" />
          </a>
          <a href="/more" className="hover:text-gray-500 flex items-center">
            More
            <FaAngleDown className="ml-2" />
          </a>
        </div>

        {/* Right End Section */}
        <div className="hidden md:flex items-center space-x-4">
          <FaBell className="text-xl cursor-pointer" />
          <span>Michael</span>
          <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            M
          </div>
        </div>

        {/* Mobile Menu Button (Hidden on larger screens) */}
        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg className="w-6 h-6 fill-current text-black" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;