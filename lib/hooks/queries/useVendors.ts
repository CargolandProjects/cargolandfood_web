import { vendorById, vendors } from "@/lib/services/vendors.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useVendors = (zoneId: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ["vendors", zoneId, limit],
    queryFn: ({ pageParam }) => vendors.getAllVendors(zoneId, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!zoneId.trim(),
  });
};

export const useVendorsByCategory = (
  zoneId: string,
  query: string,
  limit: number = 10
) => {
  return useInfiniteQuery({
    queryKey: ["vendorsByCategory", zoneId, query, limit],
    queryFn: ({ pageParam }) =>
      vendors.getVendorsByCategory(zoneId, query, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!zoneId && !!query,
  });
};

export const useDiscountVendors = (zoneId: string) => {
  return useQuery({
    queryKey: ["discountVendors", zoneId],
    queryFn: () => vendors.getDiscountVendors(zoneId),
    enabled: !!zoneId,
    select: res => res.data
  });
};

export const useVendorMenuById = (id: string, initialData?: vendorById) => {
  return useQuery({
    queryKey: ["vendorById", id],
    queryFn: () => vendors.getVendorMenuById(id),
    enabled: !!id,
    initialData,
    staleTime: initialData ? 5 * 60 * 1000 : 0, // 5 minutes if we have initial data
    refetchOnMount: !initialData, // Don't refetch immediately if we have initial data
  });
};
