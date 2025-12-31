import { CategoryType } from "@/contexts/CategoryContext";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import mockClient from "../api/mock-client";
import { Product } from "../stores/CartStore";

interface Category {
  id: CategoryType;
  name: string;
  icon: string;

}

type Categories = Category[];

export const categories = {
  async getCategories(): Promise<Categories> {
    const res = await mockClient.get<Categories>(API_ROUTES.categories);
    return res.data;
  },

  async getRestaurant(id: string) {
    const res = await mockClient.get<Product[]>(API_ROUTES.restaurant(id));
    return res.data;
  },
};
