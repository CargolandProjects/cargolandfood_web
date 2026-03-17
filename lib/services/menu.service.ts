import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

// Vendor/Restaurant type
interface Vendor {
  id: string;
  businessName: string;
  createdAt: string; // ISO date string
  businessCategory: string;
  businessAddress: string;
  isPreorder: boolean;
  golive: boolean;
  totalOrders: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
}

// Main Menu Item type
interface Menu {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
  isMenuSet: boolean;
  createdAt: string;
  updatedAt: string;
  vendor: Vendor;
  simpleRating: number;
  bayesianRating: number;
}

interface MenuResponse {
  status: string;
  message: string;
  products: Menu[];
}

export const menu = {
  async getSearchItems(zoneId: string, query: string) {
    const res = await apiClient.get<MenuResponse>(
      API_ROUTES.searchVendorMenu(zoneId, query)
    );
    return res.data;
  },
};
