"use client";

import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "@/lib/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (apiClient.isAuthenticated()) {
          const response = await apiClient.getCurrentUser();
          if (response.success) {
            setUser(response.data.user);
          } else {
            // Token is invalid, remove it
            apiClient.removeToken();
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        apiClient.removeToken();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = async (userData) => {
    try {
      console.log("AuthContext signup called with:", userData);
      setError(null);
      setLoading(true);
      const response = await apiClient.signup(userData);
      console.log("AuthContext signup response:", response);

      if (response.success) {
        setUser(response.data.user);
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error("AuthContext signup error:", error);
      const errorMessage = error.message || "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await apiClient.login(credentials);

      if (response.success) {
        setUser(response.data.user);
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await apiClient.updateProfile(profileData);

      if (response.success) {
        setUser(response.data.user);
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Profile update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      setError(null);
      const response = await apiClient.changePassword(passwordData);

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || "Password change failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    updateProfile,
    changePassword,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
