import { memo } from "react";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import success from "@/assets/gifs/success.gif";
import { Button } from "../ui/button";

interface CouponSuccessProps {
  open: boolean;
  onOpenChange: (close: boolean) => void;
}

const CouponSuccessModal = ({ open, onOpenChange }: CouponSuccessProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]! max-sm:w-[95vw] gap-0 p-0 px-6 sm:px-7 pt-12 sm:py-4.5 pb-11 m-09">
        <div className="size-[124px] sm:size-[180px] self-center justify-self-center">
          <img src={success.src} alt="coupon added " className="size-full " />
        </div>
        <DialogTitle className="text-center font-bold text-2xl leading-8 mt-3">
          Coupon Added
        </DialogTitle>
        <DialogFooter>
          <DialogClose className="mt-[52px] w-full">
            <Button className="submit-btn">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CouponSuccessModal);
