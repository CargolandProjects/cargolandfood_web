import { CategoryType } from "@/contexts/CategoryContext";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

interface Category {
  id: CategoryType;
  name: string;
  icon: string;
  styles: string;
  activeStyle: string;
}

type Categories = Category[];

export const categories = {
  async getCategories(): Promise<Categories> {
    const res = await apiClient.get<Categories>(API_ROUTES.categories);
    return res.data;
  },
};
