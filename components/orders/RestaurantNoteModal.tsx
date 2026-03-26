import { memo } from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useUpdateCheckout } from "@/lib/hooks/mutations/useUpdateCheckout";
import { DeliveryType } from "@/lib/services/cart.service";
import { toast } from "sonner";
import { RiLoader2Line } from "react-icons/ri";

interface RiderNoteProps {
  open: boolean;
  vendorId: string;
  deliveryType: DeliveryType;
  onOpenChange: (close: boolean) => void;
}

const RestaurantNoteModal = ({
  open,
  onOpenChange,
  vendorId,
  deliveryType,
}: RiderNoteProps) => {
  const { mutate, isPending } = useUpdateCheckout();
  const [msg, setMsg] = useState("");
  const maxLength = 200;

  const handleMessage = () => {
    if (!msg.trim()) {
      toast.error("You didn't add a note");
      return;
    }
    // if (!vendorId) return;

    mutate(
      {
        vendorId,
        payload: { deliveryType, noteToRestaurant: msg },
      },
      {
        onError: (error) => {
          toast.error(error.message || "Failed to send note");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog pt-6! pb-5! sm:pt-[74px]! px-4! sm:px-7!">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-2xl font-medium leading-6 sm:leading-8 text-left sm:text-center">
            Note for restaurant
          </DialogTitle>
        </DialogHeader>

        <div className="relative pt-4 sm:pt-8">
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="p-3 w-full rounded-xl border border-neutral-300 h-[136px] sm:h-[167px] max-h-[136px] sm:max-h-[167px] hide-scrollbar"
            placeholder="Add a note for the restaurant"
            maxLength={maxLength}
          ></textarea>

          <span className="absolute right-3 bottom-3 text-neutral-500 text-xs font-medium">
            {msg.length}/{maxLength}
          </span>
        </div>
        <Button onClick={handleMessage} className="submit-btn mt-8.5 sm:mt-6.5">
          {isPending ? (
            <RiLoader2Line className="size-5 animate-spin" />
          ) : (
            "Confirm"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default memo(RestaurantNoteModal);
