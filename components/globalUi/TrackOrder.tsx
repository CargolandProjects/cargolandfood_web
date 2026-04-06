import { useEffect, useState, useMemo } from "react";
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
  RiBankCardFill,
  RiCloseFill,
  RiMapPin2Fill,
  RiMessage2Fill,
  RiPhoneFill,
  RiStarSFill,
  RiTimeFill,
} from "react-icons/ri";
import { Separator } from "../ui/separator";
import ErrorStateUi from "../ErrorStateUi";
import Loader from "../Loader";
import { map, userIcon2 } from "@/assets/svgs";
import { Button } from "../ui/button";
import { useUIStore } from "@/lib/stores/uiStore";
import { AnimatePresence, motion } from "framer-motion";
import { useTrackOrder } from "@/lib/hooks/queries/useOrders";
import { fallbackImg } from "@/lib/utils";
import { mapOrderStatusToTimeline } from "@/lib/utils/orderStatusMapper";
import { useNotificationEvent } from "@/lib/hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import {
  GetOrdersResponse,
  TrackOrderResponse,
} from "@/lib/services/order.service";
import { formatTime } from "@/lib/utils";
import { OrderStatus } from "@/lib/types/cart.types";
import Image from "next/image";
import { cld } from "@/lib/utils/cloudinary";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface TrackOrderDetailsProps {
  isDesktop: boolean;
  close?: () => void;
}

type UIOrderStatus = Exclude<
  OrderStatus,
  "NEW" | "RIDER_ACCEPTED" | "PICKUP_ORDER"
>;

interface StatusMsg {
  open: boolean;
  status: string;
  message: string;
  title: string;
  time: string;
}

//  Maps OrderStatus to the corresponding timestamp field name
const getTimestampFieldForStatus = (status: OrderStatus): string => {
  const statusToFieldMap: Record<UIOrderStatus, string> = {
    ACCEPTED: "acceptedAt",
    PREPARING: "preparedAt",
    READY: "readyAt",
    ASSIGN_TO_RIDER: "assignedAt",
    DELIVERED: "completedAt",
  };
  return statusToFieldMap[status as UIOrderStatus];
};

