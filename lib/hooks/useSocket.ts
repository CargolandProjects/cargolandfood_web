import { useEffect } from "react";
import { socketManager } from "@/lib/socket/socketManager";
import {
  SOCKET_EVENTS,
  NotificationEvent,
  SuccessfulPaymentEvent,
  FailedPaymentEvent,
} from "@/lib/socket/socketEvents";

/**
 * Type-safe event listeners
 */
type SocketEventName = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];

type EventCallback<T> = (data: T) => void;

/**
 * Hook to listen to a specific Socket.IO event
 * Automatically handles cleanup on component unmount
 * 
 * @example
 * useSocketEvent("notification", (data) => {
 *   toast.info(data.message);
 * });
 */
export function useSocketEvent<T = unknown>(
  eventName: SocketEventName,
  callback: EventCallback<T>
) {
  useEffect(() => {
    const socket = socketManager.getSocket();

    if (!socket) {
      console.warn(`Socket not connected. Cannot listen to "${eventName}" event.`);
      return;
    }

    // Type-safe event listener
    const handler = (data: T) => {
      callback(data);
    };

    socket.on(eventName, handler);

    // Cleanup: Remove listener on unmount
    return () => {
      socket.off(eventName, handler);
    };
  }, [eventName, callback]);
}

/**
 * Convenience hooks for specific events (optional, for better DX)
 */

export function useNotificationEvent(callback: EventCallback<NotificationEvent>) {
  useSocketEvent(SOCKET_EVENTS.NOTIFICATION, callback);
}

export function useSuccessfulPaymentEvent(callback: EventCallback<SuccessfulPaymentEvent>) {
  useSocketEvent(SOCKET_EVENTS.SUCCESSFUL_PAYMENT, callback);
}

export function useFailedPaymentEvent(callback: EventCallback<FailedPaymentEvent>) {
  useSocketEvent(SOCKET_EVENTS.FAILED_PAYMENT, callback);
}
