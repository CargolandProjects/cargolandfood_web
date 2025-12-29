import {
  RiArrowRightSLine,
  RiBankCardFill,
  RiBankFill,
  RiSmartphoneFill,
} from "react-icons/ri";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { IconType } from "react-icons";
import { Separator } from "../ui/separator";
import { useState } from "react";

interface PaymentMethodModalProps {
  amount: string;
}

interface PaymentOptions {
  title: string;
  icon: IconType;
  method: PaymentMethod;
}

type PaymentMethod = "debitCard" | "BankTransfer" | "USSD";

const PaymentMethodModal = ({ amount }: PaymentMethodModalProps) => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("debitCard");
  console.log(`Payment Method "${paymentMethod}" Selected`);
  
  const paymentOptions: PaymentOptions[] = [
    {
      title: "Use Debit Card",
      icon: RiBankCardFill,
      method: "debitCard",
    },
    {
      title: "Bank Transfer",
      icon: RiBankFill,
      method: "BankTransfer",
    },
    {
      title: "USSD",
      icon: RiSmartphoneFill,
      method: "USSD",
    },
  ];

  return (
    <>
      <DialogHeader className="dialog-t gap-2">
        <DialogTitle className="dialog-title font-bold!">
          Payment Method
        </DialogTitle>
      </DialogHeader>

      <Separator className="mt-2 mb-5" />

      <div>
        <div className="grid gap-[10px]">
          {paymentOptions.map((option, idx) => (
            <Button
              onClick={() => setPaymentMethod(option.method)}
              key={idx}
              variant="ghost"
              className="flex justify-between items-center p-0! h-fit py-1! "
            >
              <div className="flex gap-2 items-center">
                <option.icon className="size-6 text-primary" />
                <p className="text-base leading-5">{option.title}</p>
              </div>
              <RiArrowRightSLine className="size-6" />
            </Button>
          ))}
        </div>

        <div className="mt-6 mx-2">
          <Button
            //   onClick={() => nextStep("paymentMthod")}
            className=" submit-btn"
            //  disabled={isPending}
          >
            {/*}     {isPending ? (
                          <RiLoader2Line className="size-5 animate-spin" />
                        ) : ( */}
            Make Payment
            {/* )} */}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodModal;
