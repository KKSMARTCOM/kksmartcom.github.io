"use client";

import { createContext, useState, useEffect, useContext } from 'react';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  // Récupérer la langue depuis localStorage ou utiliser 'fr' par défaut
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferredLang');
      return savedLang || 'fr';
    }
    return 'fr';
  });


  const handleLangChange = (newLang) => {
    setLang(newLang);
    // Sauvegarder la préférence dans le localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLang', newLang);
    }
  };

  return (
    <LangContext.Provider value={{ lang, handleLangChange }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};
