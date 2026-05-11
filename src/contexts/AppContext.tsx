import React, { createContext, useContext } from 'react';
import { type UseAppStateReturn, useAppState } from '../hooks/useAppState';

const AppContext = createContext<UseAppStateReturn | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const value = useAppState();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): UseAppStateReturn {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
