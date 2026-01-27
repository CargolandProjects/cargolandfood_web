import React from "react";
import {
  RiArrowGoBackLine,
  RiTakeawayFill,
} from "react-icons/ri";
import { ActiveTab } from "./Sidebar";
import { burger, pizza, shawarma } from "@/assets/images";
import { Button } from "../ui/button";

interface SettingsProps {
  setActiveTab: (tab: ActiveTab) => void;
}

interface Cart {
  title: string;
  price: string;
  image: string;
  address: string;
  qty: number;
}

const cart: Cart[] = [
  {
    title: "Pepperoni pizza",
    price: "9650",
    image: pizza.src,
    address: "45 Denkede Street, Shomolu",
    qty: 2,
  },
  {
    title: "Hamburger",
    price: "9650",
    image: burger.src,
    address: "45 Denkede Street, Shomolu",
    qty: 1,
  },
  {
    title: "Shawarma",
    price: "9650",
    image: shawarma.src,
    address: "45 Denkede Street, Shomolu",
    qty: 3,
  },
  {
    title: "Pepperoni pizza",
    price: "9650",
    image: pizza.src,
    address: "45 Denkede Street, Shomolu",
    qty: 2,
  },
  {
    title: "Hamburger",
    price: "9650",
    image: burger.src,
    address: "45 Denkede Street, Shomolu",
    qty: 1,
  },
  {
    title: "Shawarma",
    price: "9650",
    image: shawarma.src,
    address: "45 Denkede Street, Shomolu",
    qty: 3,
  },
];

const Cart = ({ setActiveTab }: SettingsProps) => {
  return (
    <div>
      {/* Header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => setActiveTab(null)} className="absolute left-0">
          <RiArrowGoBackLine className="size-5" />
        </button>
        <h2 className="text-lg leading-6">Cart</h2>
      </div>

      <div className="mt-4 space-y-3">
        {cart.map((item, idx) => (
          <div key={idx} className="space-y-4 px-3 py-4 rounded-md border border-neutral-300">
            <div className="flex items-center">
              <div className="w-15 h-14 rounded-button overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-full object-cover"
                />
              </div>

              <div className="ml-4">
                <h3 className="text-base leading-6 capitalize">{item.title}</h3>
                <div className="flex gap-1.5 items-center mt-1">
                  <p className="text-xs text-neutral-600 ">{item.qty} items</p>
                  <div className="h-4 w-px bg-neutral-200" />
                  <p className="text-neutral-600 text-xs font-medium">
                    ₦{Number(item.price).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-2 items-center">
              <RiTakeawayFill className="size-5 text-neutral-600" />
              <p className="text-base leading-5 line-clamp-1">{item.address}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                variant="outline"
                className="submit-btn flex-1 hover:bg--gray-50  border-neutral-300 capitalize"
              >
                Delete
              </Button>
              <Button className="submit-btn flex-1">Checkout</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
