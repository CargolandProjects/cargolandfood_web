import { useQuery } from "@tanstack/react-query";
import { cartService } from "@/lib/services/cart.service";

/**
 * Fetch checkout preview for a vendor
 * Only fetches when explicitly enabled (not on page load)
 * 
 * @param vendorId - The vendor ID
 * @param deliveryType - DELIVERY or PICKUP (default: DELIVERY)
 * @param enabled - Whether to fetch the data (default: false)
 */
export function useCheckoutPreview(
  vendorId: string, 
  deliveryType: "DELIVERY" | "PICKUP" = "DELIVERY",
  enabled: boolean = false
) {
  return useQuery({
    queryKey: ["checkoutPreview", vendorId, deliveryType],
    queryFn: () => cartService.getCheckoutPreview(vendorId, deliveryType),
    enabled: enabled && !!vendorId, // Only fetch when enabled and vendorId exists
    staleTime: 0, // Always fetch fresh data when enabled
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    retry: 1, // Only retry once on failure
  });
}
