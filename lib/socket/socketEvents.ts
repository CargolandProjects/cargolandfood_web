/**
 * Socket.IO event types
 * These match the events emitted by the backend
 */

export const SOCKET_EVENTS = {
  NOTIFICATION: "notification",
  SUCCESSFUL_PAYMENT: "successful-payment",
  FAILED_PAYMENT: "failed-payment",
} as const;

/**
 * Event payload types
 */

export interface NotificationEvent {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  // Add other fields based on your backend response
}

export interface SuccessfulPaymentEvent {
  reference: string;
  orderId: string;
  amount: string;
  status: "success";
  message: string;
  // Add other fields based on your backend response
}

export interface FailedPaymentEvent {
  reference: string;
  orderId?: string;
  status: "failed";
  message: string;
  reason?: string;
  // Add other fields based on your backend response
}

/**
 * Union type of all possible events
 */
export type SocketEvent =
  | { event: "notification"; data: NotificationEvent }
  | { event: "successful-payment"; data: SuccessfulPaymentEvent }
  | { event: "failed-payment"; data: FailedPaymentEvent };
