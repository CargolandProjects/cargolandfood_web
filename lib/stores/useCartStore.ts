import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Vendor {
  id: string;
  businessName: string;
  createdAt: string;
  businessCategory: string;
  businessAddress: string;
  isPreorder: boolean;
  golive: boolean;
  totalOrders: number;
  reviews: never[];
}

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  price?: string; // comes as string from API; we normalize to number in cart
  imageUrl?: string;
  categoryId?: string;
  isMenuSet?: boolean;
  createdAt?: string;
  updatedAt?: string;
  vendor?: Vendor;
  simpleRating?: number;
  bayesianRating?: number;
}

export interface SelectedSize {
  id: string;
  name: string;
  priceDelta: number; // numeric delta applied per unit
}

export interface SelectedPack {
  id: string;
  name: string;
  unitPrice: number; // price per unit of the pack
  quantity: number; // how many of this pack per main unit
}

export interface CartItem {
  id: string; // product id (line identity without variants for now)
  product: Product;
  quantity: number;
  unitPrice: number; // base numeric price derived from product.price
  // Provision for future variants (not used for identity/pricing yet)
  selectedSize?: SelectedSize;
  selectedPacks?: SelectedPack[];
}

export interface CartStoreState {
  items: CartItem[];
}

export interface CartStoreActions {
  addItem: (product: Product) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  remove: (productId: string) => void;
  // totals/selectors
  clearCart: () => void;
  getTotalQuantity: () => number; // sum of quantities
  getLineItemsCount: () => number; // number of distinct products (lines)
  getTotalPrice: () => number; // grand total
  getItemPosition: (productId: string) => number | null; // 1-based position; null if not found
}

export type CartStore = CartStoreState & CartStoreActions;

function parsePriceToNumber(price?: string): number {
  // Remove currency symbols and commas; parse to float
  const cleaned = (price ?? "").replace(/[^0-9.\-]/g, "");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const unitPrice = parsePriceToNumber(product?.price);
        const id = product?.id ?? "";
        set((state) => {
          const idx = state.items.findIndex((ci) => ci.id === id);
          if (idx === -1) {
            return {
              items: [
                ...state.items,
                {
                  id,
                  product: product!,
                  quantity: 1,
                  unitPrice,
                },
              ],
            };
          }
          const items = state.items.slice();
          items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 };
          return { items };
        });
      },

      increase: (productId) => {
        set((state) => {
          const idx = state.items.findIndex((ci) => ci.id === productId);
          if (idx === -1) return { items: state.items };
          const items = state.items.slice();
          items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 };
          return { items };
        });
      },

      decrease: (productId) => {
        set((state) => {
          const idx = state.items.findIndex((ci) => ci.id === productId);
          if (idx === -1) return { items: state.items };
          const current = state.items[idx];
          if (current.quantity <= 1) {
            return { items: state.items.filter((ci) => ci.id !== productId) };
          }
          const items = state.items.slice();
          items[idx] = { ...items[idx], quantity: items[idx].quantity - 1 };
          return { items };
        });
      },

      remove: (productId) => {
        set((state) => ({
          items: state.items.filter((ci) => ci.id !== productId),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalQuantity: () => {
        return get().items.reduce((sum, ci) => sum + ci.quantity, 0);
      },

      getLineItemsCount: () => {
        return get().items.length;
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, ci) => sum + ci.quantity * ci.unitPrice,
          0
        );
      },

      getItemPosition: (productId) => {
        const idx = get().items.findIndex((ci) => ci.id === productId);
        return idx === -1 ? null : idx + 1; // 1-based position
      },
    }),
    {
      name: "cart_store_v1",
      partialize: (state) => ({ items: state.items }),
      version: 1,
    }
  )
);
