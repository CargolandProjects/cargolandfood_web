import { ParcelDetailsData } from "@/components/parcel/ParcelDetails";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export const parcel = {
  async createParcel(data: ParcelDetailsData) {
    const res = await apiClient.post(API_ROUTES.parcel.createParcel, data);
    return res.data;
  },
};
