import { wallet } from "@/lib/services/wallet.service";
import { useQuery } from "@tanstack/react-query";

export const useWalletBalance = () => {
  return useQuery({
    queryKey: ["walletBalance"],
    queryFn: wallet.walletBalance,
    select: (res) => res.balance,
  });
};

export const useTransactionRecords = () => {
  return useQuery({
    queryKey: ["transactionRecords"],
    queryFn: wallet.transactionRecords,
    select: (res) => res.data,
  });
};
