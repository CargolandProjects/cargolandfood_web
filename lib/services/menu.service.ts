import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export const menu = {
  async getSearchItems(query: string) {
    if (!query.trim()) return;
    const res = await apiClient.get(API_ROUTES.search(query));
    return res.data;
  },
};
