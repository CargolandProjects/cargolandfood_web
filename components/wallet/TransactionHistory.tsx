import React, { useState } from "react";
import TxDetailModal from "./TxDetailModal";
import { formatPrettyDate } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useTransactionRecords } from "@/lib/hooks/queries/useWallet";
import ErrorStateUi from "../ErrorStateUi";
import TransactionHistorySkeleton from "./TransactionHistorySkeleton";

const TransactionHistory = () => {
  const {
    data: txHistory,
    isLoading,
    isSuccess,
    isError,
  } = useTransactionRecords();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    const selected = id === selectedId ? null : id;
    setSelectedId(selected);
  };

  return (
    <div className="flex flex-col flex-1 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base leading-6">Transaction History</h2>
        <button className="text-sm font-medium text-neutral-600 hover:underline underline-offset-2">
          See All
        </button>
      </div>

      {isLoading && (
        <div className="mt-6">
          <TransactionHistorySkeleton />
        </div>
      )}

      {isError && (
        <div className="py-10 h-full flex justify-center items-center">
          <ErrorStateUi message="Unable to fetch your transaction history. Please try again." />
        </div>
      )}

      {isSuccess && txHistory && txHistory.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-medium">No transactions yet</p>
          <p className="text-sm mt-1">
            Your transaction history will appear here
          </p>
        </div>
      )}

      {isSuccess && txHistory && (
        <div className="mt-6">
          {txHistory.map((group, groupIdx) => {
            console.log("Group ID: ", group.month);
            return (
              <div key={group.month} className="space-y-">
                <h3 className="text-base font-normal text-neutral-600 leading-5">
                  {group?.month}
                </h3>
                <div className="space-y-6 mt-6">
                  {group?.transactions.map((tx) => (
                    <React.Fragment key={tx.id}>
                      <div
                        onClick={() => handleSelect(tx.id)}
                        className="flex items-center justify-between hover:cursor-pointer gap-2"
                      >
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <p className="line-clamp-1 max-w-[300] sm:max-w-[350px] text-sm font-medium text-[#0A0D14]">
                            {tx?.description || tx.type}
                          </p>

                          <p className="text-xs text-[#868C98]">
                            {formatPrettyDate(tx.createdAt)}
                          </p>
                        </div>
                        <span
                          className={`whitespace-nowrap text-sm font-medium" ${
                            tx.type === "DEBIT"
                              ? "text-cargo-error"
                              : "text-cargo-success"
                          }`}
                        >
                          {tx.type === "DEBIT" ? "-" : ""}₦
                          {Number(tx.amount).toLocaleString()}
                        </span>
                      </div>
                      <TxDetailModal
                        open={selectedId === tx.id}
                        onOpenChange={setSelectedId}
                        tx={tx}
                      />
                    </React.Fragment>
                  ))}
                </div>
                {groupIdx < txHistory.length - 1 && (
                  <Separator className="my-6" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
