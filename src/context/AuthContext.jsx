import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiClient } from '../services/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);

  // Initialize and verify user on mount or token change
  useEffect(() => {
    let mounted = true;
    async function loadUser() {
      const storedToken = localStorage.getItem('access_token');
      if (!storedToken) {
        if (mounted) {
          setUser(null);
          setToken(null);
          setLoading(false);
        }
        return;
      }

      try {
        const me = await apiClient.getMe();
        if (mounted) {
          setUser(me);
          setToken(storedToken);
        }
      } catch (err) {
        // If token is invalid or expired, clear it
        if (mounted) {
          apiClient.logout();
          setUser(null);
          setToken(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await apiClient.login(email, password);
    const accessToken = result?.tokens?.accessToken || localStorage.getItem('access_token');
    setToken(accessToken);
    setUser(result?.user || null);
    return result;
  }, []);

  const register = useCallback(async (data) => {
    const result = await apiClient.register(data);
    const accessToken = result?.tokens?.accessToken || localStorage.getItem('access_token');
    setToken(accessToken);
    setUser(result?.user || null);
    return result;
  }, []);

  const logout = useCallback(() => {
    apiClient.logout();
    setUser(null);
    setToken(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const me = await apiClient.getMe();
      setUser(me);
      return me;
    } catch {
      return null;
    }
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    isAdmin: user?.role === 'ADMIN',
    isCustomer: user?.role === 'CUSTOMER',
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
