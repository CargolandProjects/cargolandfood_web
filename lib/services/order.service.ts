import apiClient from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import type {
  AddressSnapshot,
  APIResponse,
  MakePaymentResponse,
  PaymentResponse,
} from "@/lib/types/cart.types";
import { VerificationCode } from "../socket/socketEvents";

interface AddonItem {
  id: string;
  orderItemId: string;
  menuAddonId: string;
  addonImg: string;
  name: string;
  price: string;
  quantity: number;
  createdAt: string;
}

interface Items {
  id: string;
  orderId: string;
  menuId: string;
  menuImg: string;
  menuName: string;
  unitPrice: string;
  quantity: number;
  discountApplied: string;
  totalPrice: string;
  createdAt: string;
  addonItem: AddonItem[];
}

interface GetOrdersResponse {
  id: string;
  orderNumber: string;
  userId: string;
  vendorId: string;
  cartId: string;
  deliveryType: string;
  addressSnapshot: AddressSnapshot | null;
  couponCode: string | null;
  isCoupon: boolean;
  status: string;
  paymentStatus: string;
  checkoutSessionId: string;
  subtotal: string;
  discountTotal: string;
  deliveryFee: string;
  serviceFee: string;
  total: string;
  appliedDiscounts: string | null;
  acceptedAt: string | null;
  preparedAt: string | null;
  readyAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  items: Items[];
  VerificationCode: VerificationCode;
}

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

  async getOrders() {
    const res = await apiClient.get<APIResponse<GetOrdersResponse[]>>(
      API_ROUTES.order.getOrders
    );
    return res.data;
  },

  async orderDetails(orderId: string) {
    const res = await apiClient.get<APIResponse<GetOrdersResponse>>(
      API_ROUTES.order.orderDetails(orderId)
    );
    return res.data;
  },
  async getOrderByReference(reference: string) {
    const res = await apiClient.get<APIResponse<GetOrdersResponse>>(
      API_ROUTES.order.getOrderByReference(reference)
    );
    return res.data;
  },
};
