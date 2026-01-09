import { memo } from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface RiderNoteProps {
  open: boolean;
  onOpenChange: (close: boolean) => void;
}

const RiderNoteModal = ({ open, onOpenChange }: RiderNoteProps) => {
  const [msg, setMsg] = useState("");
  const maxLength = 200;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pt-6 sm:pt-[74px] px-4 sm:px-7 max-w-[400px]! max-sm:w-[95vw] gap-0 m-0">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-2xl font-medium leading-6 sm:leading-8 text-left sm:text-center">
            Note for rider
          </DialogTitle>
        </DialogHeader>

        <div className="relative pt-4 sm:pt-8">
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="p-3 w-full rounded-xl border border-neutral-300 h-[136px] sm:h-[167px] max-h-[136px] sm:max-h-[167px] hide-scrollbar"
            placeholder="Please enter any special delivery instructions here."
            maxLength={maxLength}
          ></textarea>

          <span className="absolute right-3 bottom-3 text-neutral-500 text-xs font-medium">
            {msg.length}/{maxLength}
          </span>
        </div>
        <Button className="submit-btn mt-8.5 sm:mt-6.5">Confirm</Button>
      </DialogContent>
    </Dialog>
  );
};

export default memo(RiderNoteModal);
