import { StaticImageData } from "next/image";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import mockClient from "../api/mock-client";

export interface Menu {
  id: number;
  title: string;
  image: StaticImageData;
  rating: number;
  deliveryFee: number;
  deliveryTime: string;
  discount: number;
}

interface HotPicks {
  name: string;
  image: string;
  link: string;
}

export interface Promotions {
  discount: Menu[];
  featured: Menu[];
}

export const promotions = {
  async getPromotions(): Promise<Promotions> {
    const res = await mockClient.get<Promotions>(API_ROUTES.promotions);
    return res.data;
  },

  async getDiscounts() {
    const res = await apiClient.get(API_ROUTES.promotions);
    return res.data;
  },

  async hotPicks() {
    const res = await mockClient.get<HotPicks[]>(API_ROUTES.hotPicks);
    return res.data;
  },
};
