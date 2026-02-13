import { reviews } from "@/lib/services/reviews.service";
import { useQuery } from "@tanstack/react-query";

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: reviews.getReviews,
    select: (data) => data.data,
  });
};
