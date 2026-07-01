import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const TabNavigationContext = createContext(null);

const TAB_ROOTS = ['/', '/scan', '/routine', '/glossary'];

export function TabNavigationProvider({ children }) {
  const [activeTab, setActiveTab] = useState('/');
  // Map of tabPath -> last saved path (restored when switching back)
  const tabHistoryRef = useRef({
    '/': '/',
    '/scan': '/scan',
    '/routine': '/routine',
    '/glossary': '/glossary',
  });

  const getLastPathForTab = useCallback((tabPath) => {
    return tabHistoryRef.current[tabPath] || tabPath;
  }, []);

  const saveCurrentPathForTab = useCallback((tabPath, path) => {
    tabHistoryRef.current[tabPath] = path;
  }, []);

  const switchTab = useCallback((newTabPath) => {
    // Save current location to current tab before switching
    const currentPath = window.location.pathname;
    // Find which tab is currently active by matching root paths
    const currentTabRoot = TAB_ROOTS.find(r => r !== '/' && currentPath.startsWith(r)) || '/';
    tabHistoryRef.current[currentTabRoot] = currentPath;
    setActiveTab(newTabPath);
  }, []);

  const resetTab = useCallback((tabPath) => {
    tabHistoryRef.current[tabPath] = tabPath;
    setActiveTab(tabPath);
  }, []);

  return (
    <TabNavigationContext.Provider value={{ activeTab, switchTab, resetTab, getLastPathForTab, saveCurrentPathForTab }}>
      {children}
    </TabNavigationContext.Provider>
  );
}

export const useTabNavigation = () => {
  const ctx = useContext(TabNavigationContext);
  if (!ctx) throw new Error('useTabNavigation must be used within TabNavigationProvider');
  return ctx;
};