import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "../types/cart.types";

interface payload {
  amount: string;
}

interface WalletBalance {
  status: string;
  message: string;
  balance: string;
}

interface FundWallet {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface TransactionRecord {
  id: string;
  walletId: string;
  type: "CREDIT" | "DEBIT";
  amount: string;
  reference: string;
  description: string | null;
  status: "SUCCESS" | "FAILED";
  createdAt: string;
}

type FundWalletResponse = APIResponse<FundWallet>;
type TransactionRecords = APIResponse<TransactionRecord[]>;

export const wallet = {
  async fundWallet(amount: payload) {
    const res = await apiClient.post<FundWalletResponse>(
      API_ROUTES.wallet.fundWallet,
      amount
    );
    return res.data;
  },

  async walletBalance() {
    const res = await apiClient.get<WalletBalance>(
      API_ROUTES.wallet.walletBalance
    );
    return res.data;
  },

  async transactionRecords() {
    const res = await apiClient.get<TransactionRecords>(
      API_ROUTES.wallet.transactionRecords
    );
    return res.data;
  },
};
