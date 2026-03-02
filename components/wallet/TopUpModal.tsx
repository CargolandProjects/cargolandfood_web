import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import AmountModal from "./AmountModal";
import PaymentMethodModal from "./PaymentMethodModal";

interface TopupModalProps {
  open: boolean;
  onOpenChange: (close: boolean) => void;
  balance: string | undefined;
  amount: string;
  setAmount: (amount: string) => void;
}

export type TopUpStep = "setAmount" | "paymentMethod";

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

      case "paymentMethod":
        return <PaymentMethodModal amount={amount} />;
    }
  };

  const handleClose = (v: boolean) => {
    setCurrentStep("setAmount");
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => handleClose(v)}>
      <DialogContent className="dialog pb-4.5! flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.1 }}
            className="flex-1 flex flex-col"
          >
            {Step()}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpModal;
