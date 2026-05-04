import { favourites } from "@/lib/services/favourites.service";
import { useQuery } from "@tanstack/react-query";

export const useFavourites = (userId: string, isAuthenticated: boolean) => {
  return useQuery({
    queryKey: ["favourites", userId],
    queryFn: () => favourites.getAllFavourites(userId),
    enabled: !!userId && isAuthenticated,
    refetchOnMount: true,
    select: (res) => {
      const data = res.data.map((r) => ({
        id: r.vendor.vendorId,
        businessName: r.vendor.businessName,
        businessCategory: null,
        businessAddress: null,
        preparationTime: r.vendor.preparationTime,
        isPreorder: null,
        isFavourite: r.favourite.isFavourite,
        golive: null,
        totalOrders: null,
        profileImg: r.vendor.profileImg,
        createdAt: r.favourite.createdAt,
        ratings: r.vendor.ratings,
      }));
      return data;
    },
  });
};
