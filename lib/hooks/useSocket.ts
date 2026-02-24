import { useEffect } from "react";
import { useSocketContext } from "@/lib/socket/SocketProvider";
import type {
  NotificationEvent,
  SuccessfulPaymentEvent,
  FailedPaymentEvent,
} from "@/lib/socket/socketEvents";

/**
 * Generic hook to listen to socket events
 * Automatically cleans up listener on unmount
 */
export const useSocketEvent = <T = unknown>(
  eventName: string,
  callback: (data: T) => void
) => {
  const socket = useSocketContext();

  useEffect(() => {
    if (!socket) {
      throw new Error("useSocketEvent must be used within a SocketContext");
    }

    socket.on(eventName, callback);

    // Cleanup listener on unmount
    return () => {
      socket.off(eventName, callback);
    };
  }, [socket, eventName, callback]);
};

/**
 * Convenience hooks for specific events
 */
export const useNotificationEvent = (
  callback: (data: NotificationEvent) => void
) => useSocketEvent<NotificationEvent>("notification", callback);

export const useSuccessfulPaymentEvent = (
  callback: (data: SuccessfulPaymentEvent) => void
) => useSocketEvent<SuccessfulPaymentEvent>("successful-payment", callback);

export const useFailedPaymentEvent = (
  callback: (data: FailedPaymentEvent) => void
) => useSocketEvent<FailedPaymentEvent>("failed-payment", callback);
