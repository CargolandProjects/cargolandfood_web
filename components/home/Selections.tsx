"use client";

import { useCategory } from "@/contexts/CategoryContext";
import RestaurantsSelection from "./RestaurantsSelection";
import GroceriesSelection from "./GroceriesSelection";
import MarketsSelection from "./MarketsSelection";
import HotPicks from "./HotPicks";
import Promotions from "../Promotions";
import Reastaurants from "./Restaurants";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchVendorMenu } from "@/lib/hooks/queries/useSearch";
import { Suspense } from "react";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
import { getCategoryPath } from "@/lib/utils";
import RestaurantItemCardSkeleton from "../vendor/VendorItemCardSkeleton";
import VendorItemCardA from "../vendor/VendorItemCardA";

const SelectionsContent = () => {
  const { activeCategory } = useCategory();
  const { zoneId } = useActiveZone();
  const params = useSearchParams();
  const searchTerm = params.get("search");
  const router = useRouter();
  // console.log("Search Params:", searchTerm);

  const {
    data: products,
    isLoading,
    isSuccess,
  } = useSearchVendorMenu(zoneId, searchTerm);
  const showDefaultView = !activeCategory && !searchTerm;
  const showCategoryView = !searchTerm && !isLoading;

  const handleSelect = (vendorId: string, businessCategory: string) => {
    if (!vendorId && !businessCategory) return;

    router.push(`/${getCategoryPath(businessCategory)}/${vendorId}`);
  };

  return (
    <>
      {/* Search results section if search query is present */}
      {searchTerm && (
        <section className="">
          <h3 className="mb-4 sm:mb-6.5">Results for {searchTerm}</h3>
          {isLoading && (
            <div className="sm:px-4">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <RestaurantItemCardSkeleton key={i} />
                ))}
              </div>
            </div>
          )}

          {isSuccess && products.length === 0 && (
            <p className="">No Results Found for {searchTerm}</p>
          )}

          {isSuccess && products.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-10">
              {products.map((item) => (
                <VendorItemCardA
                  key={item.id}
                  menu={item}
                  isSearch
                  onNavigate={() =>
                    handleSelect(item.vendorId, item.vendor.businessCategory)
                  }
                />
              ))}
            </div>
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
