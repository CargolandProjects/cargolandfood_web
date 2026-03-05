import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/lib/services/order.service";
import { toast } from "sonner";

export function useMakePayment() {
  return useMutation({
    mutationFn: orderService.makePayment,

    onSuccess: () => {
      toast.success("Order placed successfully", {
        description: "You'll be redirected shortly",
      });
    },

    onError: (error) => {
      const message = error.message || "Failed to place order";
      toast.error(message);
    },
  });
}

export function useChargeWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderService.chargeWallet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checkoutPreview"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      queryClient.invalidateQueries({
        queryKey: ["walletBalance"],
      });

      toast.success("Order placed successfully");
    },

    onError: (error) => {
      const message = error.message || "Failed to place order";
      toast.error(message);
    },
  });
}

// export const useSimulatePayment = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: orderService.simulatePayment,
//     onSuccess(data) {
//       toast.success(data.message || "Payment successful");

//       queryClient.invalidateQueries({
//         queryKey: ["checkoutPreview", data.data.vendorId],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["cart"],
//       });
//     },
//   });
// };
