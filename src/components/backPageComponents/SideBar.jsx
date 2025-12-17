"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FiHome, FiUsers, FiSettings, FiPieChart, FiFileText, FiCalendar, FiMail, FiLogOut } from 'react-icons/fi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { logout } from '@/lib/clientAuth';

const SideBar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        document.body.classList.remove('sidebar-collapsed');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { 
      name: 'Tableau de bord', 
      icon: <FiHome className="text-xl" />, 
      path: '/admin/Dashbord',
      isActive: pathname === '/admin/Dashbord'
    },
    { 
      name: 'Utilisateurs', 
      icon: <FiUsers className="text-xl" />, 
      path: '/admin/Utilisateurs',
      isActive: pathname === '/admin/Utilisateurs'
    },
    { 
      name: 'Rapports', 
      icon: <FiPieChart className="text-xl" />, 
      path: '/admin/Rapports',
      isActive: pathname === '/admin/Rapports'
    },
    { 
      name: 'Documents', 
      icon: <FiFileText className="text-xl" />, 
      path: '/admin/Documents',
      isActive: pathname === '/admin/Documents'
    },
    { 
      name: 'Calendrier', 
      icon: <FiCalendar className="text-xl" />, 
      path: '/admin/Calendrier',
      isActive: pathname === '/admin/Calendrier'
    },
    { 
      name: 'Messages', 
      icon: <FiMail className="text-xl" />, 
      path: '/admin/Messages',
      isActive: pathname === '/admin/Messages'
    },
    { 
      name: 'Paramètres', 
      icon: <FiSettings className="text-xl" />, 
      path: '/admin/Parametres',
      isActive: pathname === '/admin/Parametres'
    },
  ];

  const toggleBodyClass = (isCollapsed) => {
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  };

  useEffect(() => {
    toggleBodyClass(!isOpen);
  }, [isOpen]);

  return (
    <div className={`fixed top-0 left-0 h-full bg-white shadow-lg z-30 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        {isOpen ? (
          <div className="flex items-center px-4 w-full">
            <div className="w-8 h-8 rounded-md mr-2">
                <img src="\assets\img\kksmartcomfavicon\favicon.svg" alt="kksmartcomlogo" />
            </div>
            <span className="text-lg font-semibold text-gray-800">KK SMART COM</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-md">
                <img src="\assets\img\kksmartcomfavicon\favicon.svg" alt="kksmartcomlogo" />
          </div>
        )}
      </div>
      
      <div className="h-[calc(100%-4rem)] flex flex-col justify-between">
        <nav className="mt-6">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-1">
                <Link 
                  href={item.path}
                  className={`flex items-center ${isOpen ? 'px-4' : 'justify-center px-0'} py-3 text-sm font-medium transition-colors duration-200 ${
                    item.isActive 
                      ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <span className={isOpen ? '' : 'mx-auto'}>{item.icon}</span>
                  {isOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button className={`w-full flex items-center ${isOpen ? 'justify-start' : 'justify-center'} text-gray-600 hover:text-red-600 transition-colors duration-200`}
                  onClick={() => logout(router)}>
            <FiLogOut className="text-xl" />
            {isOpen && <span className="ml-3">Déconnexion</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;