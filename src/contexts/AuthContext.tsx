
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'contractor' | 'client';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'contractor' | 'client') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: 'contractor' | 'client'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // More flexible authentication - accept any email/password for demo
    if (role === 'contractor') {
      setUser({
        id: '1',
        name: 'Lwenzo M.',
        email: email,
        role: 'contractor'
      });
      setIsLoading(false);
      return true;
    } else if (role === 'client') {
      setUser({
        id: '2',
        name: 'Sindi Mani',
        email: email,
        role: 'client'
      });
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
