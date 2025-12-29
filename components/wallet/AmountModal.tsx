import React, { ChangeEvent } from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AmountModalProps {
  balance: number;
  amount: string;
  setAmount: (amount: string) => void;
}

const AmountModal = ({
  balance,
  amount,
  setAmount,
}: AmountModalProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // console.log("This is the value:", value);
    if (value === "" || /^\d+$/.test(value)) setAmount(value);
  };

  return (
    <div className="">
      <DialogHeader className="dialog-t gap-2">
        <DialogTitle className="dialog-title font-bold!">
          Top Up Wallet
        </DialogTitle>
        <DialogDescription className="text-base font-normal leading-5 text-center">
          Wallet Balance: ₦{balance.toLocaleString()}
        </DialogDescription>
      </DialogHeader>
      <div className="mt-5">
        <p className="leading-5">Amount to Top-Up</p>

        <div className="h-11 mt-1 relative">
          <div className="w-9.5 h-full flex items-center justify-between absolute left-0 top-1/2 transform -translate-y-1/2">
            {/* Naira SVG */}
            <div className="flex-1 flex justify-center items-center">
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.72777 17.1362V11.0402H-0.000234358V9.43223H1.72777V7.53623H-0.000234358V5.92823H1.72777V0.000229359H4.60777L6.76777 5.92823H9.40777V0.000229359H11.5198V5.92823H13.2478V7.53623H11.5198V9.43223H13.2478V11.0402H11.5198V17.1362H8.63977L6.45577 11.0402H3.83977V17.1362H1.72777ZM3.83977 9.43223H5.90377L5.23177 7.53623H3.79177L3.83977 9.43223ZM9.43177 13.6562H9.52777L9.45577 11.0402H8.54377L9.43177 13.6562ZM3.76777 5.92823H4.67977L3.76777 3.14423H3.67177L3.76777 5.92823ZM7.99177 9.43223H9.45577L9.40777 7.53623H7.31977L7.99177 9.43223Z"
                  fill="#868C98"
                />
              </svg>
            </div>
            {/* Vertical Separator */}
            <div className=" h-[70%] relative w-px bg-neutral-300" />
          </div>

          <Input
            value={amount}
            onChange={handleChange}
            className="form-input h-full pl-12.5"
          />
        </div>
        <Button
          //    onClick={handleDelete}
          type="submit"
          className=" submit-btn mt-6"
          //  disabled={isPending}
        >
          {/*}     {isPending ? (
                          <RiLoader2Line className="size-5 animate-spin" />
                        ) : ( */}
          Confirm Amount
          {/* )} */}
        </Button>
      </div>
    </div>
  );
};

export default AmountModal;
