import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/lib/services/order.service";
import { toast } from "sonner";

/**
 * Place order for a vendor's cart
 * Invalidates cart queries after successful order
 */
export function usePlaceOrder(vendorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => orderService.placeOrder(vendorId),
    
    onSuccess: (response) => {
      // Invalidate checkout preview (cart will be cleared by backend)
      queryClient.invalidateQueries({ 
        queryKey: ["checkoutPreview", vendorId] 
      });
      
      // TODO: Invalidate "fetch all carts" query when endpoint is available
      // queryClient.invalidateQueries({ queryKey: ["allCarts"] });
      
      return response; // Return for component to handle success modal
    },
    
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to place order";
      toast.error(message);
    },
  });
}
