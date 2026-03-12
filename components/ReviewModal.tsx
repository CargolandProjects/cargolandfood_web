"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
// import { user1 } from "@/assets/images";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { ScrollArea } from "./ui/scroll-area";
import { useReviews } from "@/lib/hooks/queries/useReviews";
import ErrorStateUi from "./ErrorStateUi";
import Loader from "./Loader";
import { formatDMY } from "@/lib/utils";
import { useSession } from "@/lib/hooks/useSession";
import UnauthenticatedUi from "./UnauthenticatedUi";

interface ReviewsModalProps {
  open: boolean;
  onClose: (close: boolean) => void;
}

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

const getRatingTitle = (rating: number): string => {
  switch (true) {
    case rating < 1.0:
      return "Very Poor";
    case rating < 1.5:
      return "Poor";
    case rating < 2.0:
      return "Below Average";
    case rating < 2.5:
      return "Fair";
    case rating < 3.0:
      return "Average";
    case rating < 3.5:
      return "Good";
    case rating < 4.0:
      return "Very Good";
    case rating < 4.5:
      return "Great Meal";
    case rating < 5.0:
      return "Excellent";
    default:
      return "Outstanding Food 🍽️";
  }
};

export default function ReviewsModal({ open, onClose }: ReviewsModalProps) {
  const { isAuthenticated } = useSession();
  const {
    data: reviews = [],
    isLoading,
    isError,
    isSuccess,
  } = useReviews(isAuthenticated);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="dialog flex flex-col">
        <DialogHeader className="mt-13.5 sm:mt-[74px]">
          <DialogTitle className="dialog-title max-sm:text-lg! max-sm:leading-6! ">
            Reviews
          </DialogTitle>
        </DialogHeader>

        <div className={`h-[486px] ${isAuthenticated && "mt-4 sm:mt-7"}`}>
          {!isAuthenticated && (
            <UnauthenticatedUi description="You need to sign in before performing any action on Cargoland Food." />
          )}

          {isLoading && (
            <div className=" h-full flex justify-center items-center pb-12">
              <Loader size={12} />
            </div>
          )}

          {isError && (
            <div className="h-full flex justify-center items-center pb-12">
              <ErrorStateUi message="Error Fetching reviews " />
            </div>
          )}

          {isSuccess && (
            <ScrollArea className="h-full">
              {reviews.length === 0 && (
                <p className="text-sm text-neutral-600 text-center">
                  No reviews yet. Order and be the first!
                </p>
              )}

              {reviews.length > 0 && (
                <div className="space-y-4 sm:space-y-6 pt-1 mb-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="flex gap-2.5">
                      <Avatar className="size-10 shrink-0">
                        <AvatarImage
                          src={review.avatar || "/placeholder.svg"}
                          alt="User avatar"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 bg-neutral-100 rounded-button px-4 pt-2.5 pb-6">
                        <p className="text-xs">{formatDMY(review.createdAt)}</p>
                        <h3 className="text-sm font-medium mb-0.5 leading-5 mt-0.5 line-clamp-1">
                          {getRatingTitle(review.rating)}
                        </h3>
                        <StarRating rating={review.rating} />
                        <p className="text-xs text-neutral-600 mt-3">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
