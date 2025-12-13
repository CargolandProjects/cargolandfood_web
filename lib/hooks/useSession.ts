"use client";
import { useEffect, useMemo } from "react";
import { useAuthSessionStore } from "@/lib/stores/authSessionStore";

export function useSession() {
  const user = useAuthSessionStore((s) => s.user);
  const status = useAuthSessionStore((s) => s.status);
  const setPendingUser = useAuthSessionStore((s) => s.setPendingUser);
  const completeOtp = useAuthSessionStore((s) => s.completeOtp);
  const setUser = useAuthSessionStore((s) => s.setUser);
  const updateUser = useAuthSessionStore((s) => s.updateUser);
  const signOut = useAuthSessionStore((s) => s.signOut);
  const hydrate = useAuthSessionStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    // hydrate once on mount
    hydrate();
    // cross-tab sync via storage events
    const onStorage = (e: StorageEvent) => {
      if (!e.key) return;
      if (
        e.key === "auth_token" ||
        e.key === "refresh_token" ||
        e.key === "user" ||
        e.key === "user_pending"
      ) {
        hydrate();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [hydrate]);

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  return {
    user,
    status,
    isAuthenticated,
    // actions
    setPendingUser,
    completeOtp,
    setUser,
    updateUser,
    signOut,
  } as const;
}
