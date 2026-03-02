import { wallet } from "@/lib/services/wallet.service";
import { useMutation } from "@tanstack/react-query";

export const useFundWallet = () => {
  return useMutation({
    mutationFn: wallet.fundWallet,
  });
};
