"use client";

import { useState } from "react";
import CategoryTab from "@/components/home/CategoryTab";
import RestaurantStats from "@/components/RestaurantStats";
import { RiArrowGoBackLine, RiHeartFill } from "react-icons/ri";
import RestaurantItemCard from "@/components/restaurants/RestaurantItemCard";
import RestaurantPageSkeleton from "@/components/restaurants/RestaurantPageSkeleton";
import { useRouter } from "next/navigation";
import { info } from "@/assets/svgs";
import PageCheckOut from "../orders/PageCheckOut";
import { AnimatePresence, motion } from "framer-motion";
import OrderDetails from "../globalUi/OrderDetails";
import FavouritesModal from "../FavouritesModal";
import ReviewsModal from "../ReviewModal";
import { useVendorById } from "@/lib/hooks/queries/useVendors";
import { useCheckoutPreview } from "@/lib/hooks/queries/useCheckoutFlow";
import { Button } from "../ui/button";
import { useToggleFavourite } from "@/lib/hooks/mutations/useToggleFavourite";
import { useSession } from "@/lib/hooks/useSession";
import { fallbackImg } from "@/lib/utils";
import NotFound from "../NotFound";

const ReastaurantPageContent = ({ id }: { id: string }) => {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [selectedId, setselectedId] = useState<string | null>(null);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"DELIVERY" | "PICKUP">(
    "DELIVERY"
  );

  const { data, isLoading, error, isSuccess } = useVendorById(id);
  const { mutate: toggleFavourite } = useToggleFavourite("vendorpage");
  const { user } = useSession();

  const router = useRouter();

  // Fetch checkout preview to check if cart has items
  // Enable fetching on component mount to check cart status
  const {
    data: checkoutData,
    isLoading: isCheckoutLoading,
    error: checkoutError,
    isSuccess: checkoutSuccess,
  } = useCheckoutPreview(id, deliveryType, true);

  const vendor = data?.data;
  const rating = data?.averageRating;
  const menus = data?.data.menus || [];
  const categories = data?.data.categories || [];

  // Check if cart has items from checkout preview
  // If error (e.g., 400 "No active cart"), treat as empty cart
  const hasItemsInCart =
    !checkoutError &&
    checkoutData &&
    checkoutData.cart.items &&
    checkoutData.cart.items.length > 0;

  // Calculate local total for mobile button (sum of all item totalPrice)
  const calculateLocalTotal = () => {
    if (!checkoutData || !checkoutData.cart.items) return 0;
    const itemsTotal = checkoutData.cart.items.reduce((sum, item) => {
      return sum + Number(item.totalPrice);
    }, 0);
    return itemsTotal;
  };

  // console.log("Restaurant page Id:", id);
  // console.log("Restaurant page Data:", vendor);
  // console.log("Checkout Data:", checkoutData);

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (id: string) => {
    setselectedId(id === selectedId ? null : id);
  };

  const handleToggleFavourite = (
    isFavourite: boolean,
    vendorId: string,

    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    // console.log(user, vendorId, isFavourite);
    if (!user || !vendorId) return;
    const payload = {
      isFavourite: !isFavourite,
      vendorId: vendorId,
      userId: user.id,
    };

    toggleFavourite(payload);
  };

  const filteredMenu =
    activeCatId === null
      ? menus
      : menus.filter((menu) => menu.categoryId === activeCatId);

  if (isLoading) {
    return <RestaurantPageSkeleton />;
  }

  if (error) {
    return (
      <NotFound
        title="Vendor not found"
        description="Sorry, the vendor you are looking for doesn't exist. Here are some helpful links:"
      />
    );
  }

  return (
    <div className="flex gap-6 xl:gap-10 h-full">
      <motion.div
        className="w-full h-full flex-1 flex flex-col"
        layout
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
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
        <div>
          <h3 className="sm:hidden">Restaurants</h3>
          {/* Banner Image */}
          <div className="relative h-25.5 sm:h-48 lg:h-[234px] xl:h-[284px] w-full overflow-hidden rounded-xl mt-2">
            <img
              src={vendor?.profileImg || "/fallback_vendor.webp"}
              alt="Shawarma Plus banner"
              className="w-full h-full object-cover rounded-xl bg-neutral-100"
              loading="lazy"
              onError={(e) => fallbackImg(e, "/fallback_vendor.webp")}
            />
            {/* Favourite and Comments */}
            <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-2.5">
              <button
                onClick={(e) =>
                  handleToggleFavourite(vendor!.isFavourite, vendor!.id, e)
                }
                className="size-8 sm:size-10 rounded-full bg-white flex justify-center items-center cursor-pointer"
              >
                <RiHeartFill
                  className={`${
                    vendor?.isFavourite ? "text-primary" : "text-neutral-400"
                  } size-6`}
                />
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
        <div className="sm:mb-10 sm:px-4">
          <CategoryTab
            categories={categories}
            activeCatId={activeCatId}
            selectCatId={setActiveCatId}
          />
        </div>

        {/* 3. Product Listing Section */}
        <div className="sm:px-4 max-sm:mt-3 flex-1">
          {isSuccess && filteredMenu.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No items in this category
            </p>
          )}

          <div
            className={`grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-10 ${
              hasItemsInCart ? "lg:grid-cols-1 xl:grid-cols-2" : ""
            }`}
          >
            {isSuccess &&
              filteredMenu.length > 0 &&
              filteredMenu.map((item) => (
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
              className="sticky sm:hidden pt-5 pb-8 px-8 bottom-0 inset-x-0 flex gap-2 justify-between items-center bg-white"
            >
              <p className="text-xl font-medium ">
                ₦{calculateLocalTotal().toLocaleString()}
              </p>
              <Button
                onClick={() => setOpenCheckout(true)}
                className="uppercase py-3.5 px-5.5 h-12 text-sm font-bold w-[184px]"
              >
                Checkout
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Large Screens Checkout component */}
      <AnimatePresence mode="popLayout">
        {hasItemsInCart && (
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: "100%",
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="max-lg:hidden mt-8 sticky top-[65px] sm:h-[calc(100dvh-80px)] w-[400px] min-w-[307px] shadow-2xl rounded-2xl border overflow-hidden border-gray-100"
          >
            <PageCheckOut
              vendorId={id}
              checkoutData={checkoutData}
              isLoading={isCheckoutLoading}
              isError={checkoutError}
              isSuccess={checkoutSuccess}
              deliveryType={deliveryType}
              onDeliveryTypeChange={setDeliveryType}
            />
          </motion.aside>
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
            className="sm:hidden pt-10 px-6 bg-white z-35 "
          >
            <PageCheckOut
              vendorId={id}
              checkoutData={checkoutData}
              isLoading={isCheckoutLoading}
              isError={checkoutError}
              isSuccess={checkoutSuccess}
              deliveryType={deliveryType}
              onDeliveryTypeChange={setDeliveryType}
              closeCheckout={setOpenCheckout}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <FavouritesModal open={showFavourites} onOpenChange={setShowFavourites} />
      <ReviewsModal open={showReviews} onClose={setShowReviews} />
      <OrderDetails />
    </div>
  );
};

export default ReastaurantPageContent;
