import apiClient from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import type {
  MakePaymentResponse,
  PaymentResponse,
  PlaceOrderResponse,
} from "@/lib/types/cart.types";

export const orderService = {
  async makePayment(cartId: string) {
    const response = await apiClient.post<MakePaymentResponse>(
      API_ROUTES.order.makePayment(cartId)
    );
    return response.data;
  },

  async simulatePayment(checkoutSessionId: string) {
    const res = await apiClient.post<PaymentResponse>(
      API_ROUTES.order.simulatePayment(checkoutSessionId)
    );
    return res.data;
  },
};
