import { useState, useMemo } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import {
  RiArrowGoBackLine,
  RiArrowLeftLine,
  RiCheckboxCircleFill,
  RiCloseFill,
  RiGiftFill,
  RiMapPin2Fill,
  RiMessage2Fill,
  RiPhoneFill,
  RiRestaurant2Fill,
  RiRidingFill,
  RiStarSFill,
  RiStore2Fill,
} from "react-icons/ri";
import { Separator } from "../ui/separator";
import ErrorStateUi from "../ErrorStateUi";
import Loader from "../Loader";
import { userIcon2 } from "@/assets/svgs";
import { Button } from "../ui/button";
import { useUIStore } from "@/lib/stores/uiStore";
import { AnimatePresence, motion } from "framer-motion";
import { currency } from "@/lib/utils";
import { useNotificationEvent } from "@/lib/hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { TrackOrderResponse } from "@/lib/services/order.service";
import { formatTime } from "@/lib/utils";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useTrackParcel } from "@/lib/hooks/queries/useParcel";
import { mapParcelStatusToTimeline } from "@/lib/utils/parcelStatusMapper";
import { GetAllParcelsRes, ParcelStatus } from "@/lib/services/parcel.service";
import CopyButton from "../CopyButton";

interface TrackOrderDetailsProps {
  isDesktop: boolean;
  close?: () => void;
}

type UIOrderStatus =
  | "RIDER_ACCEPTED"
  | "PICKUP_ORDER"
  | "RIDER_OUTSIDE"
  | "DELIVERED";

interface StatusMsg {
  open: boolean;
  status: string;
  message: string;
  title: string;
  time: string;
}

//  Maps OrderStatus to the corresponding timestamp field name
const getTimestampFieldForStatus = (status: ParcelStatus): string => {
  const statusToFieldMap: Record<UIOrderStatus, string> = {
    RIDER_ACCEPTED: "acceptedAt",
    PICKUP_ORDER: "preparedAt",
    RIDER_OUTSIDE: "readyAt",
    DELIVERED: "completedAt",
  };
  return statusToFieldMap[status as UIOrderStatus];
};

const statusIcons: Record<UIOrderStatus, React.ElementType> = {
  RIDER_ACCEPTED: RiStore2Fill,
  PICKUP_ORDER: RiRestaurant2Fill,
  RIDER_OUTSIDE: RiGiftFill,
  DELIVERED: RiCheckboxCircleFill,
};

