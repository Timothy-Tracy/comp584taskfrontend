"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the user type
type User = {
  id: number;
  username: string;
} | null;

// Define the context value type
interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  getStatus: () => void;
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
  const [status, setStatus] = useState<boolean>(false);
  
  const login = (username: string) => {
    const mockUser: User = { id: 1, username };
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('token')
    getStatus()
  };

  const getStatus = () => {
    if (localStorage.getItem('token') == null){
      setStatus(false)
    } else {
      setStatus(true)
    }
  };

  useEffect(()=> {
    getStatus()
  }, [])
 

  const value: AuthContextType = {
    user,
    isAuthenticated: !!status,
    getStatus,
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
