"use client";

import { createContext, useState, useContext } from 'react';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('fr');

  const handleLangChange = (newLang) => {
    setLang(newLang);
  };

  return (
    <LangContext.Provider value={{ lang, handleLangChange }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
