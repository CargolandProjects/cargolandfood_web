"use client";

import { useSession } from "./useSession";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Hook to protect routes from unauthenticated access
 * @param redirectTo - Where to redirect unauthenticated users (default: "/")
 * @returns isChecking - Whether the auth check is still in progress
 */
export function useProtectedRoute(redirectTo: string = "/") {
  const { isAuthenticated, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Instant check on mount (before first render)
  useEffect(() => {
    const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_ACCESS_KEY}`);

    if (!token) {
      router.replace(redirectTo);
      // Keep isChecking=true to block render
    } else {
      const setCheck = () => setIsChecking(false);
      setCheck();
    }
  }, [router, redirectTo]);

  // Continuous check during session (handles logout during active session)
  useEffect(() => {
    if (status !== "loading" && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, status, router, redirectTo]);

  return { isChecking, isAuthenticated, status };
}
