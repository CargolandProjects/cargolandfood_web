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
      <DialogContent className="pt-[74px] px-7 max-w-[400px]! gap-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium leading-8 text-center">
            Note for rider
          </DialogTitle>
        </DialogHeader>

        <div className="relative ">
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="p-3 w-full rounded-button border border-neutral-500 h-[167px] max-h-[167px]"
            placeholder="Please enter any special delivery instructions here."
            maxLength={maxLength}
          ></textarea>

          <span className="absolute right-3 bottom-3 text-neutral-500 text-xs font-medium">
            {msg.length}/{maxLength}
          </span>
        </div>
        <Button className="submit-btn -mt-1.5">Confirm</Button>
      </DialogContent>
    </Dialog>
  );
};

export default RiderNoteModal;
