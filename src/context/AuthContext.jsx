import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser, isAuthenticated, getStoredUser, logout as apiLogout } from '@/api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (isAuthenticated()) {
        try {
          // Try to get fresh user data
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch {
          // If token is invalid, use stored user or clear auth
          const storedUser = getStoredUser();
          if (storedUser) {
            setUser(storedUser);
          } else {
            apiLogout();
          }
        }
      } else {
        // Check for stored user (for page refresh)
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, isAuthenticated: isAuthenticated() }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

