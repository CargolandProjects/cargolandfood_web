import { favourites } from "@/lib/services/favourites.service";
import { useQuery } from "@tanstack/react-query";

export const useFavourites = (userId: string) => {
  return useQuery({
    queryKey: ["favourites", userId],
    queryFn: () => favourites.getAllFavourites(userId),
    enabled: !!userId,
    select: (data) => data.data,
  });
};
