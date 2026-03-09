import { cart } from "@/lib/services/cart.service";
import { useQuery } from "@tanstack/react-query";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cart.getCart,
    refetchOnMount: true,
    staleTime: 0,
    select: (res) => res.data
  });
};
