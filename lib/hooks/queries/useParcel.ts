import { parcel } from "@/lib/services/parcel.service";
import { useQuery } from "@tanstack/react-query";

export const useGetParcelDlFees = ({
  pickUpAddrLat,
  dropOffAddrLng,
  dropOffAddrLat,
  pickUpAddrLng,
  packageWorth,
  packageIsurance,
}: {
  pickUpAddrLat: string;
  pickUpAddrLng: string;
  dropOffAddrLat: string;
  dropOffAddrLng: string;
  packageIsurance: boolean;
  packageWorth: string;
}) => {
  const hasRequiredParams = Boolean(
    pickUpAddrLat &&
    pickUpAddrLng &&
    dropOffAddrLat &&
    dropOffAddrLng &&
    packageWorth,
  );
  return useQuery({
    queryKey: [
      "parcel-delivery-fees",
      pickUpAddrLat,
      dropOffAddrLng,
      dropOffAddrLat,
      pickUpAddrLng,
      packageWorth,
      packageIsurance,
    ],
    queryFn: () =>
      parcel.getDeliveryFees({
        pickUpAddrLat,
        dropOffAddrLng,
        dropOffAddrLat,
        pickUpAddrLng,
        packageWorth,
        packageIsurance,
      }),
    enabled: hasRequiredParams,
  });
};
