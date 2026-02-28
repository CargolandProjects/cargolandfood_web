/**
 * Socket.IO event types
 * These match the events emitted by the backend
 */

import { APIResponse, Order } from "../types/cart.types";

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

export interface VerificationCode {
  id: string;
  orderId: string;
  code: string;
  userId: string;
  riderId: string | null;
  isUsed: boolean;
  usedAt: string | null; // ISO date string or null
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

type SuccessPaymentResponse = Order & {
  VerificationCode: VerificationCode;
  checkoutSessionId: string;
};

export type SuccessfulPaymentEvent = {
  payload: APIResponse<SuccessPaymentResponse>;
};

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
