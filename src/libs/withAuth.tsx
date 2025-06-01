"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithAuth(props: P) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push("/login");
        }
      };
      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}

export function withGuestOnly<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithGuestOnly(props: P) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          router.push("/");
        }
      };
      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
