import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

import { RiDeleteBin6Line, RiLoader2Line, RiMapPin2Line } from "react-icons/ri";
import { useAddresses } from "@/lib/hooks/queries/useAddresses";
import { Loader2 } from "lucide-react";
import {
  useAddAddress,
  useDeleteAddress,
  useSelectAddress,
  useSetGuestAddress,
} from "@/lib/hooks/mutations/useAddress";
import React, { useState } from "react";
import { useUIStore } from "@/lib/stores/uiStore";
import { toast } from "sonner";
import { useSession } from "@/lib/hooks/useSession";
import { useGuestLocation } from "@/lib/hooks/useGuestLocation";
import { Button } from "../ui/button";
import { useUpdateCheckout } from "@/lib/hooks/mutations/useUpdateCheckout";
import { GetAddress } from "@/lib/services/address.service";
import {
  useApiLoadingStatus,
  APILoadingStatus,
} from "@vis.gl/react-google-maps";
import { AddressAutocomplete } from "../googlePlaces/AddressAutocomplete";
import { getAddressComponent } from "@/lib/utils";



const statusMessages: Record<APILoadingStatus, string> = {
  NOT_LOADED: "Add new address",
  LOADING: "Loading maps...",
  LOADED: "Add new address",
  FAILED: "Initialization failed",
  AUTH_FAILURE: "API key error – please contact support",
};

