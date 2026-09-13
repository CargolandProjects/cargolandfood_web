import { ParcelType } from "./Parcel";
import { RiMapPin2Fill, RiSearchLine } from "react-icons/ri";
import {
  APILoadingStatus,
  useApiLoadingStatus,
} from "@vis.gl/react-google-maps";
import { AddressAutocomplete } from "../googlePlaces/AddressAutocomplete";
import { ParcelDetailsData } from "./ParcelDetails";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { toast } from "sonner";

const ParcelRoute = ({ type }: { type: ParcelType | null }) => {
  const { control, watch, setValue } = useFormContext<ParcelDetailsData>();

  const pickup = watch("pickUpAddrName");
  const dropOff = watch("dropOffAddrName");

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

  const handleSetRoute = (
    place: google.maps.places.Place,
    type: "PICKUP" | "DROPOFF",
  ) => {
    const addr = place.formattedAddress || "";
    const lat = place.location?.lat();
    const lng = place.location?.lng();

    if (!lat || !lng) {
      toast.error("Latitude or longitude is missing for the default address");
      return;
    }

    if (type === "PICKUP") {
      setValue("pickUpAddrLat", lat.toString());
      setValue("pickUpAddrLng", lng.toString());
      setValue("pickUpAddrName", addr);
    }

    if (type === "DROPOFF") {
      setValue("dropOffAddrLat", lat.toString());
      setValue("dropOffAddrLng", lng.toString());
      setValue("dropOffAddrName", addr);
    }
  };

  return (
    <FieldGroup className="gap-0">
      {/* Origin */}
      <div className="relative flex gap-2.5 pb-8.5">
        {/* Vertical bar */}
        <div className="absolute inset-y-0 h-[73%] left-2.75 top-6.5 px-px bg-primary" />

        {/*  point indicator */}
        <div className="p-[1.5] h-fit flex shrink-0 items-center justify-center rounded-full border border-primary-100">
          <div className="size-5 rounded-full bg-primary" />
        </div>

        <Controller
          name="pickUpAddrName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="origin" className="text-sm font-medium">
                Pick up
              </FieldLabel>
              {type === "SEND" ? (
                <div className="form-input mt-2 px-4 h-12 flex items-center gap-3">
                  <RiMapPin2Fill className="size-6 text-primary" />

                  <p className="text-base leading-5 line-clamp-1">{pickup}</p>
                </div>
              ) : (
                <div className="mt-2 relative">
                  <RiSearchLine className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <AddressAutocomplete
                    value={pickup}
                    onChange={field.onChange}
                    placeholder={apiStatusMsg}
                    onSelect={(place) => handleSetRoute(place, "PICKUP")}
                    countryCode="NG"
                    readOnly={!isMapsLoaded}
                    className="flex-1"
                    inputClassName="form-input w-full h-10 pl-10 placeholder:text-gray-600!"
                  />
                </div>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Destination */}
      <div className="flex gap-2.5">
        {/*  point indicator */}
        <div className="p-[1.5] h-fit flex shrink-0 items-center justify-center rounded-full border border-ray-200">
          <div className="size-5 rounded-full bg-gray-200" />
        </div>

        <Controller
          name="dropOffAddrName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="origin" className="text-sm font-medium">
                Drop off
              </FieldLabel>
              {type === "RECEIVE" ? (
                <div className="form-input mt-2 px-4 h-12 flex items-center gap-3">
                  <RiMapPin2Fill className="size-6 text-primary" />

                  <p className="text-base leading-5 line-clamp-1">{dropOff}</p>
                </div>
              ) : (
                <div className="mt-2 relative">
                  <RiSearchLine className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <AddressAutocomplete
                    value={dropOff}
                    onChange={field.onChange}
                    placeholder={apiStatusMsg}
                    onSelect={(place) => handleSetRoute(place, "DROPOFF")}
                    countryCode="NG"
                    readOnly={!isMapsLoaded}
                    className="flex-1"
                    inputClassName="form-input w-full h-10 pl-10 placeholder:text-gray-600!"
                  />
                </div>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </FieldGroup>
  );
};

export default ParcelRoute;
