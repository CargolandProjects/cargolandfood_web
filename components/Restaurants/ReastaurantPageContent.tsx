"use client";

import { useState } from "react";
import CategoryTab from "@/components/Home/CategoryTab";
import { shawarma } from "@/assets/images";
import RestaurantStats from "@/components/RestaurantStats";
import { RiArrowGoBackLine, RiHeartFill } from "react-icons/ri";
import RestaurantItemCard from "@/components/Restaurants/RestaurantItemCard";
import RestaurantPageSkeleton from "@/components/Restaurants/RestaurantPageSkeleton";
import { useRouter } from "next/navigation";
import { info } from "@/assets/svgs";
import Checkout from "../Orders/CheckOut";
import { useCartStore } from "@/lib/stores/CartStore";
import { AnimatePresence, motion } from "framer-motion";
import OrderDetails from "../Orders/OrderDetails";
import FavouritesModal from "../FavouritesModal";
import ReviewsModal from "../ReviewModal";
import { useGetRestaurant } from "@/lib/hooks/queries";

export interface CategoryTab {
  name: string;
  isActive?: boolean;
  selectTab: (tab: string) => void;
}

// type Categories = "All" | "Sharwarma" | "Sandwich" | "Pizza" | "Milk Shake";

const categories= [
  { name: "All" },
  { name: "Sharwarma" },
  { name: "Sandwich" },
  { name: "Pizza" },
  { name: "Milk Shake" },
];

const ReastaurantPageContent = ({ id }: { id: string }) => {
  const [isActive, setIsActive] = useState("All");
  const [selectedId, setselectedId] = useState<string | null>(null);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const { data, isPending, error } = useGetRestaurant(id);
  const items = useCartStore((s) => s.items);
  const router = useRouter();

  const openCheckout = items.length > 0;
  console.log("Restaurant page Id:", id);

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (id: string) => {
    setselectedId(id === selectedId ? null : id);
  };

  if (isPending) {
    return <RestaurantPageSkeleton />;
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
          <span className="text-xl font-medium">Restaurants</span>
        </button>
        {/* 1. Header Image and Info Section */}
        <div className="relative bg-white mt-2">
          {/* Changed from bg-gray-50 to bg-white for a seamless look */}
          {/* Banner Image */}
          <div className="relative h-48 md:h-[274px] w-full overflow-hidden rounded-xl">
            <img
              src={shawarma.src}
              alt="Shawarma Plus banner"
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
                  alt="Shawarma Plus banner"
                  className="size-6 rounded-full object-cover"
                  loading="lazy"
                />
              </button>
            </div>
          </div>

          {/* Restaurant Title and Details (Below Image) */}
          <div className="p-4 py-10 bg-white">
            {/* Changed from bg-gray-50 to bg-white */}
            <h2 className="text-[32px] font-medium text-gray-900 mb-2">
              Shawarma Plus +
            </h2>
            {/* Stats Line (Rating, Delivery Fee, Time) */}
            <RestaurantStats
              rating={4.7}
              deliveryFee={0}
              deliveryTime="20 min"
            />
          </div>
        </div>

        {/* 2. Category Tabs Section */}
        <div className="sticky -top-4 z-10 pb-10 px-4">
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

        {/* 3. Product Listing Section */}
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-10">
            {data.map((item) => (
              <RestaurantItemCard
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
      <OrderDetails />

      {/* Checkout component */}
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

export default ReastaurantPageContent;
