import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000/api";
const TOKEN_KEY = "cc_access_token";
const USER_KEY = "cc_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  // Save token and user to localStorage and state
  const persistAuth = (token, userData) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    if (userData) {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(USER_KEY);
    }
    setUser(userData);
  };

  // Login with username + password
  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      // data should have { access, refresh, user }
      persistAuth(data.access, data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Register a new user
  const register = async ({ username, email, password, role = "trainee" }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      // On register, we can optionally log the user in automatically
      // The register endpoint can also return tokens, or we can call login.
      // For simplicity, we'll return success and let the user navigate to login.
      // Or you can auto-login: persistAuth(data.access, data.user)
      // We'll do auto-login if the backend returns tokens.
      if (data.access) {
        persistAuth(data.access, data.user);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Social login (placeholder – implement with OAuth later)
  const socialLogin = async (provider) => {
    // For now, redirect to backend OAuth endpoint or mock
    return { success: false, error: "Social login not configured yet" };
  };

  const logout = () => {
    persistAuth(null, null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    socialLogin,
    logout,
    // helper to get token for API calls
    token: localStorage.getItem(TOKEN_KEY),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
