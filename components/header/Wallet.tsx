import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  RiWallet3Fill,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useWalletBalance } from "@/lib/hooks/queries/useWallet";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "@/lib/hooks/useSession";

const Wallet = () => {
  const { isAuthenticated } = useSession();
  const router = useRouter();
  const {
    data: balance,
    isLoading,
    isError,
    isSuccess,
  } = useWalletBalance(isAuthenticated);

  const handleRoute = () => {
    router.push("/wallet");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="max-sm:hidden">
        <button className="flex items-center gap-1 hover:bg-gray-100">
          <RiWallet3Fill className="size-6  text-blue-400 " />
          <p className="text-xs font-medium text-gray-900">My Wallet</p>
          <RiArrowDownSLine className="size-5 text-gray-600 ml-2" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[161px] dropdown-content">
        {isError && (
          <p className="text-xs text-red-500 text-center">
            Failed to fetch balance
          </p>
        )}
        <DropdownMenuLabel className="p-0">Available Balance</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-gray-200 border mt-1 mb-2" />
        {isLoading && (
          <div className="flex justify-a items-center gap-5">
            <Skeleton className="bg-gray-200 h-4 flex-1" />
            <Skeleton className="w-6 h-4 bg-gray-200" />
          </div>
        )}

        {isSuccess && (
          <DropdownMenuItem
            onSelect={handleRoute}
            className="text-gray-500 font-medium p-0 justify-between"
          >
            ₦{Number(balance).toLocaleString()}
            <RiArrowRightSLine className="size-6" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Wallet;
