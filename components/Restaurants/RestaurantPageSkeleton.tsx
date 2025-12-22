import { Skeleton } from "@/components/ui/skeleton";
import RestaurantItemCardSkeleton from "@/components/Restaurants/RestaurantItemCardSkeleton";

const ChipSkeleton = () => (
  <Skeleton className="h-9 w-24 rounded-full" />
);

const RestaurantPageSkeleton = () => {
  return (
    <div className="flex gap-10 h-full">
      <div className="w-full max-w-[1006px] mx-auto flex-1">
        {/* Back button */}
        <div className="pl-2 py-1 w-48">
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Header image + actions */}
        <div className="relative bg-white mt-2">
          <div className="relative h-48 md:h-[274px] w-full overflow-hidden rounded-xl">
            <Skeleton className="w-full h-full rounded-xl" />

            {/* Action buttons top-right */}
            <div className="absolute top-6 right-6 flex gap-2.5">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
            </div>
          </div>

          {/* Title + stats */}
          <div className="p-4 py-10 bg-white space-y-3">
            <Skeleton className="h-8 w-64" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="sticky -top-4 z-10 pb-10 px-4">
          <div className="flex gap-4.5 max-w-[606px] h-11.5 overflow-x-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <ChipSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Items grid */}
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-10">
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
