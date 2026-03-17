import { wallet } from "@/lib/services/wallet.service";
import { useQuery } from "@tanstack/react-query";
import { groupTransactionsByMonth } from "@/lib/utils";

export const useWalletBalance = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: ["walletBalance"],
    queryFn: wallet.walletBalance,
    select: (res) => res.balance,
    enabled: isAuthenticated,
  });
};

export const useTransactionRecords = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: ["transactionRecords"],
    queryFn: wallet.transactionRecords,
    select: (res) => groupTransactionsByMonth(res.data),
    enabled: isAuthenticated,
  });
};
