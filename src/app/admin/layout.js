"use client";

import { useState, useEffect } from 'react';
import SideBar from '@/components/backPageComponents/SideBar';
import Header from '@/components/backPageComponents/Header';
import "./back.css";

export default function BackLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Cette fonction s'exécute uniquement côté client
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    // Définit l'état initial
    handleResize();
    
    // Ajoute l'écouteur d'événement
    window.addEventListener('resize', handleResize);
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}