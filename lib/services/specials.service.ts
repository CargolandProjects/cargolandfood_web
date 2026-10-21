import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "../types/cart.types";

interface BannerPromo {
  id: string;
  isDiscount: true;
  percentageValue: number;
  applyType: "MENU_ITEMS";
  campaignImgUrl: "";
  publicImgUrl: "";
  startDate: string;
  endDate: string;
  vendorId: string;
  items: {
    menuItemId: string;
  }[];
}

type BannerPromos = APIResponse<BannerPromo[]>;

export const specials = {
  async getBannerPromos(zoneId: string) {
    const res = await apiClient<BannerPromos>(
      API_ROUTES.specials.bannersPromos(zoneId),
    );
    return res.data;
  },
};
