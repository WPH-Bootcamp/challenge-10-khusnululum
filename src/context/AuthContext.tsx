"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "@/lib/api";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  headline?: string;
  posts: {
    data: [
      {
        id: number;
        title: string;
        content: string;
        tags: string[];
        imageUrl: string;
        author: {
          id: number;
          name: string;
          username: string;
          email: string;
        };
        createdAt: string;
        likes: number;
        comments: number;
      },
    ];
  };
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading?: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getMe(token)
        .then(setUser)
        .catch(() => logout());
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);

    const me = await getMe(token);
    setUser(me);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const me = await getMe(token);
      setUser(me);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        refreshUser, // ✅ SEKARANG SUDAH DIKIRIM
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
