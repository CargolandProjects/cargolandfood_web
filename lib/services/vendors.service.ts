import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export interface Vendor {
  id: string;
  businessName: string;
  businessCategory: string | null;
  businessAddress: string | null;
  preparationTime: string | null;
  isPreorder: boolean | null;
  isFavourite: boolean;
  golive: boolean | null;
  totalOrders: number | null;
  profileImg: string;
  createdAt: string;
  ratings: number;
}

export interface Vendors {
  status: string;
  message: string;
  vendors: Vendor[];
}

interface Addon {
  id: string;
  name: string;
  addonImage: string;
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
  imageUrl: string;
  categoryId: string;
  vendorId: string;
  outOfStock?: boolean;
  addons?: Addon[];
  sizes?: Size[];
  isMenuSet: boolean;
  PromotionItem?: {
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

export interface Categories {
  id: string;
  name: string;
  publishNow: boolean;
  vendorId: string;
  createdAt: string;
}

export interface VendorDetail extends Omit<Vendor, "ratings"> {
  categories: Categories[];
  menus: Menu[];
  review: Review[];
  promotions: Promotions[];
}

export interface vendorById {
  status: string;
  message: string;
  data: VendorDetail;
  averageRating: {
    simpleRating: number;
    bayesianRating: number;
  };
}
export const vendors = {
  async getAllVendors(zoneId: string) {
    const res = await apiClient.get<Vendors>(
      API_ROUTES.vendor.allVendors(zoneId)
    );
    return res.data;
  },

  async getVendorById(id: string) {
    const res = await apiClient.get<vendorById>(
      API_ROUTES.vendor.vendorById(id)
    );
    return res.data;
  },
};
