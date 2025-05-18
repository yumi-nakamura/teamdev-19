"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "./supabaseClient";

type AuthContextType = {
user: any;
loading: boolean;
setUser: React.Dispatch<React.SetStateAction<any>>;
logout: () => Promise<void>; // ← ログアウト関数を型に追加 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
const [user, setUser] = useState<any>(null);
const [loading, setLoading] = useState(true);

// ログアウト関数を定義
const logout = async () => {
try {
await supabase.auth.signOut();
setUser(null);
console.log("ログアウトしました");
} catch (error) {
console.error("ログアウトエラー:", error);
}
};

useEffect(() => {
const checkSession = async () => {
try {
const { data: { session }, error } = await supabase.auth.getSession();
if (error) throw error;
setUser(session?.user || null);
} catch (error) {
console.error("セッション取得エラー:", error);
} finally {
setLoading(false);
}
};
checkSession();

const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
if (event === "SIGNED_IN") {
setUser(session?.user || null);
console.log("ログインしました:", session?.user);
} else if (event === "SIGNED_OUT") {
setUser(null);
console.log("ログアウトしました");
}
});

return () => {
listener.subscription.unsubscribe();
};
}, []);

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
