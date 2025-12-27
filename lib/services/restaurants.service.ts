import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import mockClient from "../api/mock-client";
import { Vendor } from "./promotions.service";

type Restarants = Vendor[];

export const restaurants = {
  async getRestaurants(): Promise<Restarants> {
    const res = await mockClient.get<Restarants>(API_ROUTES.restaurants);
    return res.data;
  },
  
};
