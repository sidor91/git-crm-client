import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/api/ApiService";

interface Payload {
  email: string;
  password: string;
  action: "login" | "register";
}

interface AuthContextType {
  isAuthenticated: boolean;
  authorize: (payload: Payload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("access_token")
  );

  const authorize = async (payload: Payload) => {
    const { email, password, action } = payload;
    try {
      await ApiService[action]({ email, password });
      setIsAuthenticated(true);
      navigate("/");
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await ApiService.logout();
      setIsAuthenticated(false);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authorize, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
