"use client";

import { useState } from "react";
import { pizza } from "@/assets/images";
import CategoryTab from "@/components/Home/CategoryTab";
import { shawarma } from "@/assets/images";
import RestaurantStats from "@/components/RestaurantStats";
import { RiArrowGoBackLine, RiHeartFill } from "react-icons/ri";
import RestaurantItemCard from "@/components/Restaurants/RestaurantItemCard";
import CheckoutSidebar from "@/components/Restaurants/CheckoutSidebar";
import { useRouter } from "next/navigation";
import { info } from "@/assets/svgs";

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
const mockMenuItems = [
  {
    id: "1",
    name: "Pepperoni Pizza",
    description:
      "Hot & fresh pizza adorned with pepperoni on tomato marinara sauce and mozzarella cheese",
    image: pizza.src,
    price: 9650,
    discount: 20,
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    image: pizza.src,
    price: 9650,
    discount: 40,
  },
  {
    id: "3",
    name: "Chicken Shawarma",
    description: "Juicy marinated chicken wrapped in soft pita bread...",
    image: pizza.src,
    price: 5253,
  },
  {
    id: "4",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    image: pizza.src,
    price: 9650,
  },
  {
    id: "5",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    image: pizza.src,
    price: 9650,
    discount: 30,
  },
  {
    id: "6",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    image: pizza.src,
    price: 9650,
  },
  {
    id: "7",
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    image: pizza.src,
    price: 9650,
    discount: 40,
  },
];




const ReastaurantPageContent = ({ params }: { params: string }) => {
  const [isActive, setIsActive] = useState<Categories>("All");
  const [selectedId, setselectedId] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const router = useRouter();
  console.log("Restaurant page Id:", params);

  const handleBack = () => {
    router.back();
  };

  const handleSelect = (id: string) => {
    setselectedId(id === selectedId ? null : id);
  };

  const handleAddOrderItem = () => {
    setIsCheckoutOpen(true); // Show the checkout
    setselectedId(null); // Close the modal
  };

  return (
    <div className="w-full mx-auto p-4 md:p-0">
      <button
        onClick={handleBack}
        className="flex items-center gap-4 text-sm w-full pl-2 hover:cursor-pointer"
      >
        <RiArrowGoBackLine className="size-3.5 text-gray-500" />
        <span className="text-xl font-medium">Restaurants</span>
      </button>

      {/* Main Content Container */}
      <div className="flex justify-center w-full mt-2">

        {/* 1. Left Column: Menu and Restaurant Details (Main Content) */}
        {/* Dynamic width: minimum 1006px when checkout closed, 745px when checkout open */}
        <div className={isCheckoutOpen ? "w-[745px] mr-[40px]" : "w-full min-w-[1006px]"}>

          {/* Header Image and Info Section */}
          <div className="relative bg-white">
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
              <h2 className="text-[32px] font-medium text-gray-900 mb-2">
                Shawarma Plus +
              </h2>
              <RestaurantStats rating={4.7} deliveryFee={0} deliveryTime="20 min" />
            </div>
          </div>

          {/* 2. Category Tabs Section */}
          <div className="pb-10 pt-4">
            <div className="flex gap-4.5 h-11.5 justify-start overflow-x-auto hide-scrollbar">
              {categories.map(({ name }, i) => (
                <CategoryTab
                  name={name}
                  isActive={name === isActive}
                  selectTab={setIsActive}
                  key={i}
                />
              ))}
              {/* Duplicated for visual match to image */}
              <CategoryTab name="Pizza" isActive={false} selectTab={setIsActive} key={5} />
            </div>
          </div>

          {/* 3. Product Listing Section */}
          <div className="pb-4">
            <div className="grid md:grid-cols-2 gap-4 lg:gap-10">
              {mockMenuItems.map((item) => (
                <RestaurantItemCard
                  key={item.id}
                  item={item}
                  handleSelect={handleSelect}
                  selectedId={selectedId}
                  onOrderItem={handleAddOrderItem}
                />
              ))}
              {/* Added extra items to better match the requested height/scrollable content */}
              {mockMenuItems.slice(0, 3).map((item, index) => (
                <RestaurantItemCard
                  key={item.id + '-extra-' + index}
                  item={{ ...item, id: item.id + '-extra-' + index }}
                  handleSelect={handleSelect}
                  selectedId={selectedId}
                  onOrderItem={handleAddOrderItem}
                />
              ))}
            </div>
          </div>

        </div> {/* End Left Column */}

        {/* 2. Right Column: Checkout Section (Width is 400px, Gap is handled by the left column's margin) */}
        {isCheckoutOpen && (
          <div className="hidden lg:block w-[400px]">
            <div className="sticky top-4">
              <CheckoutSidebar
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
              />
            </div>
          </div>
        )} {/* End Right Column */}

      </div> {/* End Main Content Grid */}
    </div>
  );
};

export default ReastaurantPageContent;