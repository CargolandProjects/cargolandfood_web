"use client";
import { sharwarma } from "@/assets/images";
import { StaticImageData } from "next/image";
import MenuItemCard from "./MenuItemCard";
import { Button } from "./ui/button";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

export interface MenuItem {
  id: number;
  title: string;
  image: StaticImageData;
  rating: number;
  deliveryFee: number;
  deliveryTime: string;
  discount: number;
}

const Promotions = () => {

  const discounts: MenuItem[] = [
    {
      id: 1,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 200,
      deliveryTime: "20 min",
      discount: 40,
    },
    {
      id: 2,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 0,
      deliveryTime: "20 min",
      discount: 40,
    },
    {
      id: 3,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 200,
      deliveryTime: "20 min",
      discount: 40,
    },
    {
      id: 4,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 0,
      deliveryTime: "20 min",
      discount: 40,
    },
    {
      id: 5,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 200,
      deliveryTime: "20 min",
      discount: 40,
    },
  ];

  return (
    <div>
      <section className=" my-10">
        <div className="flex justify-between">
          <h3 className="mb-6.5">Discounts</h3>
          <div className="flex gap-4">
            <Button className="size-10 rounded-full bg-white hover:bg-white shadow-button">
              <RiArrowLeftLine className="text-black" />
            </Button>
            <Button className="size-10 rounded-full bg-white hover:bg-white shadow-button">
              <RiArrowRightLine className="text-black" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <div 
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {discounts.map((discount) => (
              <div key={discount.id} className="flex-none w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] snap-start">
                <MenuItemCard menuItem={discount} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="my-10">
        <div className="flex justify-between">
          <h3 className="mb-6.5">Feature</h3>
          <div className="flex gap-4">
            <Button className="size-10 rounded-full bg-white hover:bg-white shadow-button">
              <RiArrowLeftLine className="text-black" />
            </Button>
            <Button className="size-10 rounded-full bg-white hover:bg-white shadow-button">
              <RiArrowRightLine className="text-black" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div 
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {discounts.map((discount) => (
              <div key={discount.id} className="flex-none w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] snap-start">
                <MenuItemCard menuItem={discount} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
