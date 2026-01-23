import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "../../ui/dialog";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { RiDeleteBin6Line, RiMapPin2Line } from "react-icons/ri";
import { useAddresses } from "@/lib/hooks/queries/useAddresses";
import { Loader2 } from "lucide-react";
import type { Suggestion } from "use-places-autocomplete";
import { Input } from "@/components/ui/input";
import { useAddress, useDeleteAddress } from "@/lib/hooks/mutations/useAddress";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AddressProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const AddressModal = ({ open, onOpenChange }: AddressProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data: addresses, isLoading, isError, isSuccess } = useAddresses();
  const { mutate: addAddress, isPending } = useAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const {
    ready,
    value,
    suggestions: { data, loading },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["address"],
      componentRestrictions: { country: "NG" }, // Change to your country
    },
    debounce: 400,
  });

  // console.log("The addresses debugging log:", {
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   addresses,
  // });

  function getAddressComponent(
    components: google.maps.GeocoderAddressComponent[],
    type: string
  ) {
    return components.find((c) => c.types.includes(type))?.long_name || "";
  }

  // console.log("Suggestions:", data);

  const handleSelect = async (address: Suggestion) => {
    const { description, place_id } = address;
    setValue(description, false);

    try {
      const results = await getGeocode({ placeId: place_id });
      console.log(" GeoCode Results:", results);
      const { lat, lng } = await getLatLng(results[0]);

      const placeDetails = results[0];
      const components = placeDetails.address_components;

      console.log("Place Details:", placeDetails);

      const payload = {
        addressLine1: placeDetails.formatted_address,
        addressLine2: "string",
        city:
          getAddressComponent(components, "locality") ||
          getAddressComponent(components, "administrative_area_level_2"),
        state: getAddressComponent(components, "administrative_area_level_1"),
        postalCode: getAddressComponent(components, "postal_code"),
        country: getAddressComponent(components, "country"),
        latitude: lat.toLocaleString(),
        longitude: lng.toLocaleString(),
        placeId: placeDetails.place_id,
        provider: "string",
        instructions: "string",
      };

      // console.log("Payload:", payload);

      addAddress(payload, {
        onSuccess: () => {
          setValue("");
          clearSuggestions();
        },
      });
      // setValue("");
    } catch (error) {
      console.error("Error getting geocode:", error);
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteAddress(id, {
      onSettled: () => setDeletingId(null),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog max-sm:px-6! overflow-auto! hide-scrollbar pb-7!">
        <DialogHeader>
          <DialogTitle className="dialog-title mt-[74px]">
            Addresses
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {/* Google Places Autocomplete */}
          <div className="mt-6">
            <div className="relative w-full h-10 flex items-center rounded-button border border-neutral-300 focus-within:bg-neutral-100">
              <RiMapPin2Line className="size-5 text-neutral-500 shrink-0 ml-3 mr-2" />
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Add new address"
                className=" flex-1 h-full px-3 pr-9 py-2.5 text-sm font-medium rounded-button placeholder:text-[#8A8F98] border-none ring-0 focus-visible:ring-0"
              />
              {(isPending || loading) && (
                <Loader2 className="absolute right-2 transform text-primary top-1/2 -translate-y-1/2 size-4 animate-spin duration-300" />
              )}
            </div>

            {/* Google Places Suggestions */}
            <AnimatePresence mode="wait">
              {value && !loading && (
                <motion.div
                  key="addresses-loader"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="border border-neutral-400 rounded-xl p-1  mt-1"
                >
                  {!loading && data.length === 0 && (
                    <p className="text-center mt-0.5">No addresses found.</p>
                  )}
                  <div className="space-y-1">
                    {!loading &&
                      data.length > 0 &&
                      data.map((address) => (
                        <div
                          onClick={() => handleSelect(address)}
                          className="hover:cursor-pointer hover:bg-gray-100 p-1"
                          key={address.place_id}
                        >
                          <p className="text-sm">{address.description}</p>
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Users Address List */}
          <div className="mt-4">
            {isLoading && (
              <Loader2 className="size-8 transition duration-300 animate-spin text-primary mx-auto mt-4" />
            )}

            {!isLoading && isError && (
              <p className="text-red-400 text-center">
                Failed to fetch addresses
              </p>
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
                    key={address.id}
                    className="flex items-center justify-between w-full py-2.5"
                  >
                    <p className="text-sm text-neutral-600 max-w-[260px] line-clamp-1">
                      {address.addressLine1}
                    </p>
                    <button
                      onClick={() => handleDelete(address.id)}
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
