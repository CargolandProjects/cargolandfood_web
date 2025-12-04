import { Skeleton } from "@/components/ui/skeleton";

const MenuItemCardSkeleton = () => {
  return (
    <div className="w-full">
      {/* Image skeleton */}
      <div className="relative w-full h-[114px] overflow-hidden rounded-md">
        <Skeleton className="w-full h-full" />
        {/* Discount badge skeleton */}
        <div className="absolute top-3 left-3 rounded-full flex justify-center items-center gap-1 py-1 px-2">
          <Skeleton className="size-3 rounded-full" />
          <Skeleton className="w-8 h-3" />
        </div>
      </div>
      
      <div className="mt-2.5">
        {/* Title and heart skeleton */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="size-6 rounded-full" />
        </div>
        
        {/* Rating and delivery info skeleton */}
        <div className="mt-1 flex gap-3 md:gap-4">
          {/* Rating skeleton */}
          <div className="flex justify-center items-center gap-1">
            <Skeleton className="size-5.5 rounded-full" />
            <Skeleton className="w-6 h-4" />
          </div>
          
          {/* Delivery fee skeleton */}
          <div className="flex justify-center items-center gap-1">
            <Skeleton className="size-5.5 rounded-full" />
            <Skeleton className="w-8 h-4" />
          </div>
          
          {/* Delivery time skeleton */}
          <div className="flex justify-center items-center gap-1">
            <Skeleton className="size-5.5 rounded-full" />
            <Skeleton className="w-12 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCardSkeleton;