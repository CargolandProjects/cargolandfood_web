import { useQuery } from "@tanstack/react-query";
import { cart } from "@/lib/services/cart.service";
import { keepPreviousData } from "@tanstack/react-query";

export function useCheckoutPreview(
  vendorId: string,
  deliveryType: "DELIVERY" | "PICKUP",
  enabled: boolean = false,
  isAuthenticated: boolean
) {
  return useQuery({
    queryKey: ["checkoutPreview", vendorId, deliveryType],
    queryFn: () => cart.checkoutPreview(vendorId, deliveryType),
    placeholderData: keepPreviousData,
    enabled: enabled && !!vendorId && isAuthenticated, // Only fetch when enabled and vendorId exists
    staleTime: 0, // Always fetch fresh data when deliveryType changes
    // gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    retry: (failureCount, error: any) => {
      // Don't retry if cart is empty (400 error)
      if (error?.statusCode === 400) {
        return false;
      }

      // Retry once for other errors
      return failureCount < 1;
    },
  });
}
