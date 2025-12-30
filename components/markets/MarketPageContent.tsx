"use client";

import { useGetRestaurant } from "@/lib/hooks/queries";
import { useCartStore } from "@/lib/stores/CartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MarketPageSkeleton from "./MarketPageSkeleton";
import RestaurantStats from "../RestaurantStats";
import CategoryTab from "../home/CategoryTab";
import { info } from "@/assets/svgs";
import { RiArrowGoBackLine, RiHeartFill } from "react-icons/ri";
import { shawarma } from "@/assets/images";
import MarketItemCard from "./MarketItemCard";
import { AnimatePresence, motion } from "framer-motion";
import FavouritesModal from "../FavouritesModal";
import Checkout from "../orders/CheckOut";
import ReviewsModal from "../ReviewModal";

const categories = [
  { name: "All" },
  { name: "Beers, Wines & Spirits" },
  { name: "Confectionaries" },
  { name: "Deodorant" },
];

const MarketPageContent = ({ id }: { id: string }) => {
  const [isActive, setIsActive] = useState("All");
  const [selectedId, setselectedId] = useState<string | null>(null);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const { data, isPending, error } = useGetRestaurant(id);
  const items = useCartStore((s) => s.items);
  const router = useRouter();

  const openCheckout = items.length > 0;
  console.log("Market page Id:", id);

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (id: string) => {
    setselectedId(id === selectedId ? null : id);
  };

  if (isPending) {
    return <MarketPageSkeleton />;
  }

  return (
    <div className="flex gap-10 h-full">
      <div
        className={`w-full ${
          openCheckout ? "max-w-[814px]" : "max-w-[1006px]"
        } mx-auto transitoin-all duration-300 flex-1`}
      >
        <button
          onClick={handleBack}
          className="flex items-center gap-4 text-sm w-full pl-2 hover:cursor-pointer"
        >
          <RiArrowGoBackLine className="size-3.5 text-gray-500" />
          <span className="text-xl font-medium">Markets & More</span>
        </button>
        {/* 1. Header Image and Info Section */}
        <div className="relative bg-white mt-2">
          {/* Banner Image */}
          <div className="relative h-48 md:h-[274px] w-full overflow-hidden rounded-xl">
            <img
              src={shawarma.src}
              alt="Market banner"
              className="w-full h-full object-cover rounded-xl md:object-[0px_-82px]"
              loading="lazy"
            />
            {/* Favourite and Comments */}
            <div className="absolute top-6 right-6 flex gap-2.5">
              <button
                onClick={() => setShowFavourites(true)}
                className="size-10 rounded-full bg-white flex justify-center items-center cursor-pointer"
              >
                <RiHeartFill className="size-6 text-gray-300" />
              </button>
              <button
                onClick={() => setShowReviews(true)}
                className="size-10 rounded-full bg-white flex justify-center items-center cursor-pointer"
              >
                <img
                  src={info.src}
                  alt="Info"
                  className="size-6 rounded-full object-cover"
                  loading="lazy"
                />
              </button>
            </div>
          </div>

          {/* Title and Stats */}
          <div className="py-10 bg-white">
            <h2 className="text-[32px] font-medium text-gray-900 mb-1 leading-10">
             St. Toby - Surulere
            </h2>
            <RestaurantStats rating={4.7} deliveryFee={0} deliveryTime="20 min" />
          </div>
        </div>

        {/* 2. Category Tabs */}
        <div className="sticky -top-4 z-10 pb-10">
          <div className="flex gap-4.5 max-w-[606px] h-11.5 justify-start overflow-x-auto hide-scrollbar">
            {categories.map(({ name }, i) => (
              <CategoryTab
                name={name}
                isActive={name === isActive}
                selectTab={setIsActive}
                key={i}
              />
            ))}
          </div>
        </div>

        {/* 3. Product Listing */}
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-15">
            {!error && data.map((item) => (
              <MarketItemCard
                key={item.id}
                product={item}
                handleSelect={handleSelect}
                selectedId={selectedId}
              />
            ))}
          </div>
        </div>
      </div>

      <FavouritesModal open={showFavourites} onOpenChange={setShowFavourites} />
      <ReviewsModal open={showReviews} onClose={setShowReviews} />

      {openCheckout && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="sticky top-6 self-start"
          >
            <Checkout />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default MarketPageContent;
