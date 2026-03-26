import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import type {
  AddToCart,
  Cart,
  CartItem,
  CheckoutPreview,
  APIResponse,
  AddressSnapshot,
} from "@/lib/types/cart.types";
import { GetAddress } from "./address.service";

export type DeliveryType = "DELIVERY" | "PICKUP";

interface RemoveItemParams {
  cartId: string;
  cartItemId: string;
}

type CartItems = Cart & { addressSnapshot: GetAddress };

interface CartResponse {
  status: string;
  message: string;
  data: {
    vendor: {
      vendorId: string;
      businessName: string;
      profileImg: string;
    };
    carts: CartItems[];
  }[];
}

interface AddToCartPayload {
  item: AddToCart;
  vendorId: string;
}

interface checkoutPreview {
  deliveryType: "DELIVERY" | "PICKUP";
  addressSnapShot?: Omit<AddressSnapshot, "setAddressDefault">;
  noteToRider?: string;
  noteToRestaurant?: string;
}

interface CheckoutPreviewPayload {
  vendorId: string;
  payload: checkoutPreview;
}

export const cart = {
  async getCart() {
    const res = await apiClient.get<CartResponse>(API_ROUTES.cart.getCart);
    return res.data;
  },

  async addOrUpdateItem(payload: AddToCartPayload) {
    const response = await apiClient.post<APIResponse<CartItem[]>>(
      API_ROUTES.cart.addOrUpdateItem(payload.vendorId),
      payload.item
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

  async checkoutPreview(vendorId: string, deliveryType: DeliveryType = "DELIVERY") {
    const response = await apiClient.post<CheckoutPreview>(
      API_ROUTES.order.checkoutPreview(vendorId),
      { deliveryType }
    );
    return response.data;
  },

  async updateCheckoutPreview(payload: CheckoutPreviewPayload) {
    const res = await apiClient.post<CheckoutPreview>(
      API_ROUTES.order.checkoutPreview(payload.vendorId),
      payload.payload
    );
    return res.data;
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
