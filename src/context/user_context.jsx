import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
} from "../services/user_service";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      const user = getCurrentUser();
      setCurrentUser(user);
      setLoading(false);
    };

    initializeUser();
  }, []);

  const login = async (email, password) => {
    const result = loginUser(email, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const register = async (userData) => {
    const result = registerUser(userData);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    return { success: true };
  };

  const value = {
    currentUser,
    isLoggedIn: !!currentUser,
    login,
    register,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
