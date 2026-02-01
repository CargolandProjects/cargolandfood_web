import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export const reviews = {
  async getReviews() {
    const res = await apiClient.get(API_ROUTES.reviews.getReviews);
    return res.data;
  },

  async submitReview(payload: any) {
    const res = await apiClient.post(API_ROUTES.reviews.submitReview, payload);
    return res.data;
  },
};
