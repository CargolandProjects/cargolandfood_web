import { orderService } from "@/lib/services/order.service";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = (isAuthenticatedd: boolean) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getOrders,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    enabled: isAuthenticatedd,
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

export const useOrderByReference = (reference: string) => {
  return useQuery({
    queryKey: ["orderDetails", reference],
    queryFn: () => orderService.getOrderByReference(reference),
    enabled: !!reference,
    select: (res) => res.data,
  });
};

export const useTrackOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["trackOrder", orderId],
    queryFn: () => orderService.trackOrder(orderId),
    enabled: !!orderId,
    select: (res) => res.data,
  });
};
