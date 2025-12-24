"use client";

import { useState } from "react";
import { usePromotions } from "@/lib/hooks/queries/usePromotions";
import VendorCardSkeleton from "../VendorCardSkeleton";
import FilterBar from "../FilterBar";
import VendorCard from "../VendorCard";

const RestaurantsSelection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data, isLoading } = usePromotions();

  const filters = [
    { label: "All Vendors", value: "all" },
    { label: "Fast Delivery", value: "fast" },
    { label: "Best Prices", value: "prices" },
  ];

  if (isLoading) {
    return (
      <section className="my-10">
        <h3 className="mb-6.5">Featured</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <VendorCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="my-10">
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {activeFilter === "all" && (
        <div>
          <h3 className="mb-6.5 mt-6">Featured</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.featured.map((item) => (
              <VendorCard key={item.id} menuItem={item} />
            ))}
          </div>

          <h3 className="mb-6.5 mt-10">Fast Delivery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.featured.map((item) => (
              <VendorCard key={item.id} menuItem={item} />
            ))}
          </div>

          <h3 className="mb-6.5 mt-10">Best Prices</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.discount.map((item) => (
              <VendorCard key={item.id} menuItem={item} />
            ))}
          </div>
        </div>
      )}

      {activeFilter === "fast" && (
        <div>
          <h3 className="mb-6.5 mt-6">Fast Delivery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.featured.map((item) => (
              <VendorCard key={item.id} menuItem={item} />
            ))}
          </div>
        </div>
      )}

      {activeFilter === "prices" && (
        <div>
          <h3 className="mb-6.5 mt-6">Best Prices</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.discount.map((item) => (
              <VendorCard key={item.id} menuItem={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default RestaurantsSelection;