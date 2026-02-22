import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://dev.cargolandfood.com:4002/notifications/users";

class SocketManager {
  private socket: Socket | null = null;
  private isConnecting = false;

  /**
   * Connect to Socket.IO server with authentication token
   */
  connect(token: string) {
    // Prevent multiple simultaneous connections
    if (this.socket?.connected || this.isConnecting) {
      console.log("Socket already connected or connecting");
      return;
    }

    this.isConnecting = true;

    try {
      this.socket = io(SOCKET_URL, {
        query: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
      });

      // Connection event handlers
      this.socket.on("connect", () => {
        console.log("✅ Socket connected:", this.socket?.id);
        this.isConnecting = false;
      });

      this.socket.on("disconnect", (reason) => {
        console.log("❌ Socket disconnected:", reason);
        this.isConnecting = false;
      });

      this.socket.on("connect_error", (error) => {
        console.error("🔴 Socket connection error:", error.message);
        this.isConnecting = false;
      });

      this.socket.on("reconnect", (attemptNumber) => {
        console.log(`🔄 Socket reconnected after ${attemptNumber} attempts`);
      });

      this.socket.on("reconnect_attempt", (attemptNumber) => {
        console.log(`🔄 Reconnection attempt ${attemptNumber}...`);
      });

      this.socket.on("reconnect_failed", () => {
        console.error("🔴 Socket reconnection failed");
        this.isConnecting = false;
      });
    } catch (error) {
      console.error("🔴 Failed to create socket connection:", error);
      this.isConnecting = false;
    }
  }

  /**
   * Disconnect from Socket.IO server
   */
  disconnect() {
    if (this.socket) {
      console.log("Disconnecting socket...");
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.isConnecting = false;
    }
  }

  /**
   * Get the socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Check if socket is connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

// Export singleton instance
export const socketManager = new SocketManager();
