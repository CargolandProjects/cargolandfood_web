import { orderService } from "@/lib/services/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getOrders,
    select: (res) => res.data,
  });
};

export const useOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => orderService.orderDetails(orderId),
    enabled: !!orderId,
    select: (res) => res.data,
  });
};
