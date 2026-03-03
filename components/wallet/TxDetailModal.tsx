import { Separator } from "@radix-ui/react-separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {  formatDateWCommaB, formatTime } from "@/lib/utils";
import { TransactionRecord } from "@/lib/services/wallet.service";

interface TxDetailModalProps {
  open: boolean;
  onOpenChange: (id: string | null) => void;
  tx: TransactionRecord;
}

const TxDetailModal = ({ open, onOpenChange, tx }: TxDetailModalProps) => {
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(null)}>
      <DialogContent className="dialog pb-4.5!">
        <DialogHeader className="dialog-t">
          <DialogTitle className="dialog-title font-bold!">
            Transaction Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3">
          <div className="space-y-3">
            <p className="text-neutral-600 text-base leading-5">Description</p>
            <p className="text-base font-medium ">{tx.description || tx.type}</p>
          </div>

          <Separator className="mt-3 mb-6" />

          <div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-neutral-600">Amount</span>
                <span
                  className={`whitespace-nowrap text-sm font-medium ${
                    tx.type === "DEBIT"
                      ? "text-cargo-error"
                      : "text-cargo-success"
                  }`}
                >
                  {tx.type === "DEBIT" ? "-" : ""}₦{Number(tx.amount).toLocaleString()}
                </span>
              </div>
              <span
                className={`${
                  tx.status === "SUCCESS"
                    ? "border-[#027A48] text-[#054825] bg-[#E5F8EE]"
                    : "border-red-600 text-red-800 bg-cargo-error/10"
                } px-3 py-1.25 h-fit border rounded-xl text-xxs font-medium leading-3`}
              >
                {tx.status === "SUCCESS" ? "Successful" : "Failed"}
              </span>
            </div>
            <div className="mt-6 flex justify-between">
              <div className="flex flex-col">
                <span className="text-neutral-600">Date</span>
                <span className="font-medium">
                  {formatDateWCommaB(tx.createdAt)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-600">Time</span>
                <span className="font-medium">{formatTime(tx.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TxDetailModal;