const TrackParcelContent = ({ isDesktop, close }: TrackOrderDetailsProps) => {
  const queryClient = useQueryClient();
  const parcelId = useUIStore((s) => s.trackParcel.payload?.parcelId);
  const [showDetails, setShowDetails] = useState(true);
  const { data, isLoading, isError, isSuccess, refetch } = useTrackParcel(
    parcelId || "",
  );
  const [statusMsg, setStatusMsg] = useState<StatusMsg>({
    open: false,
    status: "",
    message: "",
    title: "",
    time: "",
  });

  const StatusIcon =
    statusIcons[statusMsg.status as UIOrderStatus] || RiRidingFill;

  // Map backend orderStatus to UI timeline
  const parcelTimeline = useMemo(() => {
    if (!data?.status) return [];
    const status = mapParcelStatusToTimeline({
      OrderStatus: data.status,
      acceptedAt: data.acceptedAt,
      pickedupAt: data.pickedupAt,
      riderOutsideAt: data.riderOutsideAt,
      deliveredAt: data.deliveredAt,
    });
    // console.log("Result: ", status);
    return status;
  }, [data]);

  // Listen to WebSocket notifications for order status updates
  useNotificationEvent((notification) => {
    if (notification.payload?.orderId === parcelId) {
      console.log("Order status update received:", notification);

      setStatusMsg((prev) => ({
        ...prev,
        open: true,
        status: notification.type,
        message: notification.message,
        title: notification.title,
        time: notification.createdAt,
      }));

      // Optimistically update the UI immediately with the new status from notification
      queryClient.setQueryData(
        ["trackParcel", parcelId],
        (oldData: TrackOrderResponse) => {
          if (!oldData) return oldData;

          const newParcelStatus = notification.type as ParcelStatus;
          console.log("Updating parcel status to:", newParcelStatus);

          // Get the appropriate timestamp field for this status
          const timestampField = getTimestampFieldForStatus(newParcelStatus);
          console.log(`Setting ${timestampField} to:`, notification.createdAt);

          // Update the cache with new status AND its timestamp
          return {
            ...oldData,
            data: {
              ...oldData.data,
              orderStatus: newParcelStatus,
              [timestampField]: notification.createdAt,
            },
          };
        },
      );

      // update the orders list cache as well to keep it in sync
      queryClient.setQueryData(["allParcels"], (oldData: GetAllParcelsRes) => {
        if (!oldData) return oldData;

        const newOrderStatus = notification.type as ParcelStatus;

        // Get the appropriate timestamp field for this status
        const timestampField = getTimestampFieldForStatus(newOrderStatus);
        // Update the cache with new status AND its timestamp
        return {
          ...oldData,
          data: oldData.data.map((parcel) =>
            parcel.id === parcelId
              ? {
                  ...parcel,
                  status: newOrderStatus,
                  [timestampField]: notification.createdAt,
                }
              : parcel,
          ),
        };
      });

      // Refetch in background to ensure data consistency (optional)
      if (notification.type === "RIDER_ACCEPTED") refetch();
    }
  });

  return (
    <>
      <div className="h-full pb-4 sm:px-6 sm:pb-6 overflow-y-auto hide-scrollbar">
        {isDesktop ? (
          // Desktop Header
          <SheetHeader className="p-0 pb-1 pt-4 sm:pt-6 sticky top-0 z-20 bg-white flex flex-row items-center justify-between">
            <div className="flex gap-2">
              <button onClick={close}>
                <RiArrowGoBackLine className="size-5" />
              </button>

              <SheetTitle className="text-xl font-medium max-sm:text-center leading-7">
                Track Parcel
              </SheetTitle>
            </div>

            <SheetClose asChild>
              <button className="size-10 flex justify-center items-center rounded-full bg-neutral-100">
                <RiCloseFill className="size-6" />
              </button>
            </SheetClose>
          </SheetHeader>
        ) : (
          // Mobile Header
          <div className="pb-3 pt-4 sticky top-0 z-20 flex items-center justify-center max-sm:px-6 bg-white">
            <button onClick={close} className="absolute left-0 ml-6">
              <RiArrowLeftLine className="size-5" />
            </button>
            <h2 className="text-lg sm:text-xl font-medium leading-6 sm:leading-7">
              Track Parcel
            </h2>
          </div>
        )}
        
        {isDesktop && <Separator className="mt-2 mb-6" />}

        {isLoading && (
          <div className="h-full flex justify-center items-center">
            <Loader size={12} />
          </div>
        )}

        {isError && (
          <div className="h-full flex justify-center items-center">
            <ErrorStateUi message="Error Fetching Orders " />
          </div>
        )}

        {isSuccess && (
          <div>
            {/* Delivery Tracking Map */}
            {/* <div className="relative h-[432px] sm:h-[416px] w-full overflow-hidden rounded-xl max-sm:mt-2">
              <Image
                src={map.src}
                alt="map"
                className="size-full object-cover"
                fill
              />
            </div> */}

            <div className="mt-6 sm:mt-3 max-sm:px-5">
              {/* Delivery Rider details */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="relative size-12 rounded-full overflow-hidden">
                    <Image
                      src={userIcon2}
                      alt="map"
                      className="size-full object-cover"
                      fill
                      // onError={(e) => fallbackImg(e, userIcon2.src)}
                    />
                  </div>
                  {/* {data.fullName ? (
                    <div>
                      <p className="text-base font-medium ">{data.fullName}</p>
                      <p className="text-xs text-neutral-600">Delivery man</p>
                    </div>
                  ) : ( */}
                  <p className="">In Progress....</p>
                  {/* )} */}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="size-10 rounded-button">
                    <RiMessage2Fill className="size-5 text-neutral-600" />
                  </Button>
                  <Button variant="outline" className="size-10 rounded-button">
                    <RiPhoneFill className="size-5 text-neutral-600" />
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                {/* Order Delivery State */}
                {showDetails && (
                  <div className="border rounded-xl px-6 py-4 space-y-6">
                    {parcelTimeline.map((item, idx) => (
                      <div className="flex gap-4 items-center" key={idx}>
                        {/* Left-Hand Side Progress Indicators */}
                        <div className="relative">
                          {item.status === "success" ? (
                            <div className="size-7 bg-primary rounded-full" />
                          ) : item.status === "pending" ? (
                            <RiMapPin2Fill className="size-7 text-primary" />
                          ) : (
                            // Relative and right-0.5 here is tto aligh it with the bar when idle, there was a slightly noticesable offset
                            <div
                              className={`relative right-0.5 size-8 bg-neutral-100 rounded-full`}
                            />
                          )}

                          {/**
                           * Okay to sync this progress bar appropriately, I had to push up the the bars to the top using -top-15
                           * and then only render those with index greater than zero. The reason for this is because when the state is idle,
                           * it's gray else it's primary {PENDING, SUCCESS}, and this made the bar beneath light up when the first step was sill pending
                           * which is against the design as the step/icon beneath it is still gray. Hence the earlier stated fix for proper syncing
                           */}

                          {/* Status Bar */}
                          {idx > 0 && (
                            <div
                              // left-[calc(50%-2px)] here is tto aligh the bar with the indicator below when idle, there was a slightly noticesable offset
                              className={` ${
                                item.status === "idle"
                                  ? "bg-neutral-100 left-[calc(50%-2px)] "
                                  : "bg-primary left-1/2"
                              } w-1 h-[260%] absolute -top-13 -z-1 transform -translate-x-1/2 `}
                            />
                          )}
                        </div>

                        {/* State Description */}
                        <div className="w-full sm:max-w-62.5">
                          <h3
                            className={`${
                              item.status === "idle"
                                ? "leading-5 font-normal text-[#31353F]"
                                : "leading-6 font-medium"
                            } text-base `}
                          >
                            {item.title}
                          </h3>
                          <p className="text-xs text-neutral-600">
                            {item.description}
                          </p>
                          {/* {item.title !== "Completed" ? (
                            <p className="text-xs text-neutral-500 font-medium mt-1">
                              {formatTime(item.time || "") || "pending"}
                            </p>
                          ) : (
                            <Button
                              // onClick={handleOpenReview}
                              disabled={item.status !== "pending"}
                              variant="outline"
                              className="uppercase text-xs leading-5 text-neutral-500 w-full mt-1"
                            >
                              <RiStarSFill className="size-5 text-neutral-400 " />
                              Rate The Food
                            </Button>
                          )} */}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Details Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between gap-4">
                    <span className="shrink-0 text-sm leading-4.5 text-neutral-800">
                      Deliver Fee:
                    </span>

                    <span className="leading-5 line-clamp-1">
                      {currency(data?.amount)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm leading-4.5 text-neutral-600">
                      Delivery Verification Code:
                    </span>

                    <span className="text-2xl font-bold leading-5 flex items-center gap-2">
                      {data.VerificationCode?.code ?? "no code"}
                      <CopyButton text={data.VerificationCode?.code} />
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="mt-6 sm:mt-20 md:py-3.5 mb-4 submit-btn"
                onClick={() => setShowDetails((prev) => !prev)}
                // disabled={isPending}
              >
                {showDetails ? "Hide Details" : "More Details"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Status update modal */}
      <Dialog
        open={statusMsg?.open}
        onOpenChange={() => setStatusMsg((prev) => ({ ...prev, open: false }))}
      >
        <DialogContent className="dialog min-h-76.75! gap-0! flex flex-col px-9! pt-8! pb-8.5! ">
          <div className="self-center justify-self-center flex items-center justify-center size-18 rounded-full bg-primary/10">
            <div className="relative size-18 flex justify-center items-center">
              <StatusIcon className="size-10 text-primary" />
            </div>
          </div>

          <div className="mt-1 flex flex-col justify-center items-center gap-3">
            <DialogTitle className="dialog-title font-bold! max-w-50">
              {statusMsg.title}
            </DialogTitle>
            <p className="max-w-71.75 text-base leading-5 text-center">
              {statusMsg.message}
            </p>
          </div>

          <div className="mt-8 ">
            <Button
              onClick={() => setStatusMsg((prev) => ({ ...prev, open: false }))}
              className="submit-btn flex-1"
            >
              Okay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const TrackParcel = () => {
  const open = useUIStore((s) => s.trackParcel.open);
  const close = useUIStore((s) => s.closeTrackParcel);

  // Detect if we're on desktop (only runs once on mount, then on resize)
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Adjust the breakpoint as needed

  return (
    <>
      {isDesktop && (
        <Sheet open={open} onOpenChange={close}>
          <SheetContent className="p-0 gap-0 min-w-116 [&>button]:hidden">
            <TrackParcelContent isDesktop={isDesktop} />
          </SheetContent>
        </Sheet>
      )}

      <AnimatePresence mode="wait">
        {!isDesktop && open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
            className="fixed z-37 inset-0 bg-white"
          >
            <TrackParcelContent isDesktop={isDesktop} close={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TrackParcel;
