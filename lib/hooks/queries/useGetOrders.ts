import { orderService } from "@/lib/services/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getOrders,
    select: (data) => data.data,
  });
};
