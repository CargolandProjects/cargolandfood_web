import VendorCard from "../VendorCard";
import { useRestaurants } from "@/lib/hooks/queries/useRestaurants";
import Loading from "../LoadingSkeleton";

const Restaurants = () => {
  const { data, isLoading } = useRestaurants();

  if (isLoading) {
    return (
      <section className="my-6 sm:my-10 ">
        <Loading count={4} title />
      </section>
    );
  }

  return (
    <section className="my-6 sm:my-10">
      {!isLoading && data?.length && (
        <div>
          <h3>Restaurants</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-2 section-y">
            {data.map((menuItem) => (
              <VendorCard menuItem={menuItem} key={menuItem.id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Restaurants;
