import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  RiArrowGoBackLine,
  RiMapPin2Fill,
  RiMessage2Fill,
  RiPhoneFill,
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

interface OrderState {
  title: string;
  status: "idle" | "pending" | "success";
}

const orderState: OrderState[] = [
  {
    title: "Order prepared",
    status: "success",
  },
  {
    title: "Order has been delivered",
    status: "idle",
  },
  {
    title: "Order order has been delivered",
    status: "idle",
  },
];

const menuImage = [
  {
    img: pizza.src,
  },
  {
    img: burger.src,
  },
];

const TrackOrder = () => {
  const open = useUIStore((s) => s.trackOrder.open);
  const close = useUIStore((s) => s.closeTrackOrder);
  const [showDetails, setShowDetails] = useState(true);
  const isLoading = false;
  const isError = false;
  // const isSuccess = true;
  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent className="p-0 gap-0 min-w-[464px]">
        <ScrollArea className="h-screen ">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <SheetHeader className="p-0 flex flex-row items-center justify-start gap-2">
              <button onClick={close}>
                <RiArrowGoBackLine className="size-5" />
              </button>

              <SheetTitle className="text-xl font-medium max-sm:text-center leading-7">
                Track Orders
              </SheetTitle>
            </SheetHeader>

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

            <div>
              <Separator className="mt-3 mb-6" />
              {/* Delivery Trackinf Map */}
              <div className="h-[416px] w-full overflow-hidden rounded-xl">
                <img src={map.src} alt="map" className="object-cover" />
              </div>

              {/* Delivery Rider details */}
              <div className="mt-3 flex justify-between items-center">
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
                          {/* 
                          Okay to sync this progress bar appropriately, I had to push up the the bars to the top using -top-6.5
                          and then only render those with index greater than zero. The reason for this is because when the state is idle,
                          it's gray else it's primary {PENDING, SUCCESS}, and this made the bar beneath light up when the first step was sill pending
                          which is against the design as the step/icon beneath it is still gray. Hence the earlier stated fix for proper syncing
                        */}
                          {idx > 0 && (
                            // Status Bar
                            <div
                              className={` ${
                                item.status === "idle"
                                  ? "bg-neutral-100"
                                  : "bg-primary"
                              } w-1 h-full absolute -top-6.5 left-1/2 -z-1 transform -translate-x-1/2 `}
                            />
                          )}
                        </div>

                        <p className="text-base leading-5">{item.title}</p>
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

                {showDetails && (
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <RiMapPin2Fill className="size-5 text-neutral-500" />
                      <span className="text-base leading-5 text-neutral-600">
                        Amount Paid
                      </span>
                    </div>
                    <span className="text-base leading-5">₦14, 490</span>
                  </div>
                )}
              </div>

              {showDetails && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium leading-5 text-neutral-600">
                    Food to be delivered
                  </h3>

                  <div className=""></div>
                </div>
              )}
            </div>

            <Button
              className="mt-20 md:py-3.5 submit-btn"
              onClick={() => setShowDetails((prev) => !prev)}
              // disabled={isPending}
            >
              {showDetails ? "Hide Details" : "More Details"}
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default TrackOrder;
