import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "../types/cart.types";

interface SubmitReviews {
  vendorId: string;
  rating: number;
  comment: string;
}

interface Reviews {
  id: string;
  rating: number;
  comment: string;
  vendorId: string;
  userId: string;
  createdAt: string;
  vendor: {
    id: string;
    businessName: string;
    businessCategory: string;
    businessAddress: string;
    isPreorder: boolean;
    golive: boolean;
    totalOrder: number;
    createdAt: string;
  };
  reviewer: {
    profileImg: string;
    name: string;
    country: string;
  };
}

export type ReviewResponse = APIResponse<Reviews[]>;

export const reviews = {
  async getReviews() {
    const res = await apiClient.get<ReviewResponse>(
      API_ROUTES.reviews.getReviews
    );
    return res.data;
  },

  async submitReview(payload: SubmitReviews) {
    const res = await apiClient.post(API_ROUTES.reviews.submitReview, payload);
    return res.data;
  },
};
