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
    select: (res) => {
      // Handle inconsistent API response formats:
      // - Empty transactions: API returns [] directly
      // - With transactions: API returns { status, message, data: [...] }
      const records = res?.data ?? res ?? [];
      
      // Ensure we always pass an array to groupTransactionsByMonth
      const safeRecords = Array.isArray(records) ? records : [];
      
      return groupTransactionsByMonth(safeRecords);
    },
    enabled: isAuthenticated,
  });
};
