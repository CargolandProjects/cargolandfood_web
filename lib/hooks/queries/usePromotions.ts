import { promotions } from "@/lib/services/promotions.service";
import { useQuery } from "@tanstack/react-query";

export const usePromotions = () => {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: promotions.getPromotions,
  });
};

export const useHotPicks = () => {
  return useQuery({
    queryKey: ["hotPicks"],
    queryFn: promotions.hotPicks,
  });
};
