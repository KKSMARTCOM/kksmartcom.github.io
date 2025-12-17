"use client";

import { FiChevronLeft, FiChevronRight, FiMenu, FiBell, FiSearch, FiUser } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 right-0 left-0 z-20 bg-white transition-all duration-300 ${
        isSidebarOpen ? 'lg:left-64' : 'lg:left-16'
      } ${isScrolled ? 'shadow-sm' : ''}`}
    >
      <div className="flex items-center justify-between h-16 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex items-center">
          <button 
          onClick={toggleSidebar}
          className=" ml-2 p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </button>
          
          <div className="relative ml-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border border-transparent rounded-md focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Rechercher..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            aria-label="Notifications"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="User menu"
            >
              <div className="w-8 h-8 overflow-hidden bg-blue-100 rounded-full">
                <FiUser className="w-full h-full p-1.5 text-blue-600" />
              </div>
              <span className="hidden text-sm font-medium text-gray-700 md:inline">
                Admin
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
