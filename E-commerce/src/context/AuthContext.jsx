
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('swiftshop_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('swiftshop_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('swiftshop_user');
    }
  }, [user]);

  const login = (name, role) => {
    const newUser = {
      id: crypto.randomUUID(),
      name,
      role,
      email: `${name.toLowerCase()}@example.com`
    };
    setUser(newUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
