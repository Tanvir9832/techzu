import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAccessToken, getAccessToken, clearAccessToken } from "../auth/auth";

interface User {
  _id: string;
  email: string;
}

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const USER_KEY = "techzu_user";

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if there's a stored token on app load
        const token = getAccessToken();
        const savedUser = localStorage.getItem(USER_KEY);
        console.log(savedUser)
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            localStorage.removeItem(USER_KEY);
          }
        }
        if (token) {
          try {
            setAccessToken(token);
            setToken(token);
            
          } catch (validationError) {
            console.error("Token validation failed:", validationError);
            clearAccessToken();
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear any invalid tokens
        clearAccessToken();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.accessToken;
      setToken(token);
      setAccessToken(token);
      
      // Store user info if available
      if (res.data.user) {
        setUser(res.data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      await api.post("/auth/register", { email, password });
      // After registration, automatically log in
      await login(email, password);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearAccessToken();
    localStorage.removeItem(USER_KEY);
  };

  const value: AuthContextType = {
    accessToken,
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
