import VendorCard from "../vendor/VendorCard";
import Loading from "../LoadingSkeleton";
import { useVendors } from "@/lib/hooks/queries/useVendors";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
// import ErrorStateUi from "../ErrorStateUi";

const Restaurants = () => {
  const { zoneId } = useActiveZone();
  const { data, isLoading, isSuccess } = useVendors(zoneId || "");

  const restaurants = (data?.vendors || []).filter(
    (vendor) => vendor.businessCategory === "Restaurant"
  );

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
      {isSuccess && restaurants.length === 0 && (
        <p className="text-neutral-500 text-left sm:text-center">
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
        </div>
      )}
    </section>
  );
};

export default Restaurants;
