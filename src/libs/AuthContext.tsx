"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "./supabaseClient";

// ユーザー型の定義
type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && session.user.id && session.user.email) {
          setUser({ id: session.user.id ?? "", email: session.user.email ?? "" });
        } else {
          setUser(null);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("セッション確認エラー:", err.message);
        } else {
          console.error("セッション確認中に不明なエラーが発生しました");
        }
      } finally {
        setLoading(false);
      }
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser({ id: session.user.id ?? "", email: session.user.email ?? "" });
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      console.log("ログアウトしました");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("ログアウトエラー:", err.message);
      } else {
        console.error("ログアウト中に不明なエラーが発生しました");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
