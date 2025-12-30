import { cn } from "@/lib/utils";
import { TransactionGroup } from "./WalletPageContent";
import { useState } from "react";
import TxDetailModal from "./TxDetailModal";
import { formatPrettyDate } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface TransactionHistoryProps {
  transactions: TransactionGroup[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    const selected = id === selectedId ? null : id;
    setSelectedId(selected);
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base leading-6">Transaction History</h2>
        <button className="text-sm font-medium text-neutral-600 hover:underline underline-offset-2">
          See All
        </button>
      </div>

      <div className="mt-6">
        {transactions.map((group, groupIdx) => (
          <div key={group.month} className="space-y-">
            <h3 className="text-base font-normal text-neutral-600 leading-5">
              {group.month} 
            </h3>
            <div className="space-y-6 mt-6">
              {group.transactions.map((tx) => (
                <>
                  <div
                    onClick={() => handleSelect(tx.id)}
                    key={tx.id}
                    className="flex items-center justify-between hover:cursor-pointer"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="line-clamp-1 max-w-[300px] text-sm font-medium text-[#0A0D14]">
                        {tx.title}
                      </p>
                      <p className="text-xs text-[#868C98]">
                        {formatPrettyDate(tx.date)}
                      </p>
                    </div>
                    <span
                      className={`whitespace-nowrap text-sm font-medium" ${
                        tx.type === "expense"
                          ? "text-cargo-error"
                          : "text-cargo-success"
                      }`}
                    >
                      {tx.type === "expense" ? "-" : ""}₦
                      {tx.amount.toLocaleString()}
                    </span>
                  </div>
                  <TxDetailModal
                    open={selectedId === tx.id}
                    onOpenChange={setSelectedId}
                    tx={{ ...tx }}
                  />
                </>
              ))}
            </div>
            {groupIdx < transactions.length - 1 && (
              <Separator className=" my-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
