import apiClient from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import type {
  AddressSnapshot,
  APIResponse,
  MakePaymentResponse,
  OrderStatus,
} from "@/lib/types/cart.types";
import { VerificationCode } from "../socket/socketEvents";
import { GetAddress } from "./address.service";

interface AddonItem {
  id: string;
  orderItemId: string;
  menuAddonId: string;
  addonImg: string;
  description: string | null;
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
  description: string;
  unitPrice: string;
  quantity: number;
  discountApplied: string;
  totalPrice: string;
  createdAt: string;
  addonItem: AddonItem[];
}

export interface GetOrdersResponse {
  id: string;
  orderNumber: string;
  userId: string;
  vendorId: string;
  riderId: string | null;
  cartId: string | null;
  deliveryType: string;
  addressSnapshot: AddressSnapshot | null;
  paymentReference: string | null;
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
  VerificationCode: VerificationCode | null;
}

type VendorAddress = GetAddress & { vendorId: string };

export interface TrackOrder {
  fullName: string | null;
  phoneNumber: string | null;
  profileImg: string | null;
  addressSnapshot: GetAddress;
  items: Items[];
  subtotal: string | null;
  discountTotal: string | null;
  deliveryFee: string | null;
  total: string | null;
  orderStatus: OrderStatus;
  VerificationCode: VerificationCode | null;
  vendorAddress: VendorAddress;
  acceptedAt: string | null;
  preparedAt: string | null;
  readyAt: string | null;
  assignedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
}

export type TrackOrderResponse = APIResponse<TrackOrder>;

export const orderService = {
  async makePayment(cartId: string) {
    const response = await apiClient.post<MakePaymentResponse>(
      API_ROUTES.order.makePayment(cartId)
    );
    return response.data;
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

  async trackOrder(orderId: string) {
    const res = await apiClient.post<TrackOrderResponse>(
      API_ROUTES.order.trackOrder(orderId)
    );
    return res.data;
  },
};
