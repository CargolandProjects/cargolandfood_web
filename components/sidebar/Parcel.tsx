import { RiArrowGoBackLine, RiArrowLeftLine } from "react-icons/ri";
import { ActiveTab } from "./Sidebar";
import Loader from "../Loader";
import ErrorStateUi from "../ErrorStateUi";
import EmptyStateUi from "../EmptyStateUi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { Button } from "../ui/button";
import { statusStyles } from "@/lib/utils";
import { useUIStore } from "@/lib/stores/uiStore";
import UnauthenticatedUi from "../UnauthenticatedUi";
import { useGetParcels } from "@/lib/hooks/queries/useParcel";
import { ParcelStatus, type Parcel } from "@/lib/services/parcel.service";
import { Separator } from "../ui/separator";

interface OrdersProps {
  setActiveTab: (tab: ActiveTab) => void;
  isAuthenticated: boolean;
}

type Tabs = "current" | "previous";

function normalizeParcelStatus(backendStatus: ParcelStatus, parcel: Parcel) {
  // Handle unwanted statuses by mapping to appropriate UI status
  switch (backendStatus) {
    case "NEW":
      // NEW orders should show as ACCEPTED once accepted
      return "New";

    case "RIDER_ACCEPTED":
      return "Picked Up";

    case "PICKUP_ORDER":
      return "In Transit";

    case "RIDER_OUTSIDE":
      return "Out for Delivery";

    case "DELIVERED":
      return "Delivered";

    default:
      // Fallback: use most recent timestamp to determine current status
      if (parcel.deliveredAt) return "Delivered";
      if (parcel.riderOutsideAt) return "Out for Delivery";
      if (parcel.pickedupAt) return "In Transit";
      if (parcel.acceptedAt) return "Picked Up";
      return "RIDER_ACCEPTED";
  }
}

