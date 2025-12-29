import { Skeleton } from "@/components/ui/skeleton";

const ChipSkeleton = () => <Skeleton className="h-9 w-24 rounded-full" />;

const GroceriesPageSkeleton = () => {
  return (
    <div className="flex gap-10 h-full">
      {/* Main column */}
      <div className="w-full max-w-[1006px] mx-auto flex-1">
        {/* Back button */}
        <div className="pl-2 py-1 w-48">
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Header image + actions */}
        <div className="relative bg-white mt-2">
          <div className="relative h-48 md:h-[274px] w-full overflow-hidden rounded-xl">
            <Skeleton className="w-full h-full rounded-xl" />

            <div className="absolute top-6 right-6 flex gap-2.5">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="size-10 rounded-full" />
            </div>
          </div>

          {/* Title + stats */}
          <div className="py-10 bg-white space-y-3">
            <Skeleton className="h-8 w-64" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="sticky -top-4 z-10 pb-10">
          <div className="flex gap-4.5 max-w-[606px] h-11.5 justify-start overflow-x-auto hide-scrollbar">
            {Array.from({ length: 6 }).map((_, i) => (
              <ChipSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Items grid (groceries layout is 2/3 columns vs restaurant's 2 columns) */}
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-15">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="max-w-[277px] w-full h-[167px] flex flex-col justify-end rounded-2xl cursor-default relative"
              >
                {/* Floating image */}
                <div className="w-[139px] h-[93px] mx-auto rounded-lg overflow-hidden absolute top-0 z-30 right-1/2 transform translate-x-1/2">
                  <Skeleton className="w-full h-full" />
                </div>

                {/* Trapezium card base */}
                <div className="card-shadow">
                  <div className="space-y-0.75 flex flex-col justify-end px-5.5 trapezium-card h-[111px] pb-3">
                    <div className="pt-[182.5px]">
                      <Skeleton className="h-4 w-40 mb-2" />
                      <div className="flex justify-between items-center mt-1.5">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-7 w-7 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* No right sidebar while loading to avoid narrowing */}
    </div>
  );
};

export default GroceriesPageSkeleton;
