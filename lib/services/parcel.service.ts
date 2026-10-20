import { ParcelDetailsData } from "@/components/parcel/ParcelDetails";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "../types/cart.types";

export interface ParcelDlFeesData {
  pickUpAddrLat: string;
  pickUpAddrLng: string;
  dropOffAddrLat: string;
  dropOffAddrLng: string;
  packageIsurance: boolean;
  packageWorth: string;
}

export interface ActiveParcel {
  id: string;
  parcelOrderId: string;
  userId: string;
  riderId: string | null;
  pickUpAddrName: string;
  pickUpAddrLat: string;
  pickUpaddrLng: string;
  dropOffAddrName: string;
  dropOffAddrLat: string;
  dropOffAddrLng: string;
  parcelImageUrl: string | null;
  senderName: string;
  senderNumber: string;
  receiverName: string;
  receiverNumber: string;
  packageIsurance: boolean;
  status: string;
  paymentStatus: string;
  packageWorth: string;
  packageWorthInsurance: string;
  amount: string;
  isActive: boolean;
  reference: string | null;
  acceptedAt: string | null;
  pickedupAt: string | null;
  riderOutsideAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
}

type ActiveParcelRes = APIResponse<ActiveParcel>;

export const parcel = {
  async createParcel(data: ParcelDetailsData) {
    const res = await apiClient.post(API_ROUTES.parcel.createParcel, data);
    return res.data;
  },

  async getDeliveryFees(data: ParcelDlFeesData) {
    const res = await apiClient.post(API_ROUTES.parcel.getDeliveryFees, data);
    return res.data;
  },
  async getActiveParcel() {
    const res = await apiClient.get<ActiveParcelRes>(
      API_ROUTES.parcel.getActiveParcel,
    );
    return res.data;
  },
  async deleteParcel(parcelId: string) {
    const res = await apiClient.delete(
      API_ROUTES.parcel.deleteParcel(parcelId),
    );
    return res.data;
  },
};
