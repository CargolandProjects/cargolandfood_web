// Cart and Order Type Definitions based on actual API responses

export interface CartAddon {
  id: string;
  cartItemId: string;
  menuAddonId: string;
  name: string;
  price: string; // Backend returns as string
  quantity: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  menuId: string;
  menuName: string;
  unitPrice: string; // Backend returns as string
  quantity: number;
  addonsTotal: string;
  totalPrice: string;
  createdAt: string;
  addons: CartAddon[];
}

export interface Cart {
  id: string; // This is the cartId
  userId: string;
  vendorId: string;
  status: "ACTIVE" | "LOCKED";
  currency: "NGN";
  deliveryType: "DELIVERY" | "PICKUP";
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface CheckoutPreview {
  cartItem: Cart;
  totalItemPrices: string;
  subtotal: string;
  discountTotal: string;
  deliveryFee: string; // Can be "NaN" from backend
  serviceFee: string;
  total: string; // Can be "NaN" from backend
}

// Request payload types
export interface AddToCartPayload {
  menuId: string;
  menuName: string;
  unitPrice: string;
  quantity: number;
  currency: "NGN";
  addons?: {
    menuAddonId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

// Response wrapper from API
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

// Place order response - will be updated after testing
export interface PlaceOrderResponse {
  orderId: string;
  status: string;
  // TODO: Update this interface after testing placeOrder endpoint
  [key: string]: any;
}
