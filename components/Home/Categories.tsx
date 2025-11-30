import React from "react";
import {  restaurant, groceries, food } from "@/assets/svgs";
import Image from "next/image";

interface Categories{
    name: string;
    icon: string;
    styles: string;
    activeStyle: string;
}

const Categories = () => {
  const categories: Categories[] = [
    {
      name: "Restaurants",
      icon: restaurant,
      styles: "bg-[#FEF3EB] ",
      activeStyle: "border border-primary",
    },
    {
      name: "Groceries & More",
      icon: groceries,
      styles: "bg-[#EFFAF6]",
      activeStyle: "border border-primary",
    },
    {
      name: "Markets",
      icon: food,
      styles: "bg-[#FEF7EC]",
      activeStyle: "border border-primary",
    },
  ];

  return (
    <section>
      <h3>Categories</h3>
      <div className="flex gap-6 mt-1">
        {categories.map(( category, index ) => (
          <div
            className={`${category.styles} w-31 h-29 flex flex-col justify-center items-center`}
            key={index}
          >
            <div className="size-10 overflow-hidden">
              <Image
                src={category.icon}
                alt={category.name}
                className="object-cover size-full"
              />
            </div>
            <p className="font-medium text-sm mt-1.5 text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
