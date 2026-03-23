import VendorCard from "../vendor/VendorCard";
import Loading from "../vendor/LoadingSkeleton";
import { useVendors } from "@/lib/hooks/queries/useVendors";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";
// import ErrorStateUi from "../ErrorStateUi";

const Restaurants = () => {
  const { zoneId } = useActiveZone();
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVendors(zoneId || "");

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const restaurants = useMemo(() => {
    const allVendors = data?.pages.flatMap((page) => page.vendors) ?? [];
    return allVendors.filter((vendor) => vendor.businessCategory);
  }, [data?.pages]);

  if (isLoading) {
    return (
      <section className="my-6 sm:my-10 ">
        <Loading count={4} title />
      </section>
    );
  }

  return (
    <section className="my-6 sm:my-10">
      {/* {isError && (
        <div className="h-full flex justify-center items-center">
          <ErrorStateUi message="Error Getting Vendors " />
        </div>
      )} */}

      {!zoneId && (
        <p className="text-neutral-500 text-center">
          Please select your location
        </p>
      )}
      {isError && (
        <p className="text-red-400 text-center pt-4">
          <span className="font-semibold">We couldn’t find vendors for your location.</span>
          <br /> Check your internet connection or refresh to try again.
        </p>
      )}
      {isSuccess && restaurants.length === 0 && (
        <p className="text-neutral-500 text-center">
          No vendors found for your current location
        </p>
      )}
      {isSuccess && restaurants.length > 0 && (
        <div>
          <h3>Restaurants</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-12 mt-2 section-y">
            {restaurants.map((vendor) => (
              <VendorCard
                vendor={vendor}
                key={vendor.id}
                vendorId={vendor.id}
                source="homepage"
              />
            ))}
          </div>

          {/* Intersection observer trigger */}
          <div ref={ref} className=" flex items-center justify-center">
            {isFetchingNextPage && (
              <div className="text-neutral-500 py-7">
                Loading more restaurants...
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Restaurants;
