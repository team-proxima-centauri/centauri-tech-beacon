import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  intercomHash: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [intercomHash, setIntercomHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await fetch(`${API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setIntercomHash(data.intercomHash);
            setToken(storedToken);
          } else {
            // Token is invalid
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Update Intercom when user changes
  useEffect(() => {
    if (user && intercomHash && window.Intercom) {
      window.Intercom('boot', {
        app_id: 'qxn1suzz',
        user_id: user.id,
        email: user.email,
        name: user.name || undefined,
        created_at: Math.floor(new Date(user.createdAt).getTime() / 1000),
        user_hash: intercomHash,
      });
    } else if (!user && window.Intercom) {
      window.Intercom('shutdown');
      window.Intercom('boot', {
        app_id: 'qxn1suzz',
      });
    }
  }, [user, intercomHash]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      setIntercomHash(data.intercomHash);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      setIntercomHash(data.intercomHash);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIntercomHash(null);
    localStorage.removeItem('token');

    // Shutdown Intercom for logged-in user
    if (window.Intercom) {
      window.Intercom('shutdown');
      // Restart as visitor
      window.Intercom('boot', {
        app_id: 'qxn1suzz',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, intercomHash, loading, login, register, logout }}>
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

// Type declaration for Intercom
declare global {
  interface Window {
    Intercom: any;
    intercomSettings: any;
  }
}
