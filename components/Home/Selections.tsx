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
import { Suspense } from "react";

const SelectionsContent = () => {
  const { activeCategory } = useCategory();
  const params = useSearchParams();
  const searchTerm = params.get("search");
  // console.log("Search Params:", searchTerm);

  const { data: results, isLoading } = useSearch(searchTerm || "");
  const showDefaultView = !activeCategory && !searchTerm;
  const showCategoryView = !searchTerm && !isLoading;

  return (
    <>
      {searchTerm && (
        <section className="">
          <h3 className="mb-6.5">Results for {searchTerm}</h3>
          {isLoading && <Loading count={6} title />}
          {!isLoading && results ? (
            <p className="">No Results Found for {searchTerm}</p>
          ) : (
            <p>Here is your data for now/</p>
          )}
        </section>
      )}

      {showDefaultView && (
        <div>
          <HotPicks />
          <Promotions />
          <Reastaurants />
        </div>
      )}

      {showCategoryView && (
        <section className="mt-1">
          {activeCategory === "Restaurants" && <RestaurantsSelection />}
          {activeCategory === "Groceries" && <GroceriesSelection />}
          {activeCategory === "Markets" && <MarketsSelection />}
        </section>
      )}
    </>
  );
};

const Selections = () => (
  <Suspense>
    <SelectionsContent />
  </Suspense>
);

export default Selections;
