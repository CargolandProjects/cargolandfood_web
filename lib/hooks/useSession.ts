"use client";
import { useCallback, useEffect, useMemo } from "react";
import { useAuthSessionStore } from "@/lib/stores/authSessionStore";
import { auth } from "@/lib/services/auth.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSession() {
  const queryClient = useQueryClient();
  const user = useAuthSessionStore((s) => s.user);
  const status = useAuthSessionStore((s) => s.status);
  const setPendingUser = useAuthSessionStore((s) => s.setPendingUser);
  const completeOtp = useAuthSessionStore((s) => s.completeOtp);
  const setUser = useAuthSessionStore((s) => s.setUser);
  const updateUser = useAuthSessionStore((s) => s.updateUser);
  const storeSignOut = useAuthSessionStore((s) => s.signOut);
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
    const userId =
      user?.id ||
      localStorage.getItem(`${process.env.NEXT_PUBLIC_USER_ID_KEY}`);
    if (!userId) return { success: false, error: "No user ID found" };

    try {
      const response = await auth.getUserById(userId);
      if (response?.data) {
        setUser(response.data);
        return { success: true, data: response.data };
      }
      return { success: false, error: "No data returned from server" };
    } catch (error) {
      console.error("Failed to refresh session:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to refresh session";
      return { success: false, error: errorMessage };
    }
  }, [user?.id, setUser]);

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  const signOut = useCallback(() => {
    storeSignOut(queryClient);
  }, [storeSignOut, queryClient]);

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
