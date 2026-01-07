import { memo } from "react";
import React from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import success from "@/assets/gifs/success.gif";
import { Button } from "../ui/button";

interface CouponSuccessProps {
  open: boolean;
  onOpenChange: (close: boolean) => void;
}


const CouponSuccessModal = ({ open, onOpenChange }: CouponSuccessProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-7 max-w-[400px]! gap-0">
        <div className="size-[180px] self-center justify-self-center ">
          <img src={success.src} alt="coupon added " className="size-full " />
        </div>
        <DialogTitle className="text-center font-bold text-2xl leading-8 mt-1">
          Coupon Added
        </DialogTitle>
        <DialogFooter >
          <DialogClose className="mt-[52px] w-full">
            <Button className="submit-btn">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CouponSuccessModal);
