import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  RiArrowGoBackLine,
  RiArrowLeftLine,
  RiMapPin2Fill,
  RiMessage2Fill,
  RiPhoneFill,
  RiStarSFill,
  RiTimeFill,
} from "react-icons/ri";
import { Separator } from "../ui/separator";
import ErrorStateUi from "../ErrorStateUi";
import Loader from "../Loader";
import { map } from "@/assets/svgs";
import { ScrollArea } from "../ui/scroll-area";
import { burger, pizza, user1 } from "@/assets/images";
import { Button } from "../ui/button";
import { useUIStore } from "@/lib/stores/uiStore";
import { AnimatePresence, motion } from "framer-motion";

interface TrackOrderDetailsProps {
  isDesktop: boolean;
  close?: () => void;
}

interface OrderState {
  title: string;
  status: "idle" | "pending" | "success";
  description: string;
  time?: string;
}

const orderState: OrderState[] = [
  {
    title: "Order prepared",
    description: "Your order has been confirmed by the vendor",
    time: "10",
    status: "success",
  },
  {
    title: "Order has been delivered",
    description: "Your order has been confirmed by the vendor",
    time: "10",
    status: "success",
  },
  {
    title: "Preparing your order",
    description: "Vendor is preparing your order",
    time: "10",
    status: "success",
  },
  {
    title: "Order ready to go out",
    description: "Vendor is ready to give out your order",
    time: "10",
    status: "success",
  },
  {
    title: "Assign to rider",
    description: "Order has been assigned to a rider",
    time: "10mins",
    status: "success",
  },
  {
    title: "Completed",
    description: "Your order has been delivered",
    status: "success",
  },
];

const menuImg = [
  {
    id: "pizza",
    img: pizza.src,
    qty: "2",
  },
  {
    id: "burger",
    img: burger.src,
    qty: "1",
  },
];

const TrackOrderContent = ({ isDesktop, close }: TrackOrderDetailsProps) => {
  const openRateOrder = useUIStore((s) => s.openReviewOrder);
  const [showDetails, setShowDetails] = useState(true);
  const isLoading = false;
  const isError = false;
  const isSuccess = true;

  const handleOpenReview = () => {
    openRateOrder({ vendorId: "123" });
  };

  return (
    <ScrollArea className="h-full ">
      <div className="py-4 sm:p-6">
        {isDesktop ? (
          // Desktop Header
          <SheetHeader className="p-0 flex flex-row items-center justify-start gap-2">
            <button onClick={close}>
              <RiArrowGoBackLine className="size-5" />
            </button>

            <SheetTitle className="text-xl font-medium max-sm:text-center leading-7">
              Track Orders
            </SheetTitle>
          </SheetHeader>
        ) : (
          // Mobile Header
          <div className="relative flex items-center justify-center max-sm:mx-6">
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

        {isDesktop && <Separator className="mt-3 mb-6" />}

        {isSuccess && (
          <div>
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
                      src={user1.src}
                      alt="map"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="">
                    <p className="text-base font-medium ">Precious Eric</p>
                    <p className="text-xs text-neutral-600">Delivery man</p>
                  </div>
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
                    {orderState.map((item, idx) => (
                      <div className="flex gap-4 items-center" key={idx}>
                        {/* Left-Hand Side Progress Indicators */}
                        <div className="relative">
                          {item.status === "success" ? (
                            <div className="size-7 bg-primary rounded-full" />
                          ) : idx === 0 || item.status === "pending" ? (
                            <RiMapPin2Fill className="size-7 text-primary" />
                          ) : (
                            <div className="size-8 bg-neutral-100 rounded-full" />
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
                              className={` ${
                                item.status === "idle"
                                  ? "bg-neutral-100"
                                  : "bg-primary"
                              } w-1 h-[260%] absolute -top-17 left-1/2 -z-1 transform -translate-x-1/2 `}
                            />
                          )}
                        </div>

                        {/* State Description */}
                        <div className="w-full sm:max-w-[250px]">
                          <h3 className="text-base leading-6 font-medium">
                            {item.title}
                          </h3>
                          <p className="text-xs text-neutral-500">
                            {item.description}
                          </p>
                          {idx === 0 ? (
                            <p className="font-medium text-neutral-700 mt-1">
                              Time Req. {item.time}
                              {Number(item.time) > 1 ? "mins" : "min"}
                            </p>
                          ) : item.title !== "Completed" ? (
                            <p className="text-xs text-neutral-500 font-medium mt-1">
                              Est. time {item.time}
                              {Number(item.time) > 1 ? "mins" : "min"}
                            </p>
                          ) : (
                            <Button
                              onClick={handleOpenReview}
                              disabled={
                                item.status === "idle" ||
                                item.status === "pending"
                              }
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
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <RiMapPin2Fill className="size-5 text-neutral-500" />
                    <span className="text-base leading-5 text-neutral-600">
                      Deliver to
                    </span>
                  </div>
                  <span className="text-base leading-5">Home</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-base leading-5 text-neutral-600">
                    Delivery Verification Code:
                  </span>

                  <span className="font-bold leading-5">9818</span>
                </div>

                {showDetails && (
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <RiMapPin2Fill className="size-5 text-neutral-500" />
                      <span className="text-base leading-5 text-neutral-600">
                        Amount Paid
                      </span>
                    </div>
                    <span className="text-base leading-5">₦14,490</span>
                  </div>
                )}
              </div>

              {showDetails && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium leading-5 text-neutral-600">
                    Food to be delivered
                  </h3>

                  <div className="flex gap-4 mt-3">
                    {menuImg.map((menu) => (
                      <div key={menu.id} className="">
                        <div className="size-16 rounded-lg overflow-hidden">
                          <img
                            src={menu.img}
                            alt={menu.id}
                            className="size-full object-cover"
                          />
                        </div>
                        <p className="ml-1 mt-1 font-medium text-neutral-600">
                          x{menu.qty}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className="mt-6 sm:mt-20 md:py-3.5 submit-btn"
                onClick={() => setShowDetails((prev) => !prev)}
                // disabled={isPending}
              >
                {showDetails ? "Hide Details" : "More Details"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
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
