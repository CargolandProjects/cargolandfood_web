import { useEffect, useState, useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  RiArrowGoBackLine,
  RiArrowLeftLine,
  RiBankCardFill,
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
import { TrackOrderResponse } from "@/lib/services/order.service";
import { formatTime } from "@/lib/utils";

interface TrackOrderDetailsProps {
  isDesktop: boolean;
  close?: () => void;
}

const TrackOrderContent = ({ isDesktop, close }: TrackOrderDetailsProps) => {
  const queryClient = useQueryClient();
  const openRateOrder = useUIStore((s) => s.openReviewOrder);
  const orderId = useUIStore((s) => s.trackOrder.payload?.orderId);
  const [showDetails, setShowDetails] = useState(true);
  const { data, isLoading, isError, isSuccess, refetch } = useTrackOrder(
    orderId || ""
  );

  // Map backend orderStatus to UI timeline
  const orderTimeline = useMemo(() => {
    if (!data?.orderStatus) return [];
    const status = mapOrderStatusToTimeline(data.orderStatus);
    // console.log("Result: ", status);
    return status;
  }, [data]);

  // Listen to WebSocket notifications for order status updates
  useNotificationEvent((notification) => {
    if (notification.payload?.orderId === orderId) {
      console.log("Order status update received:", notification.type);

      // Optimistically update the UI immediately with the new status from notification
      queryClient.setQueryData(
        ["trackOrder", orderId],
        (oldData: TrackOrderResponse) => {
          if (!oldData) return oldData;

          // Handle both formats: string or object with status
          const newOrderStatus =
            typeof oldData.data.orderStatus === "string"
              ? notification.type
              : {
                  status: notification.type,
                  createdAt: notification.createdAt,
                };

          return {
            ...oldData,
            data: {
              ...oldData.data,
              orderStatus: newOrderStatus,
            },
          };
        }
      );

      // Refetch in background to ensure data consistency
      refetch();
    }
  });

  const handleOpenReview = () => {
    if (!data?.vendorAddress) return;
    openRateOrder({ vendorId: data?.vendorAddress.vendorId });
  };

  return (
    <div className="h-full">
      <div className="h-full py-4 sm:p-6">
        {isDesktop ? (
          // Desktop Header
          <SheetHeader className="p-0 pb-1 flex flex-row items-center justify-start gap-2">
            <button onClick={close}>
              <RiArrowGoBackLine className="size-5" />
            </button>

            <SheetTitle className="text-xl font-medium max-sm:text-center leading-7">
              Track Orders
            </SheetTitle>
          </SheetHeader>
        ) : (
          // Mobile Header
          <div className="relative pb-1 flex items-center justify-center max-sm:mx-6">
            <button onClick={close} className="absolute left-0">
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
          <div className="overflow-y-auto hide-scrollbar">
            {/* Delivery Tracking Map */}
            <div className="h-[432px] sm:h-[416px] w-full overflow-hidden rounded-xl max-sm:mt-4">
              <img src={map.src} alt="map" className="size-full object-cover" />
            </div>

            <div className="mt-6 sm:mt-3 max-sm:px-5">
              {/* Delivery Rider details */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="size-12 rounded-full overflow-hidden">
                    <img
                      src={data.profileImg || userIcon2.src}
                      alt="map"
                      className="size-full object-cover"
                      onError={(e) => fallbackImg(e, userIcon2.src)}
                    />
                  </div>
                  {data.fullname ? (
                    <div>
                      <p className="text-base font-medium ">{data.fullname}</p>
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
                              {formatTime(item.time || "") || "10:32am"}
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
                    {data.VerificationCode ?? "no code"}
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
                        <div className="size-16 rounded-lg overflow-hidden bg-neutral-100">
                          <img
                            src={menu.menuImg || "/fallback_vendor.webp"}
                            alt={menu.id}
                            className="size-full object-cover"
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
    </div>
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
          <SheetContent className="p-0 gap-0 min-w-[464px]">
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
