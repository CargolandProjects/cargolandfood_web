import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/lib/services/order.service";
import { toast } from "sonner";

export function usePlaceOrder(vendorId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => orderService.placeOrder(vendorId),

    onSuccess: () => {
      // Invalidate checkout preview (cart will be cleared by backend)
      queryClient.invalidateQueries({
        queryKey: ["checkoutPreview", vendorId],
      });

      toast.success("Order placed successfully");
    },

    onError: (error) => {
      const message = error.message || "Failed to place order";
      toast.error(message);
    },
  });
}
