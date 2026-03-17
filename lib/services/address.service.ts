import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "../types/cart.types";

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
  zoneId?: string;
  provider: string;
  instructions: string;
  setAddressDefault?: boolean;
}

export type GetAddress = Address & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

interface GuestAddressPayload {
  latitude: string;
  longitude: string;
}

type Addresses = APIResponse<GetAddress[]>;

type SelectAddressResponse = APIResponse<GetAddress>;

export const address = {
  async getAddresses() {
    const res = await apiClient.get<Addresses>(API_ROUTES.address.getAddresses);
    return res.data;
  },

  async createAddress(payload: Address) {
    const res = await apiClient.post(API_ROUTES.address.createAddress, payload);
    return res.data;
  },

  async setGuestAddress(payload: GuestAddressPayload) {
    const res = await apiClient.post(
      API_ROUTES.address.setGuestAddress,
      payload
    );
    return res.data;
  },

  async selectAddress(addressId: string) {
    const res = await apiClient.post<SelectAddressResponse>(
      API_ROUTES.address.selectAddress(addressId),
      { isSelected: true }
    );
    return res.data;
  },

  async deleteAddress(addressId: string) {
    const res = await apiClient.delete(
      API_ROUTES.address.deleteAddress(addressId)
    );
    return res.data;
  },
};
