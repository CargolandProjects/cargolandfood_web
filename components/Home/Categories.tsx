"use client"
import { restaurant, groceries, food } from "@/assets/svgs";
import Image from "next/image";
import { CategoryType, useCategory } from "@/contexts/CategoryContext";

interface Categories {
  id: CategoryType;
  name: string;
  icon: string;
  styles: string;
  activeStyle: string;
}

const categories: Categories[] = [
  {
    id: "Restaurants",
    name: "Restaurants",
    icon: restaurant,
    styles: "bg-[#FEF3EB] ",
    activeStyle: "border border-primary",
  },
  {
    id: "Groceries",
    name: "Groceries & More",
    icon: groceries,
    styles: "bg-[#EFFAF6]",
    activeStyle: "border border-secondary",
  },
  {
    id: "Markets",
    name: "Markets",
    icon: food,
    styles: "bg-[#FEF7EC]",
    activeStyle: "border border-cargo-accent",
  },
];

const Categories = () => {
  const { activeCategory, setActiveCategory } = useCategory();
  return (
    <section>
      <h3>Categories</h3>
      <div className="flex gap-6 mt-1">
        {categories.map((category) => {
          const active = category.id === activeCategory;
          return (
            <div
              className={`${category.styles} ${active ? category.activeStyle : "" } w-31 h-29 flex flex-col justify-center items-center rounded-xl cursor-pointer`}
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="size-10 overflow-hidden">
                <Image
                  src={category.icon}
                  alt={category.name}
                  className="object-cover size-full"
                />
              </div>
              <p className="font-medium text-sm mt-1.5 text-center">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
