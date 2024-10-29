"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  name: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface JwtPayload {
  exp?: number;
  userId?: string;
  email?: string;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  token: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const validateToken = (token: string): boolean => {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      return !!(
        decodedToken &&
        decodedToken.exp &&
        decodedToken.exp > currentTime
      );
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          router.push("/login");
          return;
        }

        if (!validateToken(token)) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          router.push("/login");
          return;
        }

        const decodedToken = jwtDecode<JwtPayload>(token);

        if (decodedToken.userId && decodedToken.email) {
          setUser({
            id: decodedToken.userId,
            email: decodedToken.email,
            name: "",
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [mounted, router]);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: "/login",
            httpMethod: "POST",
            body: JSON.stringify({ email, password }),
          }),
        }
      );

      const apiResponse = await response.json();

      if (!response.ok) {
        throw new Error(apiResponse.message || "Login failed");
      }

      const { token, user: userData } = JSON.parse(apiResponse.body);

      if (!userData || !userData.id || !userData.email || !userData.name) {
        throw new Error("The email address or password is incorrect");
      }

      const cleanedUser: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        lastLogin: new Date().toISOString(),
      };

      localStorage.setItem("token", token);
      setUser(cleanedUser);
      setIsAuthenticated(true);
      setToken(token);
      router.push("/dashboard/weather");
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Login failed");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: "/register",
            httpMethod: "POST",
            body: JSON.stringify({ name, email, password }),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      const parsedData = JSON.parse(data.body);
      const { token, user: userData } = parsedData;

      if (!token || !validateToken(token)) {
        throw new Error("Invalid registration response");
      }

      localStorage.setItem("token", token);
      setUser(userData);
      setIsAuthenticated(true);
      setToken(token);
      router.push("/dashboard/weather");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error instanceof Error ? error.message : "Signup failed");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        token,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
