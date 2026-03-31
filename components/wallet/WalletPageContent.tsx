"use client";

import TransactionHistory from "@/components/wallet/TransactionHistory";
import WalletCard from "@/components/wallet/WalletCard";
import { useProtectedRoute } from "@/lib/hooks/useProtectedRoute";
import { useRouter } from "next/navigation";
import { RiArrowGoBackLine, RiArrowLeftLine } from "react-icons/ri";

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
      <div className="flex items-center gap-4 mb-6 text-sm w-full pl-2 max-sm:hidden">
        <button onClick={handleBack} className="hover:cursor-pointer">
          <RiArrowGoBackLine className="size-3.5 text-gray-500" />
        </button>

        <span className="text-xl font-medium">My Wallet</span>
      </div>

      <div className="relative w-full flex justify-center items-center sm:hidden mb-5">
        <button onClick={handleBack} className="absolute left-2.5">
          <RiArrowLeftLine className="size-5" />
        </button>
        <p className="text-xl font-medium">My Wallet</p>
      </div>

      <WalletCard />
      <TransactionHistory />
    </div>
  );
};

export default WalletPageContent;
