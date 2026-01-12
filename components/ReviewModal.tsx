"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { user1 } from "@/assets/images";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { ScrollArea } from "./ui/scroll-area";

interface Review {
  id: number;
  date: string;
  title: string;
  rating: number;
  content: string;
  avatar: string;
}

interface ReviewsModalProps {
  open: boolean;
  onClose: (close: boolean) => void;
}

const reviews: Review[] = [
  {
    id: 1,
    date: "29/08/2025",
    title: "Good food",
    rating: 5,
    content:
      "Their food is so tasty & delicious. My lunch was delivered to my place in no time. Thanks for your great service.",
    avatar: user1.src,
  },
  {
    id: 2,
    date: "29/08/2025",
    title: "Awesome and nice",
    rating: 4.5,
    content: "Food was so good. Breakfast was fasty delivered to my place.",
    avatar: user1.src,
  },
  {
    id: 3,
    date: "29/08/2025",
    title: "Great meal",
    rating: 4,
    content: "Food was so good. Breakfast was fasty delivered to my place.",
    avatar: user1.src,
  },
  {
    id: 4,
    date: "29/08/2025",
    title: "Awesome and nice",
    rating: 4.5,
    content: "Food was so good. Breakfast was fasty delivered to my place.",
    avatar: user1.src,
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <RiStarFill key={i} className="size-[15px] text-cargo-accent" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <RiStarLine className="size-[15px] text-cargo-accent" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <RiStarFill className="size-[15px] text-cargo-accent" />
          </div>
        </div>
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <RiStarLine
          key={`empty-${i}`}
          className="size-[15px] text-cargo-accent "
        />
      ))}
    </div>
  );
}

export default function ReviewsModal({ open, onClose }: ReviewsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="dialog p-0!">
        <DialogHeader className="mt-13.5 sm:mt-[74px]">
          <DialogTitle className="dialog-title max-sm:text-lg! max-sm:leading-6! ">Reviews</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[486px] mt-4 sm:mt-7 px-7">
          <div className="space-y-4 sm:space-y-6 py-1">
            {reviews.map((review) => (
              <div key={review.id} className="flex gap-2.5">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={review.avatar || "/placeholder.svg"}
                    alt="User avatar"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div className="flex-1 bg-neutral-700 rounded-button px-4 pt-2.5 pb-6">
                  <p className="text-xs">{review.date}</p>
                  <h3 className="text-sm font-medium mb-0.5 leading-5 mt-0.5">
                    {review.title}
                  </h3>
                  <StarRating rating={review.rating} />
                  <p className="text-xs text-neutral-600 mt-3">
                    {review.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
