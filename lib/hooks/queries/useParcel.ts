import { parcel } from "@/lib/services/parcel.service";
import { useQuery } from "@tanstack/react-query";

export const useActiveParcel = () => {
  return useQuery({
    queryKey: ["activeParcel"],
    queryFn: parcel.getActiveParcel,
    select: (res) => res.data,
  });
};

export const useGetParcels = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: ["allParcels"],
    queryFn: parcel.getAllParcels,
    select: (res) => res.data,
    enabled: isAuthenticated,
  });
};

export const useTrackParcel = (parcelId: string) => {
  return useQuery({
    queryKey: ["trackParcel", parcelId],
    queryFn: () => parcel.getParcelById(parcelId),
    select: (res) => res.data,
    enabled: !!parcelId,
  });
};

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
    select: (res) => res.data,
    enabled: hasRequiredParams,
  });
};
