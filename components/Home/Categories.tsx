"use client";

import Image from "next/image";
import { useCategory } from "@/contexts/CategoryContext";
import { useCategories } from "@/lib/hooks/queries";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const styles: { [key: string]: { styles: string; activeStyle: string } } = {
  Restaurants: {
    styles: "bg-[#FEF3EB] ",
    activeStyle: "border border-primary",
  },
  "Groceries & More": {
    styles: "bg-[#EFFAF6]",
    activeStyle: "border border-secondary",
  },
  Markets: {
    styles: "bg-[#FEF7EC]",
    activeStyle: "border border-cargo-accent",
  },
};

const Loading = () => (
  <div className="space-y-4">
    <Skeleton className="w-30 h-4" />
    <div className="flex gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton className="w-31 h-29" key={i} />
      ))}
    </div>
  </div>
);

const CategoryContent = () => {
  const { activeCategory, setActiveCategory } = useCategory();
  const { data: categories, isLoading } = useCategories();

  const router = useRouter();
  const searchParams = useSearchParams();

  const removeQuery = () => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.replace(`?${params.toString()}`);
  };

  return (
    <section>
      {isLoading && <Loading />}

      {!isLoading && categories?.length && (
        <>
          <h3 className="max-sm:text-base max-sm:leading-6">Categories</h3>
          <div className="flex gap-6 mt-2 sm:mt-1">
            {categories.map((category) => {
              const active = category.id === activeCategory;
              return (
                <div
                  className={`${styles[category.name].styles} ${
                    active ? styles[category.name].activeStyle : ""
                  } w-[103px] h-[72px] sm:w-31 sm:h-29 flex flex-col justify-center items-center rounded-xl cursor-pointer`}
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    removeQuery();
                  }}
                >
                  <div className="size-8 sm:size-10 overflow-hidden">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      className="object-cover size-full"
                    />
                  </div>
                  <p className="font-medium text-xs sm:text-sm mt-1.5 text-center">
                    {category.name}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

const Categories = () => (
  <Suspense>
    <CategoryContent />
  </Suspense>
);
export default Categories;
