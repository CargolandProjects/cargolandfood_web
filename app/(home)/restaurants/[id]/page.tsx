"use client";

import React from "react";
import shawarmaPlus from "@/assets/images/shawarmaPlus.png";
import pizza from "@/assets/images/pizza.png";
import plusIcon from "@/assets/svgs/plusIcon.svg";

import RestaurantStats from "@/components/RestaurantStats";
// import { Star, Clock, Heart, Info } from 'lucide-react'; // Using lucide-react for standard icons
// import PlusIcon from '../../components/PlusIcon'; // Import the custom icon

// --- MOCK DATA ---
const bannerImagePath = shawarmaPlus.src;
const pizzaCardImagePath = pizza.src;

const mockMenuItems = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: 9650,
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: 9650,
  },
  {
    id: 3,
    name: "Chicken Shawarma",
    description: "Juicy marinated chicken wrapped in soft pita bread...",
    price: 7500,
  },
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: 9650,
  },
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: 9650,
  },
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: 9650,
  },
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: 9650,
  },
];

// --- HELPER COMPONENTS ---

// Component for Category Tabs
const CategoryTab: React.FC<{ name: string; isActive?: boolean }> = ({
  name,
  isActive = false,
}) => (
  <button
    className={`
      px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
      ${
        isActive
          ? "bg-orange-600 text-white shadow-md" // Active (Orange background)
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50" // Inactive (White background/border)
      }
    `}
  >
    {name}
  </button>
);

// Component for Product Card
interface ProductCardProps {
  item: (typeof mockMenuItems)[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => (
  <div
    className="
      flex bg-white rounded-[16px] overflow-hidden 
      border border-gray-200 shadow-sm 
      w-[483px] h-[138px]
    "
  >
    {/* Product Image - Adjusted for Left-Side Radius Only */}
    <div className="w-[138px] h-full flex-shrink-0">
      {" "}
      {/* Width set to 138px to match height for a square/large image area */}
      <img
        src={pizzaCardImagePath}
        alt={item.name}
        // ONLY applies border radius to the left corners
        className="w-full h-full object-cover rounded-l-[16px]"
      />
    </div>

    {/* Product Details */}
    <div className="flex-grow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {item.description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-bold text-gray-900">
          ₦{item.price.toLocaleString()}
        </span>
        {/* ADDED: Plus Icon Button */}
        <button
          // Match the light orange background, right-side rounding, and padding/size
          className="bg-[#FFEFE8] w-8 h-8 flex items-center justify-center rounded-[8px]"
          onClick={() => console.log("Add product clicked")} // Add your actual click handler here
          aria-label={`Add ${item.name} to cart`}
        >
          <img src={plusIcon.src} alt="Add to cart" className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---
interface RestaurantDetailsProps {
  params: {
    id: string;
  };
}

export default function RestaurantDetailsPage({
  params,
}: RestaurantDetailsProps) {
  const restaurantId = params.id;

  return (
    <div className="w-full min-h-screen">
      {/* 1. Header Image and Info Section */}
      <div className="relative bg-white">
        {" "}
        {/* Changed from bg-gray-50 to bg-white for a seamless look */}
        {/* Banner Image */}
        <div className="h-48 md:h-[274px] w-[1006px] overflow-hidden rounded-xl">
          <img
            src={bannerImagePath}
            alt="Shawarma Plus banner"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {/* Favorite/Info Buttons (Top Right) */}
        <div className="absolute top-4 right-4 flex space-x-3 z-20">
          {/* Favorite Button */}
          {/* Buttons still need white background/blur to contrast with the image */}
          <button className="p-2 bg-white/70 backdrop-blur-sm rounded-full text-orange-600 hover:bg-white transition-colors shadow">
            {/* <Heart size={20} fill="currentColor" /> */}
          </button>
          {/* Info Button */}
          <button className="p-2 bg-white/70 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors shadow">
            {/* <Info size={20} /> */}
          </button>
        </div>
        {/* Restaurant Title and Details (Below Image) */}
        <div className="p-4 pt-3 bg-white">
          {" "}
          {/* Changed from bg-gray-50 to bg-white */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Shawarma Plus +
          </h2>
          {/* Stats Line (Rating, Delivery Fee, Time) */}
          <RestaurantStats rating={4.7} deliveryFee={0} deliveryTime="20 min" />
        </div>
      </div>

      {/* 2. Category Tabs Section */}
      <div className="sticky top-0 z-10 py-3 px-4">
        <div
          className="flex overflow-x-auto scrollbar-hide"
          style={{
            width: "606px",
            height: "46px",
            gap: "18px",
            justifyContent: "flex-start",
          }}
        >
          <CategoryTab name="All" isActive />
          <CategoryTab name="Shawarma" />
          <CategoryTab name="Sandwich" />
          <CategoryTab name="Pizza" />
          <CategoryTab name="Milk Shake" />
          <CategoryTab name="Pizza" />
        </div>
      </div>

      {/* 3. Product Listing Section */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-[40px] w-[1006px]">
          {mockMenuItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// NOTE: Remember to install the lucide-react library: npm install lucide-react
