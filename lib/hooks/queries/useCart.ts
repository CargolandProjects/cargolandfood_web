import { cart } from "@/lib/services/cart.service";
import { useQuery } from "@tanstack/react-query";

export const useCart = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cart.getCart,
    refetchOnMount: true,
    staleTime: 0,
    enabled: isAuthenticated,
    select: (res) => res.data,
  });
};
