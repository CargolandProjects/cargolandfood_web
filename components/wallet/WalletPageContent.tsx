"use client";

import TransactionHistory from "@/components/wallet/TransactionHistory";
import WalletCard from "@/components/wallet/WalletCard";
import { useRouter } from "next/navigation";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useState } from "react";
import TopUpModal from "./TopUpModal";

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "expense" | "income";
  status: string;
}

export interface TransactionGroup {
  month: string;
  transactions: Transaction[];
}

const TRANSACTIONS: TransactionGroup[] = [
  {
    month: "September 2025",
    transactions: [
      {
        id: "1",
        title:
          "1 Portion of Stir fry Spaghetti, plantain, a bottle of coke and a slice of pizza with a jug 0f milk and a container of yoghurt",
        date: "2025-08-18T09:15:30Z",
        amount: 3635,
        type: "expense",
        status: "success",
      },
      {
        id: "2",
        title: "Wallet Top Up",
        date: "2025-08-18T09:15:30",
        amount: 5000,
        type: "income",
        status: "success",
      },
      {
        id: "3",
        title: "1 Portion of Stir fry Spaghetti, Plantain a...",
        date: "2025-12-28T18:18:00",
        amount: 3635,
        type: "expense",
        status: "success",
      },
      {
        id: "4",
        title: "Wallet Top Up",
        date: "2025-11-30T08:18:00",
        amount: 5000,
        type: "income",
        status: "success",
      },
    ],
  },
  {
    month: "August 2025",
    transactions: [
      {
        id: "5",
        title: "1 Portion of Stir fry Spaghetti, Plantain a...",
        date: "2025-10-25T14:00:00",
        amount: 3635,
        type: "expense",
        status: "success",
      },
      {
        id: "6",
        title: "Wallet Top Up",
        date: "2025-12-10T09:30:00",
        amount: 5000,
        type: "income",
        status: "success",
      },
      {
        id: "7",
        title: "1 Portion of Stir fry Spaghetti, Plantain a...",
        date: "2025-11-30T10:45:00",
        amount: 3635,
        type: "expense",
        status: "success",
      },
      {
        id: "8",
        title: "Wallet Top Up",
        date: "2025-06-05T08:20:00",
        amount: 5000,
        type: "income",
        status: "success",
      },
    ],
  },
];

const WalletPageContent = () => {
  const [amount, setAmount] = useState("");
  const [showTopup, setShowTopUp] = useState(false);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const balance = 37500;

  return (
    <div className=" max-w-[1006px] mx-auto">
      <button
        onClick={handleBack}
        className="flex items-center gap-4 mb-6 text-sm w-full pl-2 hover:cursor-pointer"
      >
        <RiArrowGoBackLine className="size-3.5 text-gray-500" />
        <span className="text-xl font-medium">My Wallet</span>
      </button>

      <TransactionHistory transactions={TRANSACTIONS} />
      
      <WalletCard balance={balance} showTopup={() => setShowTopUp(true)} />
      <TopUpModal
        amount={amount}
        setAmount={setAmount}
        balance={balance}
        open={showTopup}
        onOpenChange={setShowTopUp}
      />
    </div>
  );
};

export default WalletPageContent;
