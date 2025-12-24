import { StaticImageData } from "next/image";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints"; 
import mockClient from "../api/mock-client";

export interface Vendor {
  id: number;
  title: string;
  image: StaticImageData;
  rating: number;
  deliveryFee: number;
  deliveryTime: string;
  discount: number;
}

export interface Promotions {
  discount: Vendor[];
  featured: Vendor[];
}

export const promotions = {
  async getPromotions(): Promise<Promotions> {
    const res = await mockClient.get<Promotions>(API_ROUTES.promotions);
    return res.data;
  },
};
