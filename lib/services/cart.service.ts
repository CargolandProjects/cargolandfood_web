import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import type { 
  AddToCartPayload, 
  CartItem, 
  CheckoutPreview, 
  ApiResponse 
} from "@/lib/types/cart.types";

export const cartService = {
  /**
   * Add item to cart or update existing item
   * POST /orders/cart-item/{vendorId}
   * 
   * @param vendorId - The vendor ID from URL params
   * @param payload - Cart item data with optional addons
   * @returns API response with cart items array
   */
  async addOrUpdateItem(vendorId: string, payload: AddToCartPayload) {
    const response = await apiClient.post<ApiResponse<CartItem[]>>(
      API_ROUTES.cart.addOrUpdateItem(vendorId),
      payload
    );
    return response.data;
  },

  /**
   * Clear entire cart for a vendor
   * DELETE /orders/clear-cart/{cartId}
   * 
   * @param cartId - The cart ID to clear
   * @returns API response
   */
  async clearCart(cartId: string) {
    const response = await apiClient.delete(
      API_ROUTES.cart.clearCart(cartId)
    );
    return response.data;
  },

  /**
   * Get checkout preview with calculated totals
   * POST /orders/checkout-preview/{vendorId}
   * 
   * @param vendorId - The vendor ID
   * @param deliveryType - DELIVERY or PICKUP (defaults to DELIVERY)
   * @returns Checkout preview with items and pricing
   */
  async getCheckoutPreview(
    vendorId: string, 
    deliveryType: "DELIVERY" | "PICKUP" = "DELIVERY"
  ) {
    const response = await apiClient.post<CheckoutPreview>(
      API_ROUTES.order.checkoutPreview(vendorId),
      { deliveryType }
    );
    return response.data;
  },
  
  // Keep old methods for backward compatibility during transition
  async useCart(vendorId: string, payload?: any) {
    const res = await apiClient.post(
      payload
    );
    return res.data;
  },

  async checkoutPreview(vendorId: string) {
    const res = await apiClient.post(API_ROUTES.cart.checkoutPreview(vendorId));
    return res.data
  },
};

// Export as both cart and cartService
export const cart = cartService;
