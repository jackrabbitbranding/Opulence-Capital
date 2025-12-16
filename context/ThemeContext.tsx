import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tenant } from '../types';
import { MOCK_TENANTS } from '../services/mockData';

interface ThemeContextType {
  currentTenant: Tenant;
  setTenantId: (id: string) => void;
  updateTenant: (updates: Partial<Tenant>) => void;
}

const defaultTenant = MOCK_TENANTS[0];

const ThemeContext = createContext<ThemeContextType>({
  currentTenant: defaultTenant,
  setTenantId: () => {},
  updateTenant: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant>(defaultTenant);

  const setTenantId = (id: string) => {
    const tenant = MOCK_TENANTS.find(t => t.id === id) || defaultTenant;
    setCurrentTenant(tenant);
  };

  const updateTenant = (updates: Partial<Tenant>) => {
    setCurrentTenant(prev => ({
      ...prev,
      ...updates
    }));
  };

  useEffect(() => {
    // Dynamically update CSS variables for the theme
    const root = document.documentElement;
    root.style.setProperty('--color-primary', currentTenant.primaryColor);
    root.style.setProperty('--color-secondary', currentTenant.secondaryColor);
  }, [currentTenant]);

  return (
    <ThemeContext.Provider value={{ currentTenant, setTenantId, updateTenant }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
