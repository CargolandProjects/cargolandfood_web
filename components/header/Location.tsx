import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RiMapPinFill, RiArrowDownSLine } from "react-icons/ri";
import { GuestLocation } from "@/lib/stores/guestLocationStore";
import { GetAddress } from "@/lib/services/address.service";
import { useUIStore } from "@/lib/stores/uiStore";

interface LocationProps {
  guestLocation: GuestLocation | null;
  defaultAddress: GetAddress | undefined;
  isAuthenticated: boolean;
}

const Location = ({
  guestLocation,
  defaultAddress,
  isAuthenticated,
}: LocationProps) => {
  const openAddress = useUIStore((s) => s.openAddresses);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex">
          <RiMapPinFill className="size-6 text-primary mb-1" />
          <div className="text-left ml-0.5 flex-1 sm:space-y-0.5">
            <p className="text-xs font-medium leading-4">Your Location</p>
            <p className="text-xxs leading-3 text-gray-600 line-clamp-1 max-w-[120px]">
              {(isAuthenticated
                ? defaultAddress?.addressLine1
                : guestLocation?.addressLine1) || "No location selected"}
            </p>
          </div>
          <RiArrowDownSLine className="size-5 text-neutral-600 ml-0.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem>
          {(isAuthenticated
            ? defaultAddress?.addressLine1
            : guestLocation?.addressLine1) || "No location selected"}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => openAddress({ source: "general" })}>
          Add new location
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Location;
