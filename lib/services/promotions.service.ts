import { StaticImageData } from "next/image";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints"; 

export interface MenuItem {
  id: number;
  title: string;
  image: StaticImageData;
  rating: number;
  deliveryFee: number;
  deliveryTime: string;
  discount: number;
}

export interface Promotions {
  discount: MenuItem[];
  featured: MenuItem[];
}

export const promotions = {
  async getPromotions(): Promise<Promotions> {
    const res = await apiClient.get<Promotions>(API_ROUTES.promotions);
    return res.data;
  },
};
