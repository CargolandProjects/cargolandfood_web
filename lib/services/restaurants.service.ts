import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { MenuItem } from "./promotions.service";

type Restarants = MenuItem[];

export const restaurants = {
  async getRestaurants(): Promise<Restarants> {
    const res = await apiClient.get<Restarants>(API_ROUTES.restaurants);
    return res.data;
  },
  
};
