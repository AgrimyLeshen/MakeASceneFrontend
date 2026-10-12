"use client";

import {createContext,useContext,useEffect,useState,ReactNode,} from "react";
import { apiFetch } from "@/lib/api-client";
import { getToken } from "./api";

export type User = {
  user_id: number;
  username: string;
  profile_picture: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    if (!getToken()) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await apiFetch("/api/user/me");
      setUser(data);
    } catch {
      setUser(null);
    }

    setLoading(false);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth muss innerhalb eines AuthProviders verwendet werden.");
  }

  return context;
}