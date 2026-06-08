import { cart } from "@/lib/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cart.updateCheckoutPreview,
    onSuccess: (res, { vendorId, payload }) => {
      queryClient.setQueryData(
        ["checkoutPreview", vendorId, payload.deliveryType],
        res
      );
    },
  });
};
