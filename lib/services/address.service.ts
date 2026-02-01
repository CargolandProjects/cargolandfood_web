import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: string;
  longitude: string;
  placeId: string;
  provider: string;
  instructions: string;
}

type Addresses = Address & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

interface GetAdresses {
  status: string;
  message: string;
  data: Addresses[];
}

export const address = {
  async getAddresses() {
    const res = await apiClient.get<GetAdresses>(
      API_ROUTES.address.getAddresses
    );
    return res.data;
  },

  async createAddress(payload: Address) {
    const res = await apiClient.post(API_ROUTES.address.createAddress, payload);
    return res.data;
  },

  async deleteAddress(addressId: string) {
    const res = await apiClient.delete(
      API_ROUTES.address.deleteAddress(addressId)
    );
    return res.data;
  },
};
