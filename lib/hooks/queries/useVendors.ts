import { vendorById, vendors } from "@/lib/services/vendors.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useVendors = (
  zoneId: string,
  lat: string = "",
  lng: string = "",
  limit: number = 10
) => {
  return useInfiniteQuery({
    queryKey: ["vendors", zoneId, lat, lng, limit],
    queryFn: ({ pageParam }) =>
      vendors.getAllVendors(zoneId, pageParam, limit, lat, lng),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!zoneId.trim(),
  });
};

export const useVendorsByCategory = (
  zoneId: string,
  query: string,
  lat: string = "",
  lng: string = "",
  limit: number = 10
) => {
  return useInfiniteQuery({
    queryKey: ["vendorsByCategory", zoneId, lat, lng, query, limit],
    queryFn: ({ pageParam }) =>
      vendors.getVendorsByCategory(zoneId, query, lat, lng, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!zoneId && !!query,
  });
};

export const useDiscountVendors = (
  zoneId: string,
  lat: string = "",
  lng: string = ""
) => {
  return useQuery({
    queryKey: ["discountVendors", zoneId, lat, lng],
    queryFn: () => vendors.getDiscountVendors(zoneId, lat, lng),
    enabled: !!zoneId,
    select: (res) => res.data,
  });
};

export const useVendorMenuById = (
  id: string,
  lat: string = "",
  lng: string = "",
  limit: number = 10,
  initialData?: vendorById
) => {
  return useInfiniteQuery({
    queryKey: ["vendorById", id, limit],
    queryFn: ({ pageParam }) =>
      vendors.getVendorMenuById(id, pageParam, limit, lat, lng),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!id,
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
    staleTime: initialData ? 10 * 60 * 1000 : 0,
  });
};
