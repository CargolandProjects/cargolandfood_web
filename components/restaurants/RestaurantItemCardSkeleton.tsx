import { Skeleton } from "@/components/ui/skeleton";

const RestaurantItemCardSkeleton = () => {
  return (
    <div
      className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-[138px] relative"
    >
      {/* Left image area */}
      <div className="w-[138px] h-full shrink-0 relative">
        <Skeleton className="w-full h-full rounded-l-2xl" />
      </div>

      {/* Right content area */}
      <div className="grow p-4 flex flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-8 rounded-[8px]" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantItemCardSkeleton;
