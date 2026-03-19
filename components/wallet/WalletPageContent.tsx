"use client";

import TransactionHistory from "@/components/wallet/TransactionHistory";
import WalletCard from "@/components/wallet/WalletCard";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import { useRouter } from "next/navigation";
import { RiArrowGoBackLine } from "react-icons/ri";

const WalletPageContent = () => {
  const { isChecking } = useProtectedRoute("/");
  const router = useRouter();

  // Block render until initial check completes
  if (isChecking) {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div className=" max-w-[1006px] mx-auto h-full flex flex-col">
      <button
        onClick={handleBack}
        className="flex items-center gap-4 mb-6 text-sm w-full pl-2 hover:cursor-pointer"
      >
        <RiArrowGoBackLine className="size-3.5 text-gray-500" />
        <span className="text-xl font-medium">My Wallet</span>
      </button>

      <WalletCard />
      <TransactionHistory />
    </div>
  );
};

export default WalletPageContent;
