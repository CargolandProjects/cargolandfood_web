import MenuItemCardSkeleton from "./MenuItemCardSkeleton";
import { Skeleton } from "./ui/skeleton";

const Loading = ({
  count = 4,
  title = false,
}: {
  count?: number;
  title?: boolean;
}) => (
  <div className="space-y-6">
    {title && <Skeleton className="w-30 h-4" />}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MenuItemCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default Loading;
