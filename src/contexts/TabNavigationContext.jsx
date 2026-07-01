import React, { createContext, useContext, useState, useCallback } from 'react';

const TabNavigationContext = createContext(null);

export function TabNavigationProvider({ children }) {
  const [activeTab, setActiveTab] = useState('/');

  const switchTab = useCallback((tabPath) => {
    setActiveTab(tabPath);
  }, []);

  const resetTab = useCallback((tabPath) => {
    setActiveTab(tabPath);
  }, []);

  return (
    <TabNavigationContext.Provider value={{ activeTab, switchTab, resetTab }}>
      {children}
    </TabNavigationContext.Provider>
  );
}

export const useTabNavigation = () => {
  const ctx = useContext(TabNavigationContext);
  if (!ctx) throw new Error('useTabNavigation must be used within TabNavigationProvider');
  return ctx;
};