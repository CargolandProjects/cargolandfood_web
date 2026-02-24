// "use client";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/uiStore";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import {
  RiArrowLeftLine,
  RiCloseFill,
  RiMapPinFill,
  RiTimeLine,
} from "react-icons/ri";
import { restaurant } from "@/assets/svgs";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOrderDetails } from "@/lib/hooks/queries/useOrders";
import Loader from "../Loader";
import ErrorStateUi from "../ErrorStateUi";
import { fallbackImg, formatDateWComma, formatTime } from "@/lib/utils";

interface OrderDetailsContentProps {
  isDesktop: boolean;
  close?: () => void;
}

const OrderDetailsContent = ({
  isDesktop,
  close,
}: OrderDetailsContentProps) => {
  const orderId = useUIStore((s) => s.orderDetails.payload?.orderId);
  const openTrackOrder = useUIStore((s) => s.openTrackOrder);
  const { data, isLoading, isError, isSuccess } = useOrderDetails(
    orderId || ""
  );

  const currency = (n: string) => `₦ ${Number(n).toLocaleString()}`;

  return (
    <ScrollArea className="h-dvh px-4 sm:px-6">
      {isDesktop ? (
        // Desktop Header
        <SheetHeader className="p-0 flex-row justify-between items-center mt-6 ">
          <SheetTitle className="text-xl font-medium leading-7">
            Order Details
          </SheetTitle>
          <SheetClose asChild>
            <button className="size-10 flex justify-center items-center rounded-full bg-neutral-100">
              <RiCloseFill className="size-6" />
            </button>
          </SheetClose>
        </SheetHeader>
      ) : (
        // Mobile Header
        <div className="relative flex items-center justify-center mb-5 mt-3.5">
          <button onClick={close} className="absolute left-0">
            <RiArrowLeftLine className="size-5" />
          </button>
          <h2 className="text-xl font-medium leading-7">Order Details</h2>
        </div>
      )}

      {isDesktop && <Separator className="mt-3 mb-4" />}

      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <Loader size={12} />
        </div>
      )}

      {isError && (
        <div className="h-full flex justify-center items-center">
          <ErrorStateUi message="Error Getting Order Details " />
        </div>
      )}

      {isSuccess && (
        <div className="max-sm:mt-1">
          {/* General Info */}
          <div className="space-y-2 ">
            <h3 className="text-base font-medium leading-6">General Info</h3>

            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2 text-sm">
                <span>Order ID:</span>
                <span className="font-bold line-clamp-1">{data.id}</span>
              </div>
              <div className="flex items-center gap-0.5 text-sm font-normal">
                <RiTimeLine className="size-4.5 text-neutral-600" />

                <span>
                  {formatDateWComma(data.createdAt, false)}{" "}
                  {formatTime(data.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Delivery Verification Code:</span>
              <span className="font-bold">{9818}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Delivery:</span>
              <span className="bg-primary-50 text-primary p-1.5 rounded-[5px] text-xxs font-medium">
                {data.deliveryType}
              </span>
            </div>
          </div>

          <Separator className="my-3" />

          {/* Item Info */}
          <div className="space-y-2">
            <h3 className="text-base font-medium leading-6">Item Info</h3>
            {data.items.map((item, index) => (
              <div className="flex gap-1.5 p-1" key={index}>
                <div className="w-[78px] h-[74px] bg-neutral-100 overflow-hidden rounded-l-md rounded-r-[2.5px]">
                  <img
                    src={item.menuImg || "/fallback_menu.webp"}
                    alt="Pepperoni Pizza"
                    className="size-full object-cover"
                    onError={(e) => fallbackImg(e, "/fallback_menu.webp")}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium leading-5">
                    {item.menuName}
                  </h3>
                  <p className="text-neutral-600 text-sm line-clamp-2 mt-0.5 ">
                    {item.menuName}
                  </p>
                  <p className="text-sm font-medium leading-3 mt-1">
                    {currency(item.unitPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-3" />

          {/* Delivery Details */}
          <div className="space-y-2">
            <h2 className="text-base font-medium leading-6">
              Delivery Details
            </h2>

            <div className="flex gap-3 items-center">
              <div className="size-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-1">
                <img
                  src={restaurant.src}
                  alt="Restaurant svg icon"
                  className="size-full object-cover"
                />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium ">From Restaurant</p>
                <p className="text-neutral-600 line-clamp-1">
                  Cargo Terminal: 2nd Floor SAHCO Business Com...
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <RiMapPinFill className="size-4.5 text-orange-600 fill-orange-600" />

              <div className="flex-1">
                <p className="font-medium mb-1">To</p>
                <p className="text-gray-600 text-sm line-clamp-1">
                  {data.addressSnapshot?.addressLine1}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          {/* Payment Summary */}
          <div className="space-y-2.5">
            <h2 className="text-base font-medium leading-6">Payment Summary</h2>

            <div className=" space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sm leading-4.5">Orders</span>
                <span>{currency(data.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sm leading-4.5">Delivery Fee</span>
                <span>{currency(data.deliveryFee)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sm leading-4.5">Service Fee</span>
                <span>{currency(data.serviceFee)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sm leading-4.5">Discounts</span>
                <span>{currency(data.discountTotal)}</span>
              </div>

              <div className="flex items-center justify-between text-sm font-medium mt-4">
                <span className="text-base font-medium ">Total</span>
                <span className="text-base font-medium ">
                  {currency(data.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Track Order Button */}
          <Button onClick={openTrackOrder} className="submit-btn my-10">
            TRACK ORDER
          </Button>
        </div>
      )}
    </ScrollArea>
  );
};

export default function OrderDetails() {
  const open = useUIStore((s) => s.orderDetails.open);
  // const open = true;
  const close = useUIStore((s) => s.closeOrderDetails);

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
          <SheetContent className="gap-0 p-0 max-w-[464px]! [&>button]:hidden">
            <OrderDetailsContent isDesktop={isDesktop} />
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
            <OrderDetailsContent isDesktop={isDesktop} close={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
