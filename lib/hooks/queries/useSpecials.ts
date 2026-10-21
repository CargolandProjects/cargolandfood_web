import { specials } from "@/lib/services/specials.service";
import { useQuery } from "@tanstack/react-query";

export const useBannerPromos = (zoneId: string) => {
  return useQuery({
    queryKey: ["promo-banners", zoneId],
    queryFn: () => specials.getBannerPromos(zoneId),
    select: (res) => res.data,
    enabled: Boolean(zoneId),
  });
};
