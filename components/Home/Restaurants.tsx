import MenuItemCard from "../MenuItemCard";
import { useRestaurants } from "@/lib/hooks/queries/useRestaurants";
import Loading from "../Loading";

const Restaurants = () => {
  const { data, isLoading } = useRestaurants();
  return (
    <section className="my-10">
      {isLoading && <Loading count={6} title />}

      {!isLoading && data?.length && (
        <div>
          <h3 className="mb-6.5">Restaurants</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((menuItem) => (
              <MenuItemCard menuItem={menuItem} key={menuItem.id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Restaurants;
