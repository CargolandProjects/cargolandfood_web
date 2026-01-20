// "use client";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/uiStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { RiArrowLeftLine, RiMapPinFill, RiTimeLine } from "react-icons/ri";
import { restaurant } from "@/assets/svgs";
import { useCartStore } from "@/lib/stores/CartStore";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function OrderDetails() {
  const [isMobile, setIsMoble] = useState(false);
  const open = useUIStore((s) => s.orderDetails.open);
  // const payload = useUIStore(s => s.orderDetails.payload)
  const close = useUIStore((s) => s.closeOrderDetails);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const items = useCartStore((s) => s.items);

  const currency = (n: number) => `₦ ${n.toLocaleString()}`;

  // Payment summary (stubbed for now)
  const subTotal = getTotalPrice();
  const deliveryFee = 800 * items.length;
  const serviceFee = 900;
  const discounts = 660;
  const total = subTotal + deliveryFee + serviceFee - discounts;

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 640;
      setIsMoble(mobile);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      {!isMobile && (
        <Sheet open={open} onOpenChange={close}>
          <SheetContent className="gap-0 p-0 max-w-[464px]!">
            <ScrollArea className="h-screen ">
              <div className="p-6">
                {/* Header */}
                <SheetHeader className="p-0">
                  <SheetTitle className="text-xl font-medium leading-7">
                    Order Details
                  </SheetTitle>
                </SheetHeader>
                <Separator className="mt-3 mb-4" />

                <div>
                  {/* General Info */}
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6">
                      General Info
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <span>Order ID:</span>
                        <span className="font-bold ">100014</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-sm font-normal">
                        <RiTimeLine className="size-4.5 text-neutral-600" />
                        <span>16 Sep 2025 07:49PM</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Delivery Verification Code:</span>
                      <span className="font-bold">9818</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Delivery</span>
                      <span className="bg-primary-50 text-primary p-1.5 rounded-[5px] text-xxs font-medium">
                        Digital Payment
                      </span>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  {/* Item Info */}
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6">
                      Item Info
                    </h3>
                    {items.map((item, index) => (
                      <div className="flex gap-1.5 p-1" key={index}>
                        <div className="max-w-[78px] h-[74px] bg-amber-100 overflow-hidden rounded-l-md rounded-r-[2.5px]">
                          <img
                            src={item.product.imageUrl}
                            alt="Pepperoni Pizza"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium leading-5">
                            {item.product.name}
                          </h3>
                          <p className="text-neutral-600 text-sm line-clamp-2 mt-0.5 ">
                            {item.product.description}
                          </p>
                          <p className="text-sm font-medium leading-3 mt-1">
                            ₦{item.unitPrice}
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
                          Cargo Terminal: 2nd Floor SAHCO Business Com...
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  {/* Payment Summary */}
                  <div className="space-y-2.5">
                    <h2 className="text-base font-medium leading-6">
                      Payment Summary
                    </h2>

                    <div className=" space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-sm leading-4.5">Orders</span>
                        <span>{currency(subTotal)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-sm leading-4.5">
                          Delivery Fee
                        </span>
                        <span>{currency(deliveryFee)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-sm leading-4.5">Service Fee</span>
                        <span>{currency(serviceFee)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-sm leading-4.5">Discounts</span>
                        <span>{currency(discounts)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm font-medium mt-4">
                        <span className="text-base font-medium ">Total</span>
                        <span className="text-base font-medium ">
                          {currency(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Track Order Button */}
                  <Button className="submit-btn my-10">TRACK ORDER</Button>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}

      <AnimatePresence mode="wait">
        {isMobile && open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
            className="fixed z-37 inset-0 bg-white"
          >
            <ScrollArea className="h-screen">
              <div className="p-4 pb-10">
                {/* Header */}
                <div className="relative flex items-center justify-center">
                  <button onClick={close} className="absolute left-0">
                    <RiArrowLeftLine className="size-5" />
                  </button>
                  <h2 className="text-xl font-medium leading-7">
                    Order Details
                  </h2>
                </div>

                <div className="mt-5">
                  {/* General Info */}
                  <div className="space-y-2">
                    <h3 className="text-base font-medium leading-6">
                      General Info
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <span>Order ID:</span>
                        <span className="font-bold ">100014</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-sm font-normal">
                        <RiTimeLine className="size-4.5 text-neutral-600" />
                        <span>16 Sep 2025 07:49PM</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Delivery Verification Code:</span>
                      <span className="font-bold">9818</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Delivery</span>
                      <span className="bg-primary-50 text-primary p-1.5 rounded-[5px] text-xxs font-medium">
                        Digital Payment
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Item Info */}
                  <div>
                    <h3 className="text-base font-medium leading-6">
                      Item Info
                    </h3>

                    <div className="space-y-2 mt-2">
                      {items.map((item, index) => (
                        <div className="flex gap-1.5 p-1" key={index}>
                          <div className="max-w-[78px] h-[74px] bg-amber-100 overflow-hidden rounded-l-md rounded-r-[2.5px]">
                            <img
                              src={item.product.imageUrl}
                              alt="Pepperoni Pizza"
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium leading-5">
                              {item.product.name}
                            </h3>
                            <p className="text-neutral-600 text-sm line-clamp-2 mt-0.5 ">
                              {item.product.description}
                            </p>
                            <p className="text-sm font-medium leading-3 mt-1">
                              ₦{item.unitPrice}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4" />

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
                          Cargo Terminal: 2nd Floor SAHCO Business Com...
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Payment Summary */}
                  <div className="space-y-2.5">
                    <h2 className="text-base font-medium leading-6">
                      Payment Summary
                    </h2>

                    <div className=" space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-sm leading-4.5">Orders</span>
                        <span>{currency(subTotal)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-sm leading-4.5">
                          Delivery Fee
                        </span>
                        <span>{currency(deliveryFee)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-sm leading-4.5">Service Fee</span>
                        <span>{currency(serviceFee)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-sm leading-4.5">Discounts</span>
                        <span>{currency(discounts)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm font-medium mt-4">
                        <span className="text-base font-medium ">Total</span>
                        <span className="text-base font-medium ">
                          {currency(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Track Order Button */}
                  <Button className="submit-btn mt-4.5">TRACK ORDER</Button>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
