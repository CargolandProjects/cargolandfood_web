import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import mockClient from "../api/mock-client";
import { MenuItem } from "./promotions.service";

type Restarants = MenuItem[];

export const restaurants = {
  async getRestaurants(): Promise<Restarants> {
    const res = await mockClient.get<Restarants>(API_ROUTES.restaurants);
    return res.data;
  },
  
};
