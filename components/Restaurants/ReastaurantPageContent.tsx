"use client";

import { useState } from "react";
import { pizza } from "@/assets/images";
import CategoryTab from "@/components/Home/CategoryTab";
import { shawarma } from "@/assets/images";
import RestaurantStats from "@/components/RestaurantStats";
import { RiArrowGoBackLine, RiHeartFill } from "react-icons/ri";
import RestaurantItemCard from "@/components/Restaurants/RestaurantItemCard";
import { useRouter } from "next/navigation";
import { info } from "@/assets/svgs";
import Checkout from "../CheckOut";
import { useCartStore } from "@/lib/stores/useCartStore";
import { AnimatePresence, motion } from "framer-motion";

export interface CategoryTab {
  name: Categories;
  isActive?: boolean;
  selectTab: (tab: Categories) => void;
}

type Categories = "All" | "Sharwarma" | "Sandwich" | "Pizza" | "Milk Shake";

const categories: { name: Categories }[] = [
  { name: "All" },
  { name: "Sharwarma" },
  { name: "Sandwich" },
  { name: "Pizza" },
  { name: "Milk Shake" },
];

// --- MOCK DATA ---
// Normalized to Product shape (useCartStore)
const mockMenuItems = [
  {
    id: "1",
    name: "Pepperoni Pizza",
    description:
      "Hot & fresh pizza adorned with pepperoni on tomato marinara sauce and mozzarella cheese",
    imageUrl: pizza.src,
    price: "9650",
    categoryId: "pizza",
    isMenuSet: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    vendor: {
      id: "v1",
      businessName: "Shawarma Plus",
      createdAt: new Date().toISOString(),
      businessCategory: "Restaurant",
      businessAddress: "123 Food St",
      isPreorder: false,
      golive: true,
      totalOrders: 2342,
      reviews: [],
    },
    simpleRating: 4.5,
    bayesianRating: 4.4,
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    imageUrl: pizza.src,
    price: "9650",
    categoryId: "pizza",
    isMenuSet: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    vendor: {
      id: "v1",
      businessName: "Shawarma Plus",
      createdAt: new Date().toISOString(),
      businessCategory: "Restaurant",
      businessAddress: "123 Food St",
      isPreorder: false,
      golive: true,
      totalOrders: 2342,
      reviews: [],
    },
    simpleRating: 4.5,
    bayesianRating: 4.4,
  },
  {
    id: "3",
    name: "Chicken Shawarma",
    description: "Juicy marinated chicken wrapped in soft pita bread...",
    imageUrl: pizza.src,
    price: "5253",
    categoryId: "shawarma",
    isMenuSet: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    vendor: {
      id: "v1",
      businessName: "Shawarma Plus",
      createdAt: new Date().toISOString(),
      businessCategory: "Restaurant",
      businessAddress: "123 Food St",
      isPreorder: false,
      golive: true,
      totalOrders: 2342,
      reviews: [],
    },
    simpleRating: 4.6,
    bayesianRating: 4.5,
  },
  {
    id: "4",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    imageUrl: pizza.src,
    price: "9650",
    categoryId: "pizza",
    isMenuSet: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    vendor: {
      id: "v1",
      businessName: "Shawarma Plus",
      createdAt: new Date().toISOString(),
      businessCategory: "Restaurant",
      businessAddress: "123 Food St",
      isPreorder: false,
      golive: true,
      totalOrders: 2342,
      reviews: [],
    },
    simpleRating: 4.5,
    bayesianRating: 4.4,
  },
  {
    id: "5",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    imageUrl: pizza.src,
    price: "9650",
    categoryId: "pizza",
    isMenuSet: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    vendor: {
      id: "v1",
      businessName: "Shawarma Plus",
      createdAt: new Date().toISOString(),
      businessCategory: "Restaurant",
      businessAddress: "123 Food St",
      isPreorder: false,
      golive: true,
      totalOrders: 2342,
      reviews: [],
    },
    simpleRating: 4.5,
    bayesianRating: 4.4,
  },
  {
    id: "6",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    imageUrl: pizza.src,
    price: "9650",
    categoryId: "pizza",
    isMenuSet: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    vendor: {
      id: "v1",
      businessName: "Shawarma Plus",
      createdAt: new Date().toISOString(),
      businessCategory: "Restaurant",
      businessAddress: "123 Food St",
      isPreorder: false,
      golive: true,
      totalOrders: 2342,
      reviews: [],
    },
    simpleRating: 4.5,
    bayesianRating: 4.4,
  },
  {
    id: "7",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    imageUrl: pizza.src,
    price: "9650",
    categoryId: "pizza",
    isMenuSet: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    vendor: {
      id: "v1",
      businessName: "Shawarma Plus",
      createdAt: new Date().toISOString(),
      businessCategory: "Restaurant",
      businessAddress: "123 Food St",
      isPreorder: false,
      golive: true,
      totalOrders: 2342,
      reviews: [],
    },
    simpleRating: 4.5,
    bayesianRating: 4.4,
  },
];

const ReastaurantPageContent = ({ params }: { params: string }) => {
  const [isActive, setIsActive] = useState<Categories>("All");
  const [selectedId, setselectedId] = useState<string | null>(null);
  const items = useCartStore((s) => s.items);
  const router = useRouter();

  const openCheckout = items.length > 0;
  console.log("Restaurant page Id:", params);

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (id: string) => {
    setselectedId(id === selectedId ? null : id);
  };

  return (
    <div className="flex gap-10 h-full">
      <div className={`w-full ${openCheckout ? "max-w-[814px]" : "max-w-[1006px]"} mx-auto transitoin-all duration-300 flex-1`}>
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
            <div className="absolute top-6 right-6 flex gap-2.5">
              <div className="size-10 rounded-full bg-white flex justify-center items-center">
                <RiHeartFill className="size-6 text-gray-300" />
              </div>
              <div className="size-10 rounded-full bg-white flex justify-center items-center">
                <img
                  src={info.src}
                  alt="Shawarma Plus banner"
                  className="size-6 rounded-full object-cover"
                  loading="lazy"
                />
              </div>
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
            {mockMenuItems.map((item) => (
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
