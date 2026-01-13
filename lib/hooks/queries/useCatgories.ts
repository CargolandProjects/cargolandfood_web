import { categories } from "@/lib/services/categories.service";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categories.getCategories,
  });
};