import { create } from "zustand";

// Generic panel state
type PanelState<TPayload = null> = {
  open: boolean;
  payload?: TPayload | null;
};

// Order Details payload (expand as needed)
export type OrderDetailsPayload =
  | {
      orderId: string;
      source: "general";
    }
  | {
      reference: string;
      source: "paymentSuccessful";
    }
  | null;

// Checkout payload (expand as needed)
export type CheckoutPayload = {
  vendorId: string;
  // initialStep?: "review" | "payment" | "confirm";
  // couponCode?: string;
  // You can add: addressId, paymentMethodId, etc.
} | null;

export type ReviewOrderPayload = {
  vendorId: string;
} | null;

export type TrackOrderPayload = {
  orderId: string;
} | null;

export type OrderSuccessPayload = {
  preparationTime: string;
  orderId: string;
} | null;

// export type OrderSuccesPayload = {
//   closeCheckout?: (v: boolean) => void;
// } | null;

// UI store shape
export type UIStoreState = {
  // Panels
  orderDetails: PanelState<OrderDetailsPayload>;
  checkout: PanelState<CheckoutPayload>;
  trackOrder: PanelState<TrackOrderPayload>;
  addresses: PanelState;
  orderSuccess: PanelState<OrderSuccessPayload>;
  reviewOrder: PanelState<ReviewOrderPayload>;

  openAddresses: () => void;
  closeAddresses: () => void;

  openOrderSuccess: (payload: OrderSuccessPayload) => void;
  closeOrderSuccess: () => void;

  // Actions: Order Details
  openOrderDetails: (payload: OrderDetailsPayload) => void;
  closeOrderDetails: () => void;
  // setOrderDetailsPayload: (patch: Partial<OrderDetailsPayload>) => void;
  // replaceOrderDetailsPayload: (payload: OrderDetailsPayload | null) => void;

  // Actions: Track Order
  openTrackOrder: (payload: TrackOrderPayload) => void;
  closeTrackOrder: () => void;

  // Actions: Checkout
  openCheckout: (payload: CheckoutPayload) => void;
  closeCheckout: () => void;

  openReviewOrder: (payload?: CheckoutPayload) => void;
  closeReviewOrder: () => void;
  // setCheckoutPayload: (patch: Partial<CheckoutPayload>) => void;
  // replaceCheckoutPayload: (payload: CheckoutPayload | null) => void;
};

export const useUIStore = create<UIStoreState>((set) => ({
  // Initial state
  orderDetails: { open: false, payload: null },
  checkout: { open: false, payload: null },
  trackOrder: { open: false },
  addresses: { open: false },
  orderSuccess: { open: false, payload: null },
  reviewOrder: { open: false, payload: null },

  openReviewOrder: (payload = null) =>
    set({ reviewOrder: { open: true, payload } }),
  closeReviewOrder: () => set({ reviewOrder: { open: false, payload: null } }),

  openOrderSuccess: (payload = null) =>
    set({ orderSuccess: { open: true, payload } }),
  closeOrderSuccess: () =>
    set({ orderSuccess: { open: false, payload: null } }),

  openTrackOrder: (payload: TrackOrderPayload) => {
    set({ trackOrder: { open: true, payload } });
  },

  closeTrackOrder: () => {
    set({
      trackOrder: { open: false },
    });
  },

  openAddresses: () => {
    set({ addresses: { open: true } });
  },

  closeAddresses: () => {
    set({ addresses: { open: false } });
  },

  // Order Details actions
  openOrderDetails: (payload = null) =>
    set({ orderDetails: { open: true, payload } }),
  closeOrderDetails: () =>
    set({ orderDetails: { open: false, payload: null } }),

  // setOrderDetailsPayload: (patch) => {
  //   const current = get().orderDetails.payload ?? ({} as OrderDetailsPayload);
  //   set({ orderDetails: { open: true, payload: { ...current, ...patch } } });
  // },

  // replaceOrderDetailsPayload: (payload) => set({ orderDetails: { open: !!payload, payload } }),

  // Checkout actions
  openCheckout: (payload = null) => set({ checkout: { open: true, payload } }),
  closeCheckout: () => set({ checkout: { open: false, payload: null } }),

  // setCheckoutPayload: (patch) => {
  //   const current = get().checkout.payload ?? ({} as CheckoutPayload);
  //   set({ checkout: { open: true, payload: { ...current, ...patch } } });
  // },

  // replaceCheckoutPayload: (payload) => set({ checkout: { open: !!payload, payload } }),
}));

// Convenience non-hook API for triggering from anywhere (no provider needed)
export const openOrderDetails = (payload: OrderDetailsPayload) =>
  useUIStore.getState().openOrderDetails(payload);
export const closeOrderDetails = () =>
  useUIStore.getState().closeOrderDetails();
// export const setOrderDetailsPayload = (patch: Partial<OrderDetailsPayload>) =>
//   useUIStore.getState().setOrderDetailsPayload(patch);

export const openCheckout = (payload: CheckoutPayload) =>
  useUIStore.getState().openCheckout(payload);
export const closeCheckout = () => useUIStore.getState().closeCheckout();
// export const setCheckoutPayload = (patch: Partial<CheckoutPayload>) =>
//   useUIStore.getState().setCheckoutPayload(patch);
