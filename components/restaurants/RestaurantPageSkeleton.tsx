import { Skeleton } from "@/components/ui/skeleton";
import RestaurantItemCardSkeleton from "@/components/restaurants/RestaurantItemCardSkeleton";

const ChipSkeleton = () => (
  <Skeleton className="h-9 w-24 rounded-full" />
);

const RestaurantPageSkeleton = () => {
  return (
    <div className="flex gap-10 h-full">
      <div className="w-full flex-1">
        {/* Back button - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-4 w-full pl-2">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Mobile title */}
        <div className="sm:hidden mb-2">
          <Skeleton className="h-5 w-28" />
        </div>

        {/* Header image + actions */}
        <div className="relative mt-2">
          {/* Banner Image - Responsive heights */}
          <div className="relative h-25.5 sm:h-48 lg:h-[234px] xl:h-[284px] w-full overflow-hidden rounded-xl">
            <Skeleton className="w-full h-full rounded-xl" />

            {/* Action buttons top-right - Responsive sizing & positioning */}
            <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-2.5">
              <Skeleton className="size-8 sm:size-10 rounded-full" />
              <Skeleton className="size-8 sm:size-10 rounded-full" />
            </div>
          </div>

          {/* Title + stats - Responsive spacing */}
          <div className="my-3 sm:my-10 space-y-1 sm:space-y-3">
            <Skeleton className="h-6 sm:h-8 w-48 sm:w-64" />
            <div className="flex items-center gap-2 sm:gap-4">
              <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
              <Skeleton className="h-4 sm:h-5 w-20 sm:w-24" />
              <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
            </div>
          </div>
        </div>

        {/* Category tabs - Responsive padding */}
        <div className="sm:mb-10 sm:px-4">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto hide-scrollbar pb-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <ChipSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Items grid - Responsive grid & gaps */}
        <div className="sm:px-4 max-sm:mt-3 flex-1">
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <RestaurantItemCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPageSkeleton;
