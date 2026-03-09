import { wallet } from "@/lib/services/wallet.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useChargeWallet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: wallet.chargeWallet,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["checkoutPreview"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
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
