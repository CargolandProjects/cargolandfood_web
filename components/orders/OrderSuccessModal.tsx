import { memo } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import success from "@/assets/gifs/success.gif";
import { RiTimeLine } from "react-icons/ri";
import { Button } from "../ui/button";

interface OrderSuccessfulProps {
  open: boolean;
  onOpenChange: (close: boolean) => void;
}


const OrderSuccessModal = ({ open, onOpenChange }: OrderSuccessfulProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-100! max-sm:w-[95vw] p-0 px-6 sm:px-9 gap-0 mt-8 rounded-2xl">
        <div className="size-[124px] sm:size-[180px] self-center justify-self-center mt-14 sm:mt-8
        
        ">
          <img src={success.src} alt="coupon added " className="size-full " />
        </div>
        
        <div className="mt-3 sm:mt-1 flex flex-col justify-center items-center gap-3">
          <DialogTitle className="dialog-title max-sm:text-xl! max-sm:leading-7! font-bold! max-w-[200px]">
            Yay! Your Order <br className="sm:hidden" /> has been placed.
          </DialogTitle>
          <p className="max-w-[260px] text-base leading-5 text-center">
            Your order would be delivered in 20 mins at most
          </p>
          <div className="flex justify-between w-full sm:max-w-[287px]">
            <div className="flex gap-2 items-center">
              <RiTimeLine className="size-5" />
              <p className="leading-4.5">Estimated Time</p>
            </div>
            <p className="text-base font-medium ">20mins</p>
          </div>
        </div>

        <div className="mt-13 flex gap-2 mb-6 sm:mb-8">
          <Button
            variant="outline"
            className="submit-btn flex-1 hover:bg-gray-50 text-neutral-500 border-neutral-300"
          >
            Cancel Orders
          </Button>
          <Button className="submit-btn flex-1">Order Details</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(OrderSuccessModal);
