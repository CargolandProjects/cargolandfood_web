import { sharwarma } from "@/assets/images";
import React from "react";
import { MenuItem } from "../Promotions";
import MenuItemCard from "../MenuItemCard";

const Restaurants = () => {
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
    <section className="my-10">
      <h3 className="mb-6.5">Restaurants</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {discounts.map((menuItem) => (
          <MenuItemCard menuItem={menuItem} key={menuItem.id} />
        ))}
      </div>
    </section>
  );
};

export default Restaurants;
