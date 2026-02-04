import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

interface Message {
  status: string;
  message: string;
}

interface MakeFavourite {
  isFavourite: boolean;
  vendorId: string;
  userId: string;
}

interface Favourite {
  id: string;
  vendorId: string;
  userId: string;
  isFavourite: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Favourites extends Message {
  data: Favourite[];
}

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
