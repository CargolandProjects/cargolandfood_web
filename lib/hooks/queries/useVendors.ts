import { vendors } from "@/lib/services/vendors.service";
import { useQuery } from "@tanstack/react-query";

export const useVendors = () => {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: vendors.getAllVendors,
  });
};

export const useGetVendorById = (id: string) => {
  return useQuery({
    queryKey: ["vendorById", id],
    queryFn: () => vendors.getVendorById(id),
    enabled: !!id,
  });
};
