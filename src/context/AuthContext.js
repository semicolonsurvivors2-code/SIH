import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "cc_auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {
      // ignore corrupt storage
    } finally {
      setLoading(false);
    }
  }, []);

  const persist = (userObj) => {
    setUser(userObj);
    if (userObj) localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
    else localStorage.removeItem(STORAGE_KEY);
  };

  // NOTE: this is a client-only mock. Replace the body of these
  // functions with real calls to your backend / auth provider.
  const login = async (email, password, role = "trainee") => {
    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }
    const userObj = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role,
      provider: "password",
      enrolledCourses: [],
      completedCourses: [],
      progress: 0,
    };
    persist(userObj);
    return { success: true, user: userObj };
  };

  const register = async ({ name, email, password, role }) => {
    if (!name || !email || !password) {
      return { success: false, error: "All fields are required" };
    }
    const userObj = {
      id: crypto.randomUUID(),
      name,
      email,
      role: role || "trainee",
      provider: "password",
      enrolledCourses: [],
      completedCourses: [],
      progress: 0,
    };
    persist(userObj);
    return { success: true, user: userObj };
  };

  // Used by both Login and Register social buttons.
  // In production, swap this out for the real OAuth flow (see notes below).
  const socialLogin = async (provider, email, name, role = "trainee") => {
    const userObj = {
      id: crypto.randomUUID(),
      name: name || provider,
      email: email || `${provider}-user@example.com`,
      role,
      provider,
      enrolledCourses: [],
      completedCourses: [],
      progress: 0,
    };
    persist(userObj);
    return { success: true, user: userObj };
  };

  const logout = () => {
    persist(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, socialLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
