"use client";
import { useCallback, useEffect, useMemo } from "react";
import { useAuthSessionStore } from "@/lib/stores/authSessionStore";
import { auth } from "@/lib/services/auth.service";

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

  const refreshSession = useCallback(async () => {
    const userId = user?.id || localStorage.getItem("user_id");
    if (!userId) return;

    try {
      const response = await auth.getUserById(userId);
      if (response?.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
    }
  }, [user?.id, setUser]);

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
    refreshSession,
  } as const;
}
