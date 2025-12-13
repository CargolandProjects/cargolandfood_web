"use client";

import { usePromotions } from "@/lib/hooks/queries/usePromotions";
import MarketCard from "../MarketCard";
import MenuItemCardSkeleton from "../MenuItemCardSkeleton";

const MarketsSelection = () => {
  const { data, isLoading } = usePromotions();

  if (isLoading) {
    return (
      <section className="my-10">
        <h3 className="mb-6.5">Featured</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <MenuItemCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="my-10">
      <h3 className="mb-6.5">Featured</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {data?.featured.map((item) => (
          <MarketCard key={item.id} menuItem={item} />
        ))}
      </div>

      <h3 className="mb-6.5 mt-10">Markets</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {data?.discount.map((item) => (
          <MarketCard key={item.id} menuItem={item} />
        ))}
      </div>
    </section>
  );
};

export default MarketsSelection;