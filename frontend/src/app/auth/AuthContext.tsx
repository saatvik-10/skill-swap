'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import type { User } from '@/validators/user.validator';

interface AuthContextType {
  authenticated: boolean;
  checkAuth: () => Promise<void>;
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  loading: true,
  user: null,
  checkAuth: async () => {},
});

export const useAuth = (): AuthContextType => useContext(AuthContext)!;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async (): Promise<void> => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        const { data } = await axios.get('/auth/me');
        setUser(data as User);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Authentication check failed', error);
      Cookies.remove('token');
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, checkAuth, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
