"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/hooks/useSession";
import { socketManager } from "@/lib/socket/socketManager";

/**
 * Socket Provider - Manages Socket.IO connection lifecycle
 * 
 * Connects when user is authenticated
 * Disconnects when user logs out
 */
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useSession();

  useEffect(() => {
    // Only connect if user is authenticated and we have user data
    if (isAuthenticated && user) {
      // Get token from localStorage (same as used in apiClient)
      const token = typeof window !== "undefined" 
        ? localStorage.getItem("auth_token") 
        : null;

      if (token) {
        console.log("🔌 Connecting socket for authenticated user...");
        socketManager.connect(token);
      }
    } else {
      // Disconnect if user logs out
      if (socketManager.isConnected()) {
        console.log("🔌 Disconnecting socket (user logged out)...");
        socketManager.disconnect();
      }
    }

    // Cleanup on unmount
    return () => {
      // Don't disconnect on component unmount, only when user actually logs out
      // The socket should persist across page navigation
    };
  }, [isAuthenticated, user]);

  return <>{children}</>;
}
