import apiClient from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import type { PlaceOrderResponse } from "@/lib/types/cart.types";

export const orderService = {
  /**
   * Place order for a vendor's cart
   * POST /orders/placeOrder/{vendorId}
   * 
   * @param vendorId - The vendor ID
   * @returns Order response with order details
   */
  async placeOrder(vendorId: string) {
    const response = await apiClient.post<PlaceOrderResponse>(
      API_ROUTES.order.placeOrder(vendorId)
    );
    return response.data;
  },
};
