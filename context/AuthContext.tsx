import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../services/mockData';
import { useTheme } from './ThemeContext';

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { setTenantId } = useTheme();

  const login = (email: string) => {
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      // Simulate switching to the user's tenant theme
      if (foundUser.tenantId !== 'global') {
        setTenantId(foundUser.tenantId);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTenantId('tenant-1'); // Reset to default
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
