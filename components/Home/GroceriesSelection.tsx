"use client";

import { useState } from "react";
import { usePromotions } from "@/lib/hooks/queries/usePromotions";
import VendorCardSkeleton from "../VendorCardSkeleton";
import FilterBar from "../FilterBar";
import VendorCard from "../VendorCard";

const GroceriesSelection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data, isLoading } = usePromotions();

  const filters = [
    { label: "All Shops", value: "all" },
    { label: "Drinks", value: "drinks" },
    { label: "Supermarkets", value: "supermarkets" },
    { label: "Depots", value: "depots" },
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
              <VendorCard key={item.id} menuItem={item} route="groceries" />
            ))}
          </div>

          <h3 className="mb-6.5 mt-10">Drinks</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.featured.map((item) => (
              <VendorCard key={item.id} menuItem={item} route="groceries" />
            ))}
          </div>

          <h3 className="mb-6.5 mt-10">Supermarkets</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.featured.map((item) => (
              <VendorCard key={item.id} menuItem={item} route="groceries" />
            ))}
          </div>

          <h3 className="mb-6.5 mt-10">Depots</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.featured.map((item) => (
              <VendorCard key={item.id} menuItem={item} route="groceries" />
            ))}
          </div>
        </div>
      )}

      {activeFilter === "drinks" && (
        <div>
          <h3 className="mb-6.5 mt-6">Drinks</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.featured.map((item) => (
              <VendorCard key={item.id} menuItem={item} route="groceries" />
            ))}
          </div>
        </div>
      )}

      {activeFilter === "supermarkets" && (
        <div>
          <h3 className="mb-6.5 mt-6">Supermarkets</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.featured.map((item) => (
              <VendorCard key={item.id} menuItem={item} route="groceries" />
            ))}
          </div>
        </div>
      )}

      {activeFilter === "depots" && (
        <div>
          <h3 className="mb-6.5 mt-6">Depots</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data?.featured.map((item) => (
              <VendorCard key={item.id} menuItem={item} route="groceries" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GroceriesSelection;
