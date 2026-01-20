import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "@/lib/services/cart.service";
import { toast } from "sonner";
import type { AddToCartPayload } from "@/lib/types/cart.types";

/**
 * Add item to cart or update quantity
 * Uses optimistic updates for instant UI feedback
 */
export function useAddToCart(vendorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) =>
      cartService.addOrUpdateItem(vendorId, payload),

    onSuccess: (response) => {
      // Invalidate checkout preview to refetch with updated cart
      queryClient.invalidateQueries({
        queryKey: ["checkoutPreview", vendorId],
      });

      toast.success(response.message || "Item added to cart");
    },

    onError: (error) => {
      const message = error.message || "Failed to add item to cart";
      toast.error(message);
    },
  });
}

/**
 * Clear cart for a vendor
 */
export function useClearCart(vendorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: string) => cartService.clearCart(cartId),

    onSuccess: () => {
      // Invalidate checkout preview to reflect empty cart
      queryClient.invalidateQueries({
        queryKey: ["checkoutPreview", vendorId],
      });

      toast.success("Cart cleared");
    },

    onError: (error) => {
      const message = error.message || "Failed to clear cart";
      toast.error(message);
    },
  });
}
