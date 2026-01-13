import VendorCard from "../VendorCard";
// import { useRestaurants } from "@/lib/hooks/queries/useRestaurants";
import Loading from "../LoadingSkeleton";
import { useVendors } from "@/lib/hooks/queries/useVendors";
// import { Vendor } from "@/lib/services/vendors.service";
// import { useState } from "react";

const Restaurants = () => {
  const { data, isLoading } = useVendors();
  // const [restaurants, setRestaurants] = useState<Vendor[]>([]);
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
      {!isLoading && restaurants.length > 0 && (
        <div>
          <h3>Restaurants</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-2 section-y">
            {restaurants.map((vendor) => (
              <VendorCard vendor={vendor} key={vendor.id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Restaurants;
