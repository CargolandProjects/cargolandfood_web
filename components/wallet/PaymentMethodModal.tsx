import {
  RiArrowRightSLine,
  RiBankCardFill,
  RiLoader2Line,
} from "react-icons/ri";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { IconType } from "react-icons";
import { Separator } from "../ui/separator";
import { useFundWallet } from "@/lib/hooks/mutations/useFundWallet";
import { useState } from "react";
import { toast } from "sonner";
// import { useState } from "react";

interface PaymentMethodModalProps {
  amount: string;
}

interface PaymentOptions {
  title: string;
  icon: IconType;
  method: PaymentMethod;
}
type PaymentMethod = "digitalTransfer" | "BankTransfer" | "USSD";

const paymentOptions: PaymentOptions[] = [
  {
    title: "Digital Transfer",
    icon: RiBankCardFill,
    method: "digitalTransfer",
  },
  // {
  //   title: "Bank Transfer",
  //   icon: RiBankFill,
  //   method: "BankTransfer",
  // },
  // {
  //   title: "USSD",
  //   icon: RiSmartphoneFill,
  //   method: "USSD",
  // },
];

const PaymentMethodModal = ({ amount }: PaymentMethodModalProps) => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("digitalTransfer");

  const { mutate, isPending } = useFundWallet();

  console.log(`Payment Method "${paymentMethod}" Selected`);

  const handleFunding = () => {
    if (!amount) return;
    mutate(
      { amount },
      {
        onSuccess: (res) => {
          const authUrl = res.data.authorization_url;

          if (!authUrl) {
            toast.error("Payment initiation failed");
            return;
          }
          //Navigate to payment gateway url
          window.location.href = authUrl;
        },
      }
    );
  };

  return (
    <>
      <DialogHeader className="dialog-t gap-2">
        <DialogTitle className="dialog-title font-bold!">
          Payment Method
        </DialogTitle>
      </DialogHeader>

      <Separator className="mt-2 mb-5" />

      <div className="h-full flex-1 flex flex-col justify-between">
        <div className="grid gap-2.5">
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

        {/* <Button
          variant="ghost"
          className="flex justify-between items-center p-0! h-fit py-1! w-full"
        >
          <div className="flex gap-2 items-center">
            <RiBankCardFill className="size-6 text-primary" />
            <p className="text-base leading-5">Digital Transfer</p>
          </div>
          <RiArrowRightSLine className="size-6" />
        </Button> */}

        <div className="mt-6 mx-2">
          <Button
            onClick={handleFunding}
            className=" submit-btn"
            disabled={isPending}
          >
            {isPending ? (
              <RiLoader2Line className="size-5 animate-spin" />
            ) : (
              "   Make Payment"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodModal;