const Parcel = ({ setActiveTab, isAuthenticated }: OrdersProps) => {
  const {
    data: parcels,
    isLoading,
    isError,
    isSuccess,
  } = useGetParcels(isAuthenticated);
  const [currentTab, setCurrentTab] = useState<Tabs>("current");
  const openTrackParcel = useUIStore((s) => s.openTrackParcel);

  const filteredParcels =
    parcels?.filter((parcel) => {
      if (currentTab === "previous") return parcel.status === "DELIVERED";

      return parcel.status !== "DELIVERED";
    }) || [];

  const handleOpenTrackParcel = (parcelId: string) => {
    if (!parcelId) return;
    openTrackParcel({ parcelId });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => setActiveTab(null)}
          className="absolute left-0 max-sm:hidden"
        >
          <RiArrowGoBackLine className="size-5" />
        </button>
        <button
          onClick={() => setActiveTab(null)}
          className="absolute left-2.5 sm:hidden"
        >
          <RiArrowLeftLine className="size-5" />
        </button>
        <h2 className="text-lg leading-6">Parcel</h2>
      </div>

      {!isAuthenticated && (
        <UnauthenticatedUi description="You need to sign in before performing this action on Cargoland Food." />
      )}

      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <Loader size={12} />
        </div>
      )}

      {isError && (
        <div className="h-full flex justify-center items-center">
          <ErrorStateUi message="Error Fetching Parcel " />
        </div>
      )}

      {isSuccess && parcels.length === 0 && (
        <div className="h-full flex justify-center items-center">
          <EmptyStateUi
            message="No Orders yet"
            description="You haven’t added any food to favourite"
            btn
            btnText="Order now"
          />
        </div>
      )}

      {isSuccess && parcels.length > 0 && (
        <Tabs
          value={currentTab}
          onValueChange={(v) => setCurrentTab(v as Tabs)}
          className="mt-4 gap-1 flex-1 h-full flex flex-col"
        >
          <TabsList className="w-full min-h-12.5! bg-[#FEF3EB]">
            <TabsTrigger
              value="current"
              className="text-neutral-500 text-base font-medium leading-6"
            >
              Current
            </TabsTrigger>
            <TabsTrigger
              value="previous"
              className="text-neutral-500 text-base font-medium leading-6"
            >
              Previous
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="current"
            className="space-y-6 pt-3 pb-8 sm:pb-4 overflow-auto h-full hide-scrollbar"
          >
            {filteredParcels.length === 0 && (
              <p className="text-center text-sm">No current orders</p>
            )}

            {filteredParcels.map((parcel, idx) => {
              return (
                <div key={idx} className="p-3 border rounded-xl">
                  <div className="flex justify-between">
                    <p className="font-medium">{parcel.parcelOrderId}</p>

                    <p
                      className={`${statusStyles[parcel.status]?.containerStyles} px-2 py-1 rounded-full text-xxs font-medium leading-3`}
                    >
                      {normalizeParcelStatus(parcel.status, parcel)}
                    </p>
                  </div>

                  <Separator className="mt-3 mb-4 border-dashed border border-border bg-white" />

                  <div className="relative gap-2.5 space-y-4.75">
                    {/* Vertical bar */}
                    <div className="absolute inset-y-0 h-[39%] left-1.75 top-4.5 px-px bg-primary" />

                    {/* Pick up */}
                    <div className="flex gap-1 ">
                      {/*  point indicator */}
                      <div className="p-[1.5] h-fit flex shrink-0 items-center justify-center rounded-full border border-primary-100 w-fit">
                        <div className="size-3 rounded-full bg-primary" />
                      </div>
                      <div className="">
                        <p className="text-xs font-normal text-gray-600">
                          Pick Up
                        </p>
                        <p className="mt-0.75 line-clamp-1 font-medium break-all">
                          {parcel.pickUpAddrName}
                        </p>
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="flex gap-1 ">
                      {/*  point indicator */}
                      <div className="p-[1.5] h-fit flex shrink-0 items-center justify-center rounded-full border border-gray-200 w-fit">
                        <div className="size-3 rounded-full bg-gray-200" />
                      </div>
                      <div className="">
                        <p className="text-xs font-normal text-gray-600">
                          Destination
                        </p>
                        <p className="mt-0.75 line-clamp-1 font-medium break-all">
                          {parcel.dropOffAddrName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => handleOpenTrackParcel(parcel.id)}
                      variant="outline"
                      className="h-10 flex-1 uppercase rounded-button!"
                    >
                      Track Parcel
                    </Button>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent
            value="previous"
            className="space-y-6 pt-3 pb-8 sm:pb-4 overflow-auto h-full hide-scrollbar"
          >
            {filteredParcels.length === 0 && (
              <p className="text-center text-sm">No previous parcels</p>
            )}

            {filteredParcels.map((parcel, idx) => {
              return (
                <div key={idx} className="p-3 border rounded-xl">
                  <div className="flex justify-between">
                    <p className="font-medium">{parcel.parcelOrderId}</p>

                    <p
                      className={`${statusStyles[parcel.status]?.containerStyles} px-2 py-1 rounded-full text-xxs font-medium leading-3`}
                    >
                      {normalizeParcelStatus(parcel.status, parcel)}
                    </p>
                  </div>

                  <Separator className="mt-3 mb-4 border-dashed border border-border bg-white" />

                  <div className="relative gap-2.5 pb-8.5 space-y-4.75">
                    {/* Vertical bar */}
                    <div className="absolute inset-y-0 h-[29%] left-1.75 top-4.5 px-px bg-primary" />

                    {/* Pick up */}
                    <div className="flex gap-1 ">
                      {/*  point indicator */}
                      <div className="p-[1.5] h-fit flex shrink-0 items-center justify-center rounded-full border border-primary-100 w-fit">
                        <div className="size-3 rounded-full bg-primary" />
                      </div>
                      <div className="">
                        <p className="text-xs font-normal text-gray-600">
                          Pick Up
                        </p>
                        <p className="mt-0.75 line-clamp-1 font-medium break-all">
                          {parcel.pickUpAddrName}
                        </p>
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="flex gap-1 ">
                      {/*  point indicator */}
                      <div className="p-[1.5] h-fit flex shrink-0 items-center justify-center rounded-full border border-gray-200 w-fit">
                        <div className="size-3 rounded-full bg-gray-200" />
                      </div>
                      <div className="">
                        <p className="text-xs font-normal text-gray-600">
                          Destination
                        </p>
                        <p className="mt-0.75 line-clamp-1 font-medium break-all">
                          {parcel.dropOffAddrName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button
                      onClick={() => handleOpenTrackParcel(parcel.id)}
                      variant="outline"
                      className="h-10 flex-1 uppercase rounded-button!"
                    >
                      Track Parcel
                    </Button>
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Parcel;
