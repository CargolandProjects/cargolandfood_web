"use client";

import { createContext, useContext, useState } from "react";

export type CategoryType = "Restaurants" | "Groceries" | "Markets" | null;

interface CategoryContextType {
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>(null);

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (context === undefined)
    throw new Error("useCategory must be used within a CategoryProvider");

  return context;
};
