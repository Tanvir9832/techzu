import React, { createContext, useContext, useState } from "react";
import api, { setAccessToken } from "../auth/auth";

interface AuthContextType {
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const token = res.data.accessToken;
    setToken(token);
    setAccessToken(token); // update axios instance
  };

  const logout = () => {
    setToken(null);
    setAccessToken(""); // clear axios token
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
