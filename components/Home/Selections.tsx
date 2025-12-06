"use client";

import { useCategory } from "@/contexts/CategoryContext";
import RestaurantsSelection from "./RestaurantsSelection";
import GroceriesSelection from "./GroceriesSelection";
import MarketsSelection from "./MarketsSelection";
import HotPicks from "./HotPicks";
import Promotions from "../Promotions";
import Reastaurants from "./Restaurants";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/lib/hooks/queries/useSearch";
import Loading from "../Loading";

const Selections = () => {
  const { activeCategory } = useCategory();
  const params = useSearchParams();
  const searchTerm = params.get("search");

  console.log("Search Params:", searchTerm);

  const { data: results, isLoading } = useSearch(searchTerm || "");

  return (
    <>
      {searchTerm && (
        <section className="">
          <h3>Results for {searchTerm}</h3>
          {searchTerm && isLoading && <Loading count={6} title />}
          {searchTerm && !isLoading && results  && (
            <p className="">No Results Found for {searchTerm}</p>
          )}
        </section>
      )}

      {!activeCategory && !searchTerm && !isLoading && (
        <div>
          <HotPicks />
          <Promotions />
          <Reastaurants />
        </div>
      )}

      <section className="mt-1">
        {!searchTerm && !isLoading && activeCategory === "Restaurants" && (
          <RestaurantsSelection />
        )}
        {!searchTerm && !isLoading && activeCategory === "Groceries" && (
          <GroceriesSelection />
        )}
        {!searchTerm && !isLoading && activeCategory === "Markets" && (
          <MarketsSelection />
        )}
      </section>
    </>
  );
};

export default Selections;
