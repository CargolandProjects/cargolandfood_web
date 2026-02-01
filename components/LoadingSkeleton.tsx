import VendorCardSkeleton from "./VendorCardSkeleton";
import { Skeleton } from "./ui/skeleton";

interface LoadingProps {
  count?: number;
  title?: boolean;
  scroll?: boolean;
}

const LoadingSkeleton = ({
  count = 4,
  title = false,
  scroll = false,
}: LoadingProps) => (
  <div>
    {title && <Skeleton className="w-25 sm:w-30 h-3 md:h-4" />}
    <div
      className={` gap-4 md:gap-6 mt-2 sm:mt-6.5 ${
        scroll
          ? "flex overflow-x-auto hide-scrollbar "
          : "grid sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <VendorCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;