const AddressModal = () => {
  const open = useUIStore((s) => s.addresses.open);
  const close = useUIStore((s) => s.closeAddresses);
  const source = useUIStore((s) => s.addresses.payload?.source) || "general";
  const vendorId = useUIStore((s) => s.addresses.payload?.vendorId);
  const deliveryType = useUIStore((s) => s.addresses.payload?.deliveryType);
  const { isAuthenticated } = useSession();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [settingId, setSettingId] = useState<string | null>(null);
  const {
    data: addresses,
    isLoading,
    isError,
    isSuccess,
    refetch,
    isFetching,
  } = useAddresses(isAuthenticated);
  const { mutate: addAddress, isPending } = useAddAddress();
  const { mutate: selectAddress, isPending: isSelecting } = useSelectAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setGuestaddress, isPending: isGuestPending } =
    useSetGuestAddress();

  const { setGuestLocation } = useGuestLocation();
  const { mutate: updateCartAddress } = useUpdateCheckout();

  // We need to know when places library is ready to disable the input
  const apiLoadingStatus = useApiLoadingStatus();
  const isMapsLoaded = apiLoadingStatus === "LOADED";

  const apiStatusMsg = statusMessages[apiLoadingStatus];

  const [inputValue, setInputValue] = useState("");

  // console.log("Suggestions:", apiStatusMsg);

  const handleCreateAddress = async (place: google.maps.places.Place) => {
    try {
      // The place already has the fields we requested in AddressAutocomplete
      const lat = place.location?.lat() || 0;
      const lng = place.location?.lng?.() || 0;
      const components = place.addressComponents || [];

      if (isAuthenticated) {
        const payload = {
          addressLine1: place.formattedAddress || "",
          addressLine2: "",
          city:
            getAddressComponent(components, "locality") ||
            getAddressComponent(components, "administrative_area_level_2"),
          state: getAddressComponent(components, "administrative_area_level_1"),
          postalCode: getAddressComponent(components, "postal_code"),
          country: getAddressComponent(components, "country"),
          latitude: lat.toLocaleString(),
          longitude: lng.toLocaleString(),
          placeId: place.id,
          provider: "",
          instructions: "",
        };

        addAddress(payload, {
          onSuccess: (res) => {
            if (source === "checkout") {
              if (!deliveryType || !payload || !vendorId) {
                toast.error("Delivery type & address is required");
                return;
              }
              // For updating address from checkout
              updateCartAddress(
                {
                  vendorId,
                  payload: {
                    deliveryType: deliveryType,
                    addressSnapShot: res.data,
                  },
                },
                {
                  onSuccess: () => {
                    toast.success("Delivery Address updated successfully");
                    close();
                  },
                  onError: (res) => {
                    toast.error(res.message);
                  },
                  onSettled: () => [setSettingId(null)],
                },
              );
            }

            setInputValue("");
            if (res.message.includes("no vendors available"))
              toast.warning(res.message);
          },
        });
      } else {
        const guestPayload = {
          latitude: lat.toLocaleString(),
          longitude: lng.toLocaleString(),
        };
        setGuestaddress(guestPayload, {
          onSuccess: (res) => {
            setInputValue("");
            setGuestLocation({
              zoneId: res.zoneId,
              addressLine1: place.formattedAddress || "",
            });
            if (res.message.includes("no vendors available"))
              toast.warning(res.message);

            close();
          },
        });
      }
    } catch (error) {
      console.error("Error getting geocode:", error);
      toast.error("Failed to add address. Please try again.");
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(id);
    deleteAddress(id, {
      onSettled: () => setDeletingId(null),
    });
  };

  const handleSelect = (address: GetAddress) => {
    if (isSelecting) return;

    // if (!deliveryType) return;
    setSettingId(address.id);

    // For setting address from the checkout
    if (source === "checkout") {
      if (!deliveryType || !address || !vendorId) {
        toast.error("Delivery type & address is required");
        return;
      }
      updateCartAddress(
        {
          vendorId,
          payload: {
            deliveryType: deliveryType,
            addressSnapShot: address,
          },
        },
        {
          onSuccess: () => {
            toast.success("Delivery Address successfully selected");
            close();
          },
          onError: (res) => {
            toast.error(res.message);
          },
          onSettled: () => [setSettingId(null)],
        },
      );
      return;
    }

    selectAddress(address.id, {
      onSettled: () => setSettingId(null),
    });
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="dialog max-sm:px-6! flex flex-col overflow-auto! hide-scrollbar pb-7!">
        <DialogHeader>
          <DialogTitle className="dialog-title mt-[74px]">
            Addresses
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 h-full flex-1 flex flex-col">
          {/* Google Places Autocomplete */}
          <div className="mt-6">
            <div className="relative w-full h-10  rounded-button border border-neutral-300 focus-within:bg-neutral-100">
              <RiMapPin2Line className="absolute top-1/2 -translate-y-1/2 size-5 text-neutral-500 shrink-0 ml-3 mr-2" />
              <AddressAutocomplete
                value={inputValue}
                onChange={setInputValue}
                onSelect={handleCreateAddress}
                countryCode="NG"
                placeholder={apiStatusMsg}
                readOnly={!isMapsLoaded}
                className="flex-1"
                inputClassName="h-full px-3 px-9 py-2.5 text-sm font-medium rounded-button placeholder:text-[#8A8F98] border-none ring-0 focus-visible:ring-0 w-full"
              />
              {(isPending || isGuestPending) && (
                <Loader2 className="absolute right-2 transform text-primary top-1/2 -translate-y-1/2 size-4 animate-spin duration-300" />
              )}
            </div>
          </div>

          {/* Users Address List */}
          <div className="mt-8 flex-1 flex flex-col">
            {isLoading && (
              <Loader2 className="size-8 transition duration-300 animate-spin text-primary mx-auto mt-4" />
            )}

            {isError && (
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 flex-1">
                <p className="text-red-400 text-center">
                  Failed to fetch addresses
                </p>

                <Button onClick={() => refetch()} className="w-20">
                  {isFetching ? (
                    <RiLoader2Line className="size-5 animate-spin" />
                  ) : (
                    "Refetch"
                  )}
                </Button>
              </div>
            )}

            {isSuccess && addresses.length === 0 && (
              <p className="text-neutral-600 text-center">
                No address added yet
              </p>
            )}

            {isSuccess && addresses.length > 0 && (
              <div className="space-y-4 mb-2">
                {addresses.map((address) => (
                  <div
                    onClick={() => handleSelect(address)}
                    key={address.id}
                    className="flex items-center justify-between w-full py-2.5 hover:cursor-pointer"
                  >
                    <p
                      className={`${
                        settingId === address.id
                          ? "animate-pulse duration-300"
                          : ""
                      } text-sm text-neutral-600 max-w-[260px] line-clamp-1`}
                    >
                      {address.addressLine1}
                    </p>
                    <button
                      onClick={(e: React.MouseEvent) =>
                        handleDelete(address.id, e)
                      }
                      className="size-9 rounded-full flex justify-center items-center bg-cargo-error/7"
                    >
                      {address.id === deletingId ? (
                        <Loader2 className="size-5 animate-spin text-cargo-error/60" />
                      ) : (
                        <RiDeleteBin6Line className="size-5 text-cargo-error" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
