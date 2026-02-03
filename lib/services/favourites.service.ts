import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

interface MakeFavourite {
  isFavourite: boolean;
  vendorId: string;
  userId: string;
}

export const favourites = {
  async getAllFavourites(userId: string) {
    const res = await apiClient.get(
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
