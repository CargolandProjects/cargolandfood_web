import { Skeleton } from "@/components/ui/skeleton";

const TransactionHistorySkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Month Group 1 */}
      <div className="space-y-3">
        {/* Month Header */}
        <Skeleton className="h-5 w-26" />

        {/* Transaction Items */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center justify-between py-2">
            {/* Left side: Description and Date */}
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-55" />
            </div>

            {/* Right side: Amount */}
            <Skeleton className="h-5 w-20" />
          </div>
        ))}
      </div>

      {/* Month Group 2 */}
      <div className="space-y-3">
        {/* Month Header */}
        <Skeleton className="h-5 w-26" />

        {/* Transaction Items */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center justify-between py-2">
            {/* Left side: Description and Date */}
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-55" />
            </div>

            {/* Right side: Amount */}
            <Skeleton className="h-5 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistorySkeleton;
