import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cart } from "@/lib/services/cart.service";
import { toast } from "sonner";
import type { AddToCartPayload } from "@/lib/types/cart.types";

interface ClearCartVars {
  cartId: string;
  vendorId: string;
}

export function useAddToCart(vendorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) =>
      cart.addOrUpdateItem(vendorId, payload),

    onSuccess: (response) => {
      // Invalidate checkout preview to refetch with updated cart
      queryClient.invalidateQueries({
        queryKey: ["checkoutPreview", vendorId],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success(response.message || "Item added to cart");
    },

    onError: (error) => {
      const message = error.message || "Failed to add item to cart";
      toast.error(message);
    },
  });
}

export const useRemoveCartItem = (vendorId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cart.removeCartItem,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["checkoutPreview", vendorId],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success(response.message || "Item removed from cart");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to remove item from cart");
    },
  });
};

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId }: ClearCartVars) => cart.clearCart(cartId),

    onSuccess: (_, vars) => {
      // Invalidate checkout preview to reflect empty cart
      queryClient.invalidateQueries({
        queryKey: ["checkoutPreview", vars.vendorId],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Cart cleared");
    },

    onError: (error) => {
      const message = error.message || "Failed to clear cart";
      toast.error(message);
    },
  });
}
