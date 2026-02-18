import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { RiLoader2Line } from "react-icons/ri";
import { useSubmitReview } from "@/lib/hooks/mutations/useSubmitReview";
import { StarInput } from "@/components/ui/StarInput";
import { useUIStore } from "@/lib/stores/uiStore";

const ReviewOrderModal = () => {
  const [rating, setRating] = useState(0);
  const [comment, setcomment] = useState("");
  const open = useUIStore((s) => s.reviewOrder.open);
  const close = useUIStore((s) => s.closeReviewOrder);
  const payload = useUIStore((s) => s.reviewOrder.payload);
  const vendorId = payload?.vendorId;
  const { mutate: submitRevuew, isPending } = useSubmitReview();
  const maxLength = 200;

  const handleSubmitReview = () => {
    if (!vendorId || rating === 0) return;

    const payload = {
      vendorId: "08503157-05af-4d34-a5e5-fe9bf061dcf0",
      rating,
      comment,
    };

    console.log("payload :", payload);

    submitRevuew(payload, {
      onSuccess: () => {
        // onOpenChange(false);
        setRating(0); // Reset for next time
        setcomment("");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="dialog px-5! flex flex-col min-h-0!">
        <DialogHeader className="gap-2 sm:gap-7.5">
          <DialogTitle className="dialog-title max-sm:text-lg! max-sm:leading-6! mt-[74px] flex items-center justify-center">
            Did you like your order!
          </DialogTitle>
          <DialogDescription className="text-base leading-5 text-center">
            Please rate this order so we can work on your feedback!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 sm:mt-4 flex justify-center">
          <StarInput
            value={rating}
            onChange={setRating}
            size={46.56}
            disabled={isPending}
          />
        </div>

        <div className="relative mt-6 mx-[9.5px]">
          <textarea
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            className="p-3 w-full rounded-xl border border-neutral-300 h-[136px] sm:h-[135pxpx] min-h-[66px] max-h-[136px] sm:max-h-[135px] hide-scrollbar"
            placeholder="Add a Comment"
            maxLength={maxLength}
          ></textarea>

          <span className="absolute right-3 bottom-3 text-neutral-500 text-xs font-medium">
            {comment.length}/{maxLength}
          </span>
        </div>

        <Button
          onClick={handleSubmitReview}
          className={`submit-btn h-11! mt-4.5 mb-[37px] ${
            isPending ? "bg-primary" : "disabled:bg-neutral-300"
          } `}
          disabled={isPending || rating === 0}
        >
          {isPending ? (
            <RiLoader2Line className="size-5 animate-spin" />
          ) : (
            "Done"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewOrderModal;
