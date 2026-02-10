// Cart and Order Type Definitions based on actual API responses
interface APIResponse {
  status: string;
  message: string;
}
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

export interface CheckoutPreviewCart {
  menuId: string;
  menuName: string;
  unitPrice: string;
  quantity: number;
  discountApplied: string;
  totalPrice: string;
}

export interface CheckoutPreview {
  cart: Cart;
  totalItemPrices: string;
  subtotal: string;
  discountTotal: string;
  deliveryFee: string; // Can be "NaN" from backend
  serviceFee: string;
  total: string; // Can be "NaN" from backend
}

// export interface CheckoutPreview {
//   cartId: string;
//   deliveryType: "DELIVERY" | "PICKUP";
//   items: CheckoutPreviewCart[];
//   totalItemPrices: string;
//   subtotal: string;
//   discountTotal: string;
//   deliveryFee: string; // Can be "NaN" from backend
//   serviceFee: string;
//   total: string; // Can be "NaN" from backend
// }

// Request payload types
export interface AddToCartPayload {
  menuId: string;
  menuName: string;
  unitPrice: string;
  quantity: number;
  action: "INCREMENT" | "DECREMENT" | "SET";
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

type PlaceOrderItems = CheckoutPreviewCart & {
  id: string;
  orderId: string;
  createdAt: string;
};

// Place order response - will be updated after testing
export interface PlaceOrderResponse extends APIResponse {
  data: {
    id: string;
    orderNumber: string;
    userId: string;
    vendorId: string;
    cartId: string;
    deliveryType: "PICKUP | DElIVERY";
    addressSnapshot: string | null;
    couponCode: string | null;
    isCoupon: boolean;
    status: "NEW";
    paymentStatus: "PENDING_PAYMENT";
    subtotal: string;
    discountTotal: string;
    deliveryFee: string;
    serviceFee: string;
    total: string;
    appliedDiscounts: string | null;
    acceptedAt: string | null;
    preparedAt: string | null;
    readyAt: string | null;
    completedAt: string | null;
    cancelledAt: string | null;
    createdAt: string;
    items: PlaceOrderItems[];
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  vendorId: string;
  cartId: string;
  deliveryType: "DELIVERY" | string;
  addressSnapshot: AddressSnapshot;
  couponCode: string | null;
  isCoupon: boolean;
  status: "NEW" | string;
  paymentStatus: "PAID" | string;
  subtotal: string;
  discountTotal: string;
  deliveryFee: string;
  serviceFee: string;
  total: string;
  appliedDiscounts: unknown | null;
  acceptedAt: string | null;
  preparedAt: string | null;
  readyAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  items: OrderItem[];
}

export interface AddressSnapshot {
  id: string;
  city: string;
  state: string;
  userId: string;
  country: string;
  placeId: string;
  latitude: string;
  provider: string;
  createdAt: string;
  longitude: string;
  updatedAt: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  instructions: string | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuId: string;
  menuName: string;
  unitPrice: string;
  quantity: number;
  discountApplied: string;
  totalPrice: string;
  createdAt: string;
  addonItem: unknown[];
}

export interface PaymentResponse extends APIResponse {
  data: Order;
}
