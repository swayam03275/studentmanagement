import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // On mount: validate token by fetching profile
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/profile');
        if (response.data.success) {
          setAdmin(response.data.data);
          setToken(storedToken);
        } else {
          throw new Error('Invalid token');
        }
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      const { token: newToken, admin: adminData } = response.data.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setAdmin(adminData);
      navigate('/', { replace: true });
      return response.data;
    }
    throw new Error(response.data.message || 'Login failed');
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setAdmin(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  const isAuthenticated = useMemo(() => !!token && !!admin, [token, admin]);

  const value = useMemo(
    () => ({ admin, token, loading, login, logout, isAuthenticated }),
    [admin, token, loading, login, logout, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
