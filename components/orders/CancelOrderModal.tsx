import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { sadFace } from "@/assets/images";
import { RiErrorWarningFill } from "react-icons/ri";
import Image from "next/image";

interface CancelOrderModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const CancelOrderModal = ({ open, onOpenChange }: CancelOrderModalProps) => {
  const [msg, setMsg] = useState("");
  const maxLength = 200;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog flex flex-col">
        <DialogHeader className="gap-7.5">
          <DialogTitle className="dialog-title mt-[74px] flex items-center justify-center">
            We are sorry to hear this{" "}
            <span className="relative size-5 inline-block ml-1.5">
              <Image
                src={sadFace.src}
                alt="sad face icon"
                className="size-full object-cover"
                fill
              />
            </span>
          </DialogTitle>
          <DialogDescription className="text-base leading-5 text-center">
            Tell us why you choose to cancel your order, is the reason from our
            side?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 sm:mt-8">
          <div className="relative">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="p-3 w-full rounded-xl border border-neutral-300 h-[136px] sm:h-[167px] min-h-[66px] max-h-[136px] sm:max-h-[167px] hide-scrollbar"
              placeholder="Write here"
              maxLength={maxLength}
            ></textarea>

            <span className="absolute right-3 bottom-3 text-neutral-500 text-xs font-medium">
              {msg.length}/{maxLength}
            </span>
          </div>
          <p className="text-neutral-500 flex items-center leading-5 gap-1 mt-1 .5">
            <RiErrorWarningFill className="size-4 " />
            Write down your reason to cancel your order
          </p>
        </div>
        <div className="mx-2">
          <Button className="submit-btn mt-8.5 sm:mt-8">Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderModal;
