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

export interface AddressComponent {
  longText: string;
  shortText: string;
  types: string[];
  languageCode: string;
}

interface DisplayName {
  text: string;
  languageCode: string;
}

interface PlaceDetailsResponse {
  id: string;
  formattedAddress: string;
  addressComponents: AddressComponent[];
  displayName: DisplayName;
  location: {
    latitude: number;
    longitude: number;
  };
}

type Addresses = APIResponse<GetAddress[]>;

type SelectAddressResponse = APIResponse<GetAddress>;

export const address = {
  // async getPlaceDetails(placeId: string): Promise<PlaceDetailsResponse> {
  //   const response = await fetch(API_ROUTES.address.getPlaceDetails(placeId));
  //   if (!response.ok) {
  //     const error = await response.json();
  //     throw new Error(error.error || "Failed to fetch place details");
  //   }

  //   const data = await response.json();
  //   return data;
  // },

  async getPlaceDetails(placeId: string) {
    const response = await fetch(API_ROUTES.address.getPlaceDetails(placeId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        "X-Goog-FieldMask":
          "id,displayName,formattedAddress,addressComponents,location",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch place details");
    }

    const data = await response.json();
    return data;
  },

  async getAddresses() {
    const res = await apiClient.get<Addresses>(API_ROUTES.address.getAddresses);
    return res.data;
  },

  async createAddress(payload: Address) {
    const res = await apiClient.post<APIResponse<GetAddress>>(
      API_ROUTES.address.createAddress,
      payload,
    );
    return res.data;
  },

  async setGuestAddress(payload: GuestAddressPayload) {
    const res = await apiClient.post(
      API_ROUTES.address.setGuestAddress,
      payload,
    );
    return res.data;
  },

  async selectAddress(addressId: string) {
    const res = await apiClient.post<SelectAddressResponse>(
      API_ROUTES.address.selectAddress(addressId),
      { isSelected: true },
    );
    return res.data;
  },

  async deleteAddress(addressId: string) {
    const res = await apiClient.delete(
      API_ROUTES.address.deleteAddress(addressId),
    );
    return res.data;
  },
};
