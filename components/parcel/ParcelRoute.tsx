import { ParcelType } from "./Parcel";
import { Label } from "../ui/label";
import { RiMapPin2Fill, RiSearchLine } from "react-icons/ri";
import {
  APILoadingStatus,
  useApiLoadingStatus,
} from "@vis.gl/react-google-maps";
import { AddressAutocomplete } from "../googlePlaces/AddressAutocomplete";
import { Button } from "../ui/button";
import { ParcelSteps } from "./ParcelDetails";

const ParcelRoute = ({
  type,
  route,
  setRoute,
  setStep,
}: {
  type: ParcelType | null;
  route: {
    origin: string;
    destination: string;
  };
  setRoute: (value: string, type: "ORIGIN" | "DESTINATION") => void;
  setStep: (v: ParcelSteps) => void;
}) => {
  const apiLoadingStatus = useApiLoadingStatus();
  const isMapsLoaded = apiLoadingStatus === "LOADED";

  const placeholder = type === "SEND" ? "Where to?" : "Where from?";
  const statusMessages: Record<APILoadingStatus, string> = {
    NOT_LOADED: placeholder,
    LOADING: "Loading maps...",
    LOADED: placeholder,
    FAILED: "Initialization failed",
    AUTH_FAILURE: "API key error – please contact support",
  };

  const apiStatusMsg = statusMessages[apiLoadingStatus];

  const disabled = !route.origin || !route.destination;

  const handleSetRoute = (
    place: google.maps.places.Place,
    type: "ORIGIN" | "DESTINATION",
  ) => {
    const value = place.formattedAddress || "";
    setRoute(value, type);
  };

  return (
    <div>
      {/* Origin */}
      <div className="relative flex gap-2.5 pb-8.5">
        {/* Vertical bar */}
        <div className="absolute inset-y-0 h-[73%] left-2.75 top-[26px] px-px bg-primary" />

        {/*  point indicator */}
        <div className="p-[1.5] h-fit flex shrink-0 items-center justify-center rounded-full border border-primary-100">
          <div className="size-5 rounded-full bg-primary" />
        </div>

        <div className="w-full">
          <Label htmlFor="origin" className="text-sm font-medium">
            Pick up
          </Label>
          {type === "SEND" ? (
            <div className="form-input mt-2 px-4 h-12 flex items-center gap-3">
              <RiMapPin2Fill className="size-6 text-primary" />

              <p className="text-base leading-5 line-clamp-1">{route.origin}</p>
            </div>
          ) : (
            <div className="mt-2 relative">
              <RiSearchLine className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <AddressAutocomplete
                value={route.origin}
                onChange={(e) => setRoute(e, "ORIGIN")}
                placeholder={apiStatusMsg}
                onSelect={(place) => handleSetRoute(place, "ORIGIN")}
                countryCode="NG"
                readOnly={!isMapsLoaded}
                className="flex-1"
                inputClassName="form-input w-full h-10 pl-10 placeholder:text-gray-600!"
              />
            </div>
          )}
        </div>
      </div>

      {/* Destination */}
      <div className="flex gap-2.5">
        {/*  point indicator */}
        <div className="p-[1.5] h-fit flex shrink-0 items-center justify-center rounded-full border border-ray-200">
          <div className="size-5 rounded-full bg-gray-200" />
        </div>

        <div className="w-full">
          <Label htmlFor="origin" className="text-sm font-medium">
            Drop off
          </Label>
          {type === "RECEIVE" ? (
            <div className="form-input mt-2 px-4 h-12 flex items-center gap-3">
              <RiMapPin2Fill className="size-6 text-primary" />

              <p className="text-base leading-5 line-clamp-1">
                {route.destination}
              </p>
            </div>
          ) : (
            <div className="mt-2 relative">
              <RiSearchLine className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <AddressAutocomplete
                value={route.destination}
                onChange={(e) => setRoute(e, "DESTINATION")}
                placeholder={apiStatusMsg}
                onSelect={(place) => handleSetRoute(place, "DESTINATION")}
                countryCode="NG"
                readOnly={!isMapsLoaded}
                className="flex-1"
                inputClassName="form-input w-full h-10 pl-10 placeholder:text-gray-600!"
              />
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={() => setStep("PARCEL_INFO")}
        disabled={disabled}
        className="mt-25 submit-btn"
      >
        Next
      </Button>
    </div>
  );
};

export default ParcelRoute;
