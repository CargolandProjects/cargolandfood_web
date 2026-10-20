import { memo } from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useUpdateCheckout } from "@/lib/hooks/mutations/useUpdateCheckout";
import { DeliveryType } from "@/lib/services/cart.service";
import { toast } from "sonner";
import { RiLoader2Line } from "react-icons/ri";
import { X } from "lucide-react";

interface RiderNoteProps {
  open: boolean;
  vendorId: string;
  deliveryType: DeliveryType;
  initialMessage: string;
  onOpenChange: (close: boolean) => void;
}

const RestaurantNoteModal = ({
  open,
  onOpenChange,
  vendorId,
  deliveryType,
  initialMessage,
}: RiderNoteProps) => {
  const { mutate, isPending } = useUpdateCheckout();
  const [msg, setMsg] = useState(initialMessage);
  const maxLength = 200;

  const handleMessage = () => {
    if (!msg.trim()) {
      toast.error("You didn't add a note");
      return;
    }
    if (!vendorId) return;

    mutate(
      {
        vendorId,
        payload: { deliveryType, noteToRestaurant: msg },
      },
      {
        onSuccess: () => onOpenChange(false),
        onError: (error) => {
          toast.error(error.message || "Failed to send note");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="dialog min-h-auto! pt-6! pb-5! sm:pt-[73px]! px-4! sm:px-7!"
      >
        <DialogHeader>
          <DialogTitle className="text-base sm:text-2xl font-medium leading-6 sm:leading-8 text-left sm:text-center">
            Note for restaurant
          </DialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="absolute top-4.5 right-4.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
          >
            <X className="size-4" />
          </button>
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
