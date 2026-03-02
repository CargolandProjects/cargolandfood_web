import { wallet } from "@/assets/images";
import { useWalletBalance } from "@/lib/hooks/queries/useWallet";
import { RiAddFill } from "react-icons/ri";
import Loader from "../Loader";
import TopUpModal from "./TopUpModal";
import { useState } from "react";

const WalletCard = () => {
  const [amount, setAmount] = useState("");
  const [showTopup, setShowTopUp] = useState(false);
  const { data: balance, isLoading, isError, isSuccess } = useWalletBalance();

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-secondary-900 p-4 text-white shadow-sm min-h-[115px] flex flex-col justify-center">
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-normal text-white/90">
              Available Balance
            </span>

            {isLoading && (
              <div className="mt-2">
                <Loader styles="text-white" />
              </div>
            )}

            {isSuccess && (
              <span className="text-2xl font-medium tracking-tight">
                ₦{Number(balance).toLocaleString()}
              </span>
            )}

            {isError && (
              <span className="text-2xl font-medium tracking-tight">----</span>
            )}
          </div>
          <button
            onClick={() => setShowTopUp(true)}
            className="flex size-6 items-center justify-center rounded-full bg-white text-[#43B02A] transition-colors hover:bg-white/90"
          >
            <RiAddFill className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Decorative Wallet Image */}
        <div
          className="absolute right-20 -bottom-9 h-24 w-24 opacity-38 rotate-[27deg]"
          style={{
            backgroundImage: `url(${wallet.src})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
      
      {/* Top up modal */}
      <TopUpModal
        amount={amount}
        setAmount={setAmount}
        balance={balance}
        open={showTopup}
        onOpenChange={setShowTopUp}
      />
    </>
  );
};

export default WalletCard;
