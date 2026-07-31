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
      className={`admin-header fixed top-0 right-0 left-0 z-20 transition-all duration-300 ${
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
