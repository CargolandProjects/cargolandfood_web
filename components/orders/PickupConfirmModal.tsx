import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface PickupConfirmProps {
  open: boolean;
  onOpenChange: (close: boolean) => void;
  onConfirm: () => void;
}

const PickupConfirmModal = ({
  open,
  onOpenChange,
  onConfirm,
}: PickupConfirmProps) => {
  const handleClick = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-100! gap-0 m-0 p-0 px-7 pt-[70px] overflow-auto max-h-[95vh] hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="dialog-title ">Confirm Order?</DialogTitle>
        </DialogHeader>

        <p className="text-base leading-5 mt-3 max-w-[287px] text-neutral-600 text-center mx-auto">
          You’ve selected the pickup option, you’ll have to pick up your meal
          from the restaurant.
        </p>

        <div className="mt-6 flex gap-3 mb-10">
          <Button
            variant="outline"
            className="submit-btn flex-1 hover:bg-gray-50 text-neutral-500 border-neutral-300"
          >
            No, Cancel
          </Button>
          <Button onClick={handleClick} className="submit-btn flex-1">
            Yes, Place Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PickupConfirmModal;
