import { useQuery } from "@tanstack/react-query";
import { cartService } from "@/lib/services/cart.service";

export function useCheckoutPreview(
  vendorId: string, 
  deliveryType: "DELIVERY" | "PICKUP",
  enabled: boolean = false
) {
  return useQuery({
    queryKey: ["checkoutPreview", vendorId, deliveryType],
    queryFn: () => cartService.checkoutPreview(vendorId, deliveryType),
    enabled: enabled && !!vendorId, // Only fetch when enabled and vendorId exists
    staleTime: 0, // Always fetch fresh data when deliveryType changes
    // gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    retry: (failureCount, error: any) => {
      // Don't retry if cart is empty (400 error)
      if (error?.response?.status === 400) {
        return false;
      }
      // Retry once for other errors
      return failureCount < 1;
    },
  });
}

export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart
  })
}