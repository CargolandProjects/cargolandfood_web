"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { RiMapPin2Line, RiMapPinFill } from "react-icons/ri";
import { AddressAutocomplete } from "../googlePlaces/AddressAutocomplete";
import { useApiLoadingStatus } from "@vis.gl/react-google-maps";
import {
  useAddAddress,
  useSetGuestAddress,
} from "@/lib/hooks/mutations/useAddress";
import { statusMessages } from "./AddressModal";
import { getAddressComponent } from "@/lib/utils";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";
import { useGuestLocation } from "@/lib/hooks/useGuestLocation";
import { Loader2 } from "lucide-react";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
import { Button } from "../ui/button";
import { useUIStore } from "@/lib/stores/uiStore";

const LocationConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const openAddress = useUIStore((s) => s.openAddresses);

  const { isAuthenticated, user: session } = useSession();
  const { setGuestLocation } = useGuestLocation();
  const { zoneId } = useActiveZone();

  const { mutate: addAddress, isPending } = useAddAddress();
  const { mutate: setGuestaddress, isPending: isGuestPending } =
    useSetGuestAddress();

  // We need to know when places library is ready to disable the input
  const apiLoadingStatus = useApiLoadingStatus();
  const isMapsLoaded = apiLoadingStatus === "LOADED";
  const apiStatusMsg = statusMessages[apiLoadingStatus];

  //   Handle initial popup and 30 minute interval popups
  useEffect(() => {
    // 1. Delay the first appearance by 1 second so the page finishes painting
    if (!isAuthenticated || !session?.isLocationSet) return; // Don't show the modal if the user is authenticated or if a zone is already set
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    // 2. Set up the 30-minute repeating interval
    const intervalTimer = setInterval(
      () => {
        setIsOpen(true);
      },
      30 * 60 * 1000,
    ); // 30 minutes in milliseconds

    // Cleanup on unmount or refresh
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [isAuthenticated, session?.isLocationSet]);

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

  const handleOpenAddress = () => {
    openAddress({ source: "general" });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="dialog min-h-auto! px-4! sm:px-9.5! max-sm:py-8! sm:pt-[32.5]! sm:pb-[48.5px]!"
      >
        <DialogHeader className="items-center">
          <div className="size-[72px] bg-primary/8 rounded-full flex justify-center items-center">
            <RiMapPinFill className="text-primary size-10" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Deliver To This Address
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3">
          <div className="relative w-full h-10  rounded-button border border-neutral-300 focus-within:bg-neutral-100">
            <RiMapPin2Line className="absolute top-1/2 -translate-y-1/2 size-5 text-neutral-500 shrink-0 ml-3 mr-2 text-primary" />
            <AddressAutocomplete
              value={inputValue}
              onChange={setInputValue}
              onSelect={handleCreateAddress}
              countryCode="NG"
              placeholder={apiStatusMsg}
              readOnly={!isMapsLoaded}
              className="flex-1"
              inputClassName="h-full px-10 py-2.5 text-sm font-medium rounded-button placeholder:text-[#8A8F98] border-none ring-0 focus-visible:ring-0 w-full"
            />
            {(isPending || isGuestPending) && (
              <Loader2 className="absolute right-2 transform text-primary top-1/2 -translate-y-1/2 size-4 animate-spin duration-300" />
            )}
          </div>

          <p className="mt-3 text-base leading-5 text-center text-neutral-800/90">
            {zoneId
              ? "If you're in a new location, update it to find nearby restaurants offering delivery."
              : "We currently don't support this current location, select a different address to access our offerings."}
          </p>
        </div>

        <DialogFooter className=" mt-8 flex-col! gap-3">
          <Button
            onClick={() => setIsOpen(false)}
            className="submit-btn py-3.5 flex-1"
          >
            USE MY CURRENT LOCATION
          </Button>
          <Button
            onClick={handleOpenAddress}
            variant="outline"
            className="submit-btn py-3.5 flex-1 hover:bg-gray-50 text-primary-800 border-primary"
          >
            CHOOSE A DIFFERENT ADDRESS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationConfirmationModal;
