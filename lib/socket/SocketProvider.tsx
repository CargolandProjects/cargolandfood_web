"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "@/lib/hooks/useSession";

const SOCKET_URL = "http://dev.cargolandfood.com:4002/notifications/users";

// Create context
const SocketContext = createContext<Socket | null>(null);

// Hook to use socket in components
export const useSocketContext = () => useContext(SocketContext);

// Provider component
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { isAuthenticated, user } = useSession();

  useEffect(() => {
    // Only connect if user is authenticated
    if (!isAuthenticated || !user) {
      // Disconnect if user logs out
      if (socket) {
        console.log("❌ Socket disconnected");
        // socket.disconnect();

        // Wrap setState in callback to avoid cascading renders warning
        const clearSocket = () => setSocket(null);
        clearSocket();
      }
      return;
    }

    // Get auth token from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

    if (!token) {
      console.warn("⚠️ No auth token found, skipping socket connection");
      return;
    }

    // console.log("🔑 Connecting with token:", token?.substring(0, 20) + "..."); // Show first 20 chars
    // console.log("🔑 Token length:", token?.length);
    // console.log("🌐 Socket URL:", SOCKET_URL);
    // console.log("🔑 Query params:", { token });
    // console.log("🔑 Headers:", { token: token });

    // Create socket connection with token in header (as backend requires)
    const newSocket = io(SOCKET_URL, {
      auth: {
        token: token,
      },
      // transports: ["websocket", "polling"], // Try WebSocket first, fallback to polling
    });

    // Connection event handlers
    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    newSocket.on("connect_error", (error) => {
      console.error("🔴 Socket connection error:", error.message);
      console.error("🔴 Error details:", error);
    });

    newSocket.on("error", (error) => {
      console.error("🔴 Socket error:", error);
    });

    // Wrap setState in callback to avoid cascading renders warning
    const updateSocket = () => setSocket(newSocket);
    updateSocket();

    // Cleanup on unmount or auth change
    return () => {
      // newSocket.disconnect();
    };
  }, [isAuthenticated, user?.id]); // Reconnect if user changes

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
