import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "../types/cart.types";

interface MakeFavourite {
  isFavourite: boolean;
  vendorId: string;
  userId: string;
}

export interface Favourite {
  vendor: {
    vendorId: string;
    businessName: string;
    profileImg: string;
    preparationTime: string;
    ratings: number;
  };
  favourite: {
    id: string;
    vendorId: string;
    userId: string;
    isFavourite: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

type Favourites = APIResponse<Favourite[]>;

export const favourites = {
  async getAllFavourites(userId: string) {
    const res = await apiClient.get<Favourites>(
      API_ROUTES.favourites.getFavourites(userId)
    );
    return res.data;
  },

  async makeFavourite(payload: MakeFavourite) {
    const res = await apiClient.post(
      API_ROUTES.favourites.makeFavourite,
      payload
    );
    return res.data;
  },
};
