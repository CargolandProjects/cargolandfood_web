import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import AmountModal from "./AmountModal";
import PaymentMethodModal from "./PaymentMethodModal";

interface TopupModalProps {
  open: boolean;
  onOpenChange: (close: boolean) => void;
  balance: number;
  amount: string;
  setAmount: (amount: string) => void;
}

export type TopUpStep = "setAmount" | "paymentMthod";

const TopUpModal = ({
  open,
  onOpenChange,
  setAmount,
  amount,
  balance,
}: TopupModalProps) => {
  const [currentStep, setCurrentStep] = useState<TopUpStep>("setAmount");
  const Step = () => {
    switch (currentStep) {
      case "setAmount":
        return (
          <AmountModal
            balance={balance}
            amount={amount}
            setAmount={setAmount}
            nextStep={setCurrentStep}
          />
        );

      case "paymentMthod":
        return <PaymentMethodModal amount={amount} />;
    }
  };

  const handleClose = (v: boolean) => {
    setCurrentStep("setAmount");
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => handleClose(v)}>
      <DialogContent className="dialog pb-4.5!">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.1 }}
          >
            {Step()}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpModal;