const TrackOrderContent = ({ isDesktop, close }: TrackOrderDetailsProps) => {
  const queryClient = useQueryClient();
  const openRateOrder = useUIStore((s) => s.openReviewOrder);
  const orderId = useUIStore((s) => s.trackOrder.payload?.orderId);
  const [showDetails, setShowDetails] = useState(true);
  const { data, isLoading, isError, isSuccess, refetch } = useTrackOrder(
    orderId || ""
  );
  const [statusMsg, setStatusMsg] = useState<StatusMsg>({
    open: false,
    status: "",
    message: "",
    title: "",
    time: "",
  });

  // Map backend orderStatus to UI timeline
  const orderTimeline = useMemo(() => {
    if (!data?.orderStatus) return [];
    const status = mapOrderStatusToTimeline({
      OrderStatus: data.orderStatus,
      acceptedAt: data.acceptedAt,
      preparedAt: data.preparedAt,
      readyAt: data.readyAt,
      assignedAt: data.assignedAt,
      completedAt: data.completedAt,
    });
    console.log("Result: ", status);
    return status;
  }, [data]);

  // Listen to WebSocket notifications for order status updates
  useNotificationEvent((notification) => {
    if (notification.payload?.orderId === orderId) {
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
        ["trackOrder", orderId],
        (oldData: TrackOrderResponse) => {
          if (!oldData) return oldData;

          const newOrderStatus = notification.type as OrderStatus;
          console.log("Updating order status to:", newOrderStatus);

          // Get the appropriate timestamp field for this status
          const timestampField = getTimestampFieldForStatus(newOrderStatus);
          console.log(`Setting ${timestampField} to:`, notification.createdAt);

          // Update the cache with new status AND its timestamp
          return {
            ...oldData,
            data: {
              ...oldData.data,
              orderStatus: newOrderStatus,
              [timestampField]: notification.createdAt,
            },
          };
        }
      );

      // update the orders list cache as well to keep it in sync
      queryClient.setQueryData(["orders"], (oldData: GetOrdersResponse) => {
        if (!oldData) return oldData;

        const newOrderStatus = notification.type as OrderStatus;

        // Get the appropriate timestamp field for this status
        const timestampField = getTimestampFieldForStatus(newOrderStatus);
        // Update the cache with new status AND its timestamp
        return {
          ...oldData,
          data: oldData.data.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status: newOrderStatus,
                  [timestampField]: notification.createdAt,
                }
              : order
          ),
        };
      });

      // Refetch in background to ensure data consistency (optional)
      if (notification.type === "ASSIGN_TO_RIDER") refetch();
    }
  });

  const handleOpenReview = () => {
    if (!data?.vendorAddress) return;
    openRateOrder({ vendorId: data?.vendorAddress.vendorId });
  };

  return (
    <>
      <Dialog
        open={statusMsg?.open}
        onOpenChange={() => setStatusMsg((prev) => ({ ...prev, open: false }))}
      >
        <DialogContent className="dialog px-6! sm:px-9! min-h-[400px]!">
          {/* <div className="relative size-[124px] sm:size-[180px] self-center justify-self-center mt-8">
          <Image
            src={success.src}
            alt="coupon added"
            className="size-full"
            fill
          />
        </div> */}

          <div className="sm:mt-1 flex flex-col justify-center items-center gap-3">
            <DialogTitle className="dialog-title font-bold! max-w-[200px]">
            {statusMsg.status}
          </DialogTitle>
            <p className="max-w-[260px] text-base leading-5 text-center">{statusMsg.message}</p>
          </div>

          <div className="mt-13 flex gap-2 mb-6 sm:mb-8">
            {/* <Button
            variant="outline"
            className="submit-btn flex-1 hover:bg-gray-50 text-neutral-500 border-neutral-300"
          >
            Cancel Orders
          </Button> */}
            {/* <Button className="submit-btn flex-1">
            Order Details
          </Button> */}
          </div>
        </DialogContent>
      </Dialog>
      <div className="h-dvh pb-4 sm:px-6 sm:pb-6 overflow-y-auto hide-scrollbar">
        {isDesktop ? (
          // Desktop Header
          <SheetHeader className="p-0 pb-1 pt-4 sm:pt-6 sticky top-0 z-20 bg-white flex flex-row items-center justify-between">
            <div className="flex gap-2">
              <button onClick={close}>
                <RiArrowGoBackLine className="size-5" />
              </button>

              <SheetTitle className="text-xl font-medium max-sm:text-center leading-7">
                Track Orders
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
              Track Orders
            </h2>
          </div>
        )}

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

        {isDesktop && <Separator className="mt-2 mb-6" />}

        {isSuccess && (
          <div>
            {/* Delivery Tracking Map */}
            <div className="relative h-[432px] sm:h-[416px] w-full overflow-hidden rounded-xl max-sm:mt-2">
              <Image
                src={map.src}
                alt="map"
                className="size-full object-cover"
                fill
              />
            </div>

            <div className="mt-6 sm:mt-3 max-sm:px-5">
              {/* Delivery Rider details */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="relative size-12 rounded-full overflow-hidden">
                    <Image
                      src={cld(data.profileImg, "thumb") ?? userIcon2.src}
                      alt="map"
                      className="size-full object-cover"
                      fill
                      onError={(e) => fallbackImg(e, userIcon2.src)}
                    />
                  </div>
                  {data.fullName ? (
                    <div>
                      <p className="text-base font-medium ">{data.fullName}</p>
                      <p className="text-xs text-neutral-600">Delivery man</p>
                    </div>
                  ) : (
                    <p className="">In Progress....</p>
                  )}
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

              <Separator className="my-5" />

              <div className="space-y-5">
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <RiTimeFill className="size-5 text-neutral-500" />
                    <span className="text-base leading-5 text-neutral-600">
                      Estimated time
                    </span>
                  </div>
                  <span className="text-base leading-5">20 mins</span>
                </div>

                {/* Order Delivery State */}
                {showDetails && (
                  <div className="border rounded-xl px-6 py-4 space-y-6">
                    {orderTimeline.map((item, idx) => (
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
                              } w-1 h-[260%] absolute -top-17 -z-1 transform -translate-x-1/2 `}
                            />
                          )}
                        </div>

                        {/* State Description */}
                        <div className="w-full sm:max-w-[250px]">
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
                          {item.title !== "Completed" ? (
                            <p className="text-xs text-neutral-500 font-medium mt-1">
                              {formatTime(item.time || "") || "pending"}
                            </p>
                          ) : (
                            <Button
                              onClick={handleOpenReview}
                              disabled={item.status !== "pending"}
                              variant="outline"
                              className="uppercase text-xs leading-5 text-neutral-500 w-full mt-1"
                            >
                              <RiStarSFill className="size-5 text-neutral-400 " />
                              Rate The Food
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Details Summary */}
                <div className="flex justify-between gap-4">
                  <div className="flex gap-2 items-center shrink-0">
                    <RiMapPin2Fill className="size-5 text-neutral-500" />
                    <span className="text-base leading-5 text-neutral-600">
                      Deliver to
                    </span>
                  </div>
                  <span className="text-base leading-5 line-clamp-1">
                    {data.addressSnapshot.addressLine1}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-base leading-5 text-neutral-600">
                    Delivery Verification Code:
                  </span>

                  <span className="text-2xl font-bold leading-5">
                    {data.VerificationCode?.code ?? "no code"}
                  </span>
                </div>

                {showDetails && (
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <RiBankCardFill className="size-5 text-neutral-500" />
                      <span className="text-base leading-5 text-neutral-600">
                        Amount Paid
                      </span>
                    </div>
                    <span className="text-base leading-5">
                      ₦{Number(data.total).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {showDetails && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium leading-5 text-neutral-600">
                    Food to be delivered
                  </h3>

                  <div className="flex gap-4 mt-3">
                    {data.items.map((menu) => (
                      <div key={menu.id}>
                        <div className="relative size-16 rounded-lg overflow-hidden bg-neutral-100">
                          <Image
                            src={
                              cld(menu.menuImg, "thumb") ||
                              "/fallback_vendor.webp"
                            }
                            alt={menu.id}
                            className="size-full object-cover"
                            fill
                            onError={(e) =>
                              fallbackImg(e, "/fallback_vendor.webp")
                            }
                          />
                        </div>
                        <p className="ml-1 mt-1 font-medium text-neutral-600">
                          x{menu.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
    </>
  );
};

const TrackOrder = () => {
  const open = useUIStore((s) => s.trackOrder.open);
  // const open = true;
  const close = useUIStore((s) => s.closeTrackOrder);

  // Detect if we're on desktop (only runs once on mount, then on resize)
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true; // SSR fallback to desktop
    return window.matchMedia("(min-width: 640px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      {isDesktop && (
        <Sheet open={open} onOpenChange={close}>
          <SheetContent className="p-0 gap-0 min-w-[464px] [&>button]:hidden">
            <TrackOrderContent isDesktop={isDesktop} />
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
            <TrackOrderContent isDesktop={isDesktop} close={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TrackOrder;
