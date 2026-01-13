import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export interface Vendor {
  id: string;
  businessName: string;
  businessCategory: string;
  businessAddress: string;
  isPreorder: boolean;
  golive: boolean;
  totalOrders: number;
  profileImg: string;
  createdAt: string;
  ratings: number;
}

interface Vendors {
  status: string;
  message: string;
  vendors: Vendor[];
}

interface Addon {
  id: string;
  name: string;
  price: string;
  menuId: string;
  createdAt: string;
  upddatedAt: string;
}

interface Size {
  id: string;
  name: string;
  size: string;
  price: string;
  menuId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Menu {
  id: string;
  name: string;
  description: string;
  price: string;
  uploadImageUrl: string;
  categoryId: string;
  vendorId: string;
  outOfStock: boolean;
  addons: Addon[];
  sizes: Size[];
  isMenuSet: boolean;
  PromotionItem: {
    id: string;
    promotionId: string;
    menuItemId: string;
    promotion: {
      percentageValue: number;
    };
  }[];
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  vendorId: string;
  userId: string;
  createdAt: string;
}

interface Promotions {
  id: string;
  isDiscount: boolean;
  discountType: string;
  percentageValue: number;
  applyType: string;
  startDate: string;
  endDate: string;
  vendorId: string;
  createdAt: string;
  updatedAt: string;
}

interface Categories {
  id: string;
  name: string;
  publishNow: boolean;
  vendorId: string;
  createdAt: string;
}

interface VendorDetail extends Omit<Vendor, "ratings"> {
  categories: Categories[];
  menus: Menu[];
  review: Review[];
  promotions: Promotions[];
}

interface vendorById {
  status: string;
  message: string;
  data: VendorDetail;
  averageRating: {
    simpleRating: number;
    bayesianRating: number;
  };
}
export const vendors = {
  async getAllVendors() {
    const res = await apiClient.get<Vendors>(API_ROUTES.vendor.allVendors);
    return res.data;
  },

  async getVendorById(id: string) {
    const res = await apiClient.get<vendorById>(
      API_ROUTES.vendor.vendorById(id)
    );
    return res.data;
  },
};
