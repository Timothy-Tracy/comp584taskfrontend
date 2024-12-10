"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the user type
type User = {
  id: number;
  username: string;
} | null;

// Define the context value type
interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider's props
interface AuthProviderProps {
  children: ReactNode; // ReactNode allows for nested components
}

// Create the provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const login = (username: string) => {
    const mockUser: User = { id: 1, username };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

 

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for accessing AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
