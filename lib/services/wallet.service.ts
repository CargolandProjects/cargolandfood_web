import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse, Order } from "../types/cart.types";

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

export type TransactionStatus = "SUCCESS" | "FAILED" | "PENDING";

export interface TransactionRecord {
  id: string;
  walletId: string;
  type: "CREDIT" | "DEBIT";
  amount: string;
  reference: string;
  description: string | null;
  status: TransactionStatus;
  createdAt: string;
}

interface ChargeWalletPayload {
  description: string;
  cartId: string;
}

type FundWalletResponse = APIResponse<FundWallet>;
type TransactionRecords = APIResponse<TransactionRecord[]>;

interface ChargeWalletesponse {
  status: string;
  message: string;
  orderData: APIResponse<Order & { paymentReference: string }>;
}

export const wallet = {
  async fundWallet(amount: payload) {
    const res = await apiClient.post<FundWalletResponse>(
      API_ROUTES.wallet.fundWallet,
      amount
    );
    return res.data;
  },

  async chargeWallet(payload: ChargeWalletPayload) {
    const res = await apiClient.post<ChargeWalletesponse>(
      API_ROUTES.order.chargeWallet,
      payload
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
