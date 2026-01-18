"use client";

import { useState } from "react";
import CategoryTab from "@/components/home/CategoryTab";
import { shawarma } from "@/assets/images";
import RestaurantStats from "@/components/RestaurantStats";
import { RiArrowGoBackLine, RiHeartFill } from "react-icons/ri";
import RestaurantItemCard from "@/components/restaurants/RestaurantItemCard";
import RestaurantPageSkeleton from "@/components/restaurants/RestaurantPageSkeleton";
import { useRouter } from "next/navigation";
import { info } from "@/assets/svgs";
import Checkout from "../orders/CheckOut";
import { AnimatePresence, motion } from "framer-motion";
import OrderDetails from "../orders/OrderDetails";
import FavouritesModal from "../FavouritesModal";
import ReviewsModal from "../ReviewModal";
import { useGetVendorById } from "@/lib/hooks/queries/useVendors";
import { useCheckoutPreview } from "@/lib/hooks/queries/useCheckoutPreview";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

export interface CategoryTab {
  name: string;
  isActive?: boolean;
  selectTab: (tab: string) => void;
}

// type Categoriess = "All" | "Sharwarma" | "Sandwich" | "Pizza" | "Milk Shake";

const categories = [
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
  const [openCheckout, setOpenCheckout] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"DELIVERY" | "PICKUP">("DELIVERY");

  const { data, isPending, error } = useGetVendorById(id);
  const router = useRouter();

  // Fetch checkout preview to check if cart has items
  // Enable fetching on component mount to check cart status
  const { 
    data: checkoutData, 
    isLoading: isCheckoutLoading 
  } = useCheckoutPreview(id, deliveryType, true);

  const vendor = data?.data;
  const rating = data?.averageRating;
  const menus = data?.data.menus || [];

  // Check if cart has items from checkout preview
  const hasItemsInCart = checkoutData && checkoutData.cartItem.items.length > 0;

  // Calculate local total for mobile button (sum of all item totalPrice)
  const calculateLocalTotal = () => {
    if (!checkoutData) return 0;
    const itemsTotal = checkoutData.cartItem.items.reduce((sum, item) => {
      return sum + Number(item.totalPrice);
    }, 0);
    return itemsTotal;
  };

  console.log("Restaurant page Id:", id);
  console.log("Restaurant page Data:", vendor);
  console.log("Checkout Data:", checkoutData);

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
        className={`w-full relative ${
          hasItemsInCart ? "max-w-[814px]" : "max-w-[1006px]"
        } mx-auto transitoin-all duration-300 flex-1`}
      >
        {/* Back button */}
        <button
          onClick={handleBack}
          className="hidden sm:flex items-center gap-4 text-sm w-full pl-2 hover:cursor-pointer"
        >
          <RiArrowGoBackLine className="size-3.5 text-gray-500" />
          <span className="text-xl font-medium">Restaurants</span>
        </button>

        {/* 1. Header Image and Info Section */}
        <div className="relative">
          <h3 className="sm:hidden">Restaurants</h3>
          {/* Banner Image */}
          <div className="relative h-25.5 sm:h-48 md:h-[274px] w-full overflow-hidden rounded-xl mt-2">
            <img
              src={shawarma.src}
              alt="Shawarma Plus banner"
              className="w-full h-full object-cover rounded-xl object-[0px_-50px] sm:object-[0px_-82px]"
              loading="lazy"
            />
            {/* Favourite and Comments */}
            <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-2.5">
              <button
                onClick={() => setShowFavourites(true)}
                className="size-8 sm:size-10 rounded-full bg-white flex justify-center items-center cursor-pointer"
              >
                <RiHeartFill className="size-6 text-gray-300" />
              </button>
              <button
                onClick={() => setShowReviews(true)}
                className="size-8 sm:size-10 rounded-full bg-white flex justify-center items-center cursor-pointer"
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

          <div className="my-3 sm:my-10 max-sm:space-y-[3px]">
            <h2>{vendor?.businessName}</h2>
            {/* Stats Line (Rating, Delivery Fee, Time) */}
            <RestaurantStats
              rating={rating?.bayesianRating || 0}
              deliveryFee={0}
              deliveryTime="20 min"
            />
          </div>
        </div>

        {/* 2. Category Tabs Section */}
        <div className="sticky -top-2 sm:-top-4 z-10 sm:pb-10 sm:px-4">
          <div className="flex gap-2.5 sm:gap-4.5 max-w-[606px] h-11.5 justify-start overflow-x-auto hide-scrollbar">
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
        <div className="sm:p-4 max-sm:mt-3">
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-10">
            {!error &&
              menus.length > 0 &&
              menus.map((item) => (
                <RestaurantItemCard
                  key={item.id}
                  menu={item}
                  handleSelect={handleSelect}
                  selectedId={selectedId}
                />
              ))}
          </div>
        </div>

        {/* Mobile Screen Checkout prompt */}
        <AnimatePresence>
          {hasItemsInCart && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
              className="sticky sm:hidden pt-5 pb-8 px-8 -bottom-4 inset-x-0 flex justify-between items-center bg-white"
            >
              <p className="text-xl font-medium ">
                ₦{calculateLocalTotal().toLocaleString()}
              </p>
              <Button
                onClick={() => setOpenCheckout(true)}
                className="uppercase py-3.5 px-5.5 h-10.5 sm:h-12 text-sm font-bold w-[184px]"
              >
                Checkout
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FavouritesModal open={showFavourites} onOpenChange={setShowFavourites} />
      <ReviewsModal open={showReviews} onClose={setShowReviews} />
      <OrderDetails />

      {/* Large Screens Checkout component */}
      <AnimatePresence mode="wait">
        {hasItemsInCart && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="sticky top-6 self-start max-sm:hidden"
          >
            <ScrollArea className="max-w-[400px] h-[85vh] shadow-lg rounded-xl">
              <Checkout 
                vendorId={id}
                checkoutData={checkoutData}
                isLoading={isCheckoutLoading}
                deliveryType={deliveryType}
                onDeliveryTypeChange={setDeliveryType}
              />
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Screens Checkout Component */}
      <AnimatePresence mode="wait">
        {hasItemsInCart && openCheckout && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
            className="sm:hidden fixed inset-0 pt-10 px-6 bg-white z-35 "
          >
            <Checkout 
              vendorId={id}
              checkoutData={checkoutData}
              isLoading={isCheckoutLoading}
              deliveryType={deliveryType}
              onDeliveryTypeChange={setDeliveryType}
              closeCheckout={setOpenCheckout} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReastaurantPageContent;
