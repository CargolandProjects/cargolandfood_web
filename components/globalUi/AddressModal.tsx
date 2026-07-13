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
import {
  address,
  AddressComponent,
  GetAddress,
} from "@/lib/services/address.service";
import {
  LocationAutocomplete,
  SelectedPlace,
} from "react-google-places-autocomplete-modern";

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
  const { mutate: addAddress } = useAddAddress();
  const { mutate: selectAddress, isPending: isSelecting } = useSelectAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setGuestaddress } = useSetGuestAddress();

  const { setGuestLocation } = useGuestLocation();
  const { mutate: updateCartAddress } = useUpdateCheckout();

  const [inputValue, setInputValue] = useState("");

  function getAddressComponent(components: AddressComponent[], type: string) {
    return components.find((c) => c.types.includes(type))?.longText || "";
  }

  // console.log("Suggestions:", data);

  //   const handleCartAddress = () => {
  // )
  //   }

  const handleCreate = async (selectedPlace: SelectedPlace) => {
    // Validate the selected place has geometry
    const placeId = selectedPlace.placeId;

    const placeDetails = await address.getPlaceDetails(placeId);
    console.log("PLACES COMPONENT:", placeDetails);

    // Extract coordinates
    const lat = placeDetails.location.latitude;
    const lng = placeDetails.location.longitude;
    const components = placeDetails.addressComponents || [];

    if (!lat || !lng) {
      toast.error("Selected place does not have valid coordinates.");
      return;
    }
    // Build the payload exactly as before
    const payload = {
      addressLine1: placeDetails.formattedAddress || "",
      addressLine2: "",
      city:
        getAddressComponent(components, "locality") ||
        getAddressComponent(components, "administrative_area_level_2"),
      state: getAddressComponent(components, "administrative_area_level_1"),
      postalCode: getAddressComponent(components, "postal_code"),
      country: getAddressComponent(components, "country"),
      latitude: lat.toLocaleString(),
      longitude: lng.toLocaleString(),
      placeId: placeDetails.id || "",
      provider: "",
      instructions: "",
    };

    console.log("Payload is ready:", payload);

    // Now use the exact same logic as before
    if (isAuthenticated) {
      addAddress(payload, {
        onSuccess: (res) => {
          if (source === "checkout") {
            if (!deliveryType || !payload || !vendorId) {
              toast.error("Delivery type & address is required");
              return;
            }
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
                onSettled: () => setSettingId(null),
              },
            );
          }

          if (res.message.includes("no vendors available")) {
            toast.warning(res.message);
          }

          setInputValue("");
        },
      });
    } else {
      const guestPayload = {
        latitude: lat.toLocaleString(),
        longitude: lng.toLocaleString(),
      };
      setGuestaddress(guestPayload, {
        onSuccess: (data) => {
          toast.success("Guest location set");
          setGuestLocation({
            zoneId: data.zoneId,
            addressLine1: placeDetails.formattedAddress || "",
          });

          setInputValue("");
          close();
        },
      });
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
            <div className="relative w-full flex items-center rounded-button border border-neutral-300 focus-within:bg-neutral-100">
              <RiMapPin2Line className="size-5 text-neutral-500 shrink-0 ml-3 mr-2 self-start my-2.5" />
              <LocationAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                value={inputValue}
                onChange={setInputValue}
                onSelect={handleCreate} // Your new handler
                countries={["NG"]}
                debounceMs={400}
                minLength={2}
                placeholder="Add new address"
                error={false}
                suggestionsClassName="absolute left-0 w-full border border-neutral-400 rounded-xl mt-1 bg-white m-0!"
                className="w-full"
                inputClassName="relative flex-1 w-full h-full px-3 pr-9 py-2.5 text-sm font-medium rounded-button placeholder:text-[#8A8F98] border-none focus-visible:outline-none"
                // dropdownClassName="border border-neutral-400 rounded-xl p-1 mt-1 max-h-60 overflow-auto"
                renderSuggestion={(suggestion) => (
                  <div className="hover:cursor-pointer hover:bg-gray-100 p-1 rounded-md">
                    <p className="text-sm">{suggestion.description}</p>
                  </div>
                )}
              />
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
                        settingId === address.id && "animate-pulse duration-300"
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
