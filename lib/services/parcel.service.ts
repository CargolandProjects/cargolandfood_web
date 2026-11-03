import { ParcelDetailsData } from "@/components/parcel/ParcelDetails";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse, MakePaymentResponse } from "../types/cart.types";

export type ParcelStatus =
  | "NEW"
  | "RIDER_ACCEPTED"
  | "PICKUP_ORDER"
  | "RIDER_OUTSIDE"
  | "DELIVERED";

export interface ParcelDlFeesData {
  pickUpAddrLat: string;
  pickUpAddrLng: string;
  dropOffAddrLat: string;
  dropOffAddrLng: string;
  packageIsurance: boolean;
  packageWorth: string;
}

interface DeliveryFees {
  insuranceFee: number;
  deliveryFee: number;
  total: number;
}

export interface Parcel {
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
  zoneId: string;
  parcelImageUrl: string[];
  senderName: string;
  senderNumber: string;
  receiverName: string;
  receiverNumber: string;
  packageIsurance: boolean;
  status: ParcelStatus;
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

type ActiveParcelRes = APIResponse<Parcel>;
export type GetAllParcelsRes = APIResponse<Parcel[]>;
type GetParcelByIdRes = APIResponse<
  Parcel & {
    VerificationCode: {
      code: string;
    };
  }
>;

export const parcel = {
  async createParcel(data: ParcelDetailsData) {
    const res = await apiClient.post<ActiveParcelRes>(
      API_ROUTES.parcel.createParcel,
      data,
    );
    return res.data;
  },

  async getDeliveryFees(data: ParcelDlFeesData) {
    const res = await apiClient.post<APIResponse<DeliveryFees>>(
      API_ROUTES.parcel.getDeliveryFees,
      data,
    );
    return res.data;
  },

  async getActiveParcel() {
    const res = await apiClient.get<ActiveParcelRes>(
      API_ROUTES.parcel.getActiveParcel,
    );
    return res.data;
  },

  async getAllParcels() {
    const res = await apiClient.get<GetAllParcelsRes>(
      API_ROUTES.parcel.getAllParcels,
    );
    return res.data;
  },
  async getParcelById(parcelId: string) {
    const res = await apiClient.get<GetParcelByIdRes>(
      API_ROUTES.parcel.getParcelById(parcelId),
    );
    return res.data;
  },

  async deleteParcel(parcelId: string) {
    const res = await apiClient.delete(
      API_ROUTES.parcel.deleteParcel(parcelId),
    );
    return res.data;
  },

  async makeParcelPayment(parcelId: string) {
    const res = await apiClient.post<MakePaymentResponse>(
      API_ROUTES.parcel.makeParcelPayment(parcelId),
    );
    return res.data;
  },
};
