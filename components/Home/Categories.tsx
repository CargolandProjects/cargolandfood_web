"use client";

import Image from "next/image";
import { useCategory } from "@/contexts/CategoryContext";
import { useCategories } from "@/lib/hooks/queries";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

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

const Categories = () => {
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
          <h3>Categories</h3>
          <div className="flex gap-6 mt-1">
            {categories.map((category) => {
              const active = category.id === activeCategory;
              return (
                <div
                  className={`${category.styles} ${
                    active ? category.activeStyle : ""
                  } w-31 h-29 flex flex-col justify-center items-center rounded-xl cursor-pointer`}
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    removeQuery();
                  }}
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
        </>
      )}
    </section>
  );
};

export default Categories;
