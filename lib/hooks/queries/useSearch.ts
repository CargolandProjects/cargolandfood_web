import { menu } from "@/lib/services/menu.service";
import { useQuery } from "@tanstack/react-query";

export const useSearchVendorMenu = (
  zoneId: string | null,
  query: string | null
) => {
  return useQuery({
    queryKey: ["search", zoneId, query],
    queryFn: () => menu.getSearchItems(zoneId ?? "", query ?? ""),
    enabled: !!query && !!zoneId,
    // The mapping adds the uploadImageUrl property to match what the consuming component expects
    select: (res) =>
      res.products.map((product) => ({
        ...product,
        uploadImageUrl: product.imageUrl,
        vendorId: product.vendor.id,
      })),
  });
};
