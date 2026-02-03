import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import type {
  AddToCartPayload,
  CartItem,
  CheckoutPreview,
  ApiResponse,
} from "@/lib/types/cart.types";

interface RemoveItemParams {
  cartId: string;
  cartItemId: string;
}

export const cart = {
  async getCart() {
    const res = await apiClient.get(API_ROUTES.cart.getCart);
    return res.data;
  },

  async addOrUpdateItem(vendorId: string, payload: AddToCartPayload) {
    const response = await apiClient.post<ApiResponse<CartItem[]>>(
      API_ROUTES.cart.addOrUpdateItem(vendorId),
      payload
    );
    return response.data;
  },

  async clearCart(cartId: string) {
    const response = await apiClient.delete(API_ROUTES.cart.clearCart(cartId));
    return response.data;
  },

  async removeCartItem({ cartId, cartItemId }: RemoveItemParams) {
    const res = await apiClient.delete(
      API_ROUTES.cart.removeCartItem(cartId, cartItemId)
    );
    return res.data;
  },

  async checkoutPreview(
    vendorId: string,
    deliveryType: "DELIVERY" | "PICKUP" = "DELIVERY"
  ) {
    const response = await apiClient.post<CheckoutPreview>(
      API_ROUTES.order.checkoutPreview(vendorId),
      { deliveryType }
    );
    return response.data;
  },

  // // Keep old methods for backward compatibility during transition
  // async useCart(vendorId: string, payload?: any) {
  //   const res = await apiClient.post(
  //     API_ROUTES.cart.useCart(vendorId),
  //     payload
  //   );
  //   return res.data;
  // },
};
