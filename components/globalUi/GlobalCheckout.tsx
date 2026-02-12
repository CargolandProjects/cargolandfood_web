"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useUIStore } from "@/lib/stores/uiStore";
import RiderNoteModal from "../orders/RiderNoteModal";
import CouponSuccessModal from "../orders/CouponSuccessModal";
import CouponModal from "../orders/CouponModal";
import GiftModal from "../orders/GiftModal";
import PickupConfirmModal from "../orders/PickupConfirmModal";
import { Button } from "../ui/button";
import {
  useAddToCart,
  useClearCart,
  useRemoveCartItem,
} from "@/lib/hooks/mutations/useMutateCart";
import {
  useMakePayment,
  useSimulatePayment,
} from "@/lib/hooks/mutations/useOrder";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import {
  RiArrowGoBackLine,
  RiArrowRightSLine,
  RiBankCardFill,
  RiBankFill,
  RiCoupon2Fill,
  RiDeleteBin6Line,
  RiEBike2Line,
  RiGiftFill,
  RiLoader2Line,
  RiMapPinFill,
  RiRestaurant2Fill,
  RiWallet3Fill,
} from "react-icons/ri";
import { useCheckoutPreview } from "@/lib/hooks/queries/useCheckoutFlow";
import { Loader2, Minus, Plus } from "lucide-react";
import ConfirmationModal from "../ConfirmationModal";
import Loader from "../Loader";
import ErrorStateUi from "../ErrorStateUi";
import EmptyStateUi from "../EmptyStateUi";
import { useSession } from "@/lib/hooks/useSession";

type Delivery = "delivery" | "pickup";
type PaymentMethod = "wallet" | "newCard" | "bankTransfer";

const GlobalCheckout = () => {
  const open = useUIStore((s) => s.checkout.open);
  const closeCheckout = useUIStore((s) => s.closeCheckout);
  const openOrderSuccess = useUIStore((s) => s.openOrderSuccess);
  const vendorId = useUIStore((s) => s.checkout.payload)?.vendorId || "";
  const [deliveryType, setDeliveryType] = useState<Delivery>("delivery");

  const deliveryValue = deliveryType === "delivery" ? "DELIVERY" : "PICKUP";

  const {
    data: checkoutData,
    isLoading,
    isError,
    isSuccess,
  } = useCheckoutPreview(vendorId!, deliveryValue, true);

  const clearCartMutation = useClearCart();
  const { mutate, isPending } = useAddToCart(vendorId);
  const { mutate: removeItem, isPending: isRemovingItem } =
    useRemoveCartItem(vendorId);

  const [showAlert, setShowAlert] = useState(false);
  const [showRiderNote, setShowRiderNote] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showConfirmPickup, setShowConfirmPickup] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const { mutate: makePayment, isPending: isMakingPayment } = useMakePayment();
  const { mutate: simulatePayent } = useSimulatePayment();
  const openAddresses = useUIStore((s) => s.openAddresses);
  const { user } = useSession();

  // Format currency
  const currency = (n: number) => `₦ ${n.toLocaleString()}`;

  // Safe number parsing for API string values
  const safePrice = (value: string | undefined | null) => {
    if (!value) return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Handle delivery type change - convert UI lowercase to API uppercase
  // const handleDeliveryTypeChange = (type: Delivery) => {
  //   setDeliveryType(type);
  //   onDeliveryTypeChange(type === "delivery" ? "DELIVERY" : "PICKUP");
  // };

  const handleOrder = useCallback(
    (cartId: string) => {
      makePayment(cartId, {
        onSuccess: (data) => {
          console.log("Checkout Session ID: ", data.checkoutSessionId);

          if (!data.checkoutSessionId) return;
          simulatePayent(data.checkoutSessionId, {
            onSuccess: () => {
              closeCheckout();
              openOrderSuccess();
            },
          });
        },
      });
    },
    [makePayment, simulatePayent, closeCheckout, openOrderSuccess]
  );

  // Handle place order
  const handlePlaceOrder = (cartId: string) => {
    if (deliveryType === "pickup") {
      setShowConfirmPickup(true);
      return;
    }

    handleOrder(cartId);
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (!checkoutData?.cart.id) return;

    clearCartMutation.mutate(
      { cartId: checkoutData.cart.id, vendorId },
      {
        onSuccess: () => {
          setShowAlert(false);
          if (closeCheckout) closeCheckout();
        },
      }
    );
  };

  const handleRemoveCartItem = (cartId: string, cartItemId: string) => {
    removeItem(
      { cartId: cartId, cartItemId: cartItemId },
      {
        onSuccess: () => {
          closeCheckout();
        },
      }
    );
  };

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (
    item: (typeof cartItems)[0],
    action: "increase" | "decrease"
  ) => {
    if (item.quantity < 1) return; // Don't allow quantity less than 1

    // Re-add item with new quantity (API replaces/updates existing item)
    mutate({
      menuId: item.menuId,
      menuName: item.menuName,
      unitPrice: item.unitPrice,
      quantity: 1,
      action: action === "increase" ? "INCREMENT" : "DECREMENT",
      currency: "NGN",
      // addons: item.addons.map((addon) => ({
      //   menuAddonId: addon.menuAddonId,
      //   name: addon.name,
      //   price: safePrice(addon.price),
      //   quantity: addon.quantity,
      // })),
    });
  };

  // Create memoized modal props object
  const modalProps = useMemo(
    () => ({
      riderNote: {
        open: showRiderNote,
        onOpenChange: setShowRiderNote,
      },
      coupon: {
        open: showCoupon,
        onOpenChange: setShowCoupon,
      },
      gift: {
        open: showGift,
        onOpenChange: setShowGift,
      },
      pickupConfirm: {
        open: showConfirmPickup,
        onOpenChange: setShowConfirmPickup,
        onConfirm: (cartId: string) => handleOrder(cartId),
      },
      couponSuccess: {
        open: showSuccess,
        onOpenChange: setSuccess,
      },
      clearCartModal: {
        open: showAlert,
        onOpenChange: setShowAlert,
      },
    }),
    [
      showRiderNote,
      showCoupon,
      showGift,
      showConfirmPickup,
      showSuccess,
      showAlert,
      handleOrder,
    ]
  );

  const {
    subtotal = "0",
    deliveryFee = "0",
    serviceFee = "0",
    discountTotal = "0",
    total = "0",
  } = checkoutData || {};
  const cartItems = checkoutData?.cart.items || [];

  const defaultAdresses = user?.address.find((addr) => addr.setAddressDefault);

  return (
    <Sheet open={open} onOpenChange={closeCheckout}>
      <SheetContent className="min-w-[464px]!">
        <>
          <div className="h-full bg-white p-4 sm:p-6 overflow-auto hide-scrollbar ">
            {/* Header */}
            <div className="flex items-center justify-start gap-2">
              {closeCheckout && (
                <button onClick={closeCheckout} className="">
                  <RiArrowGoBackLine className="size-5" />
                </button>
              )}
              <h2 className="text-xl font-medium max-sm:text-center leading-7">
                Checkout
              </h2>
            </div>

            {isLoading && (
              <div className="h-full flex justify-center items-center">
                <Loader size={12} />
              </div>
            )}

            {isError && (
              <div className="h-full flex justify-center items-center">
                <ErrorStateUi message="Error Getting Orders " />
              </div>
            )}

            {isSuccess && cartItems.length === 0 && (
              <div className="h-full flex justify-center items-center">
                <EmptyStateUi
                  message="No pending Orders"
                  description="Order to proceed to checkout"
                />
              </div>
            )}
            {isSuccess && cartItems.length > 0 && (
              <div>
                <Separator className="mt-3 mb-6" />

                {/* Pack Items */}
                <div className="space-y-4 sm:space-y-6 max-sm:mt-5">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.menuId}
                      className="rounded-2xl border border-gray-200 bg-white p-3"
                    >
                      {/* Pack Header */}
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-normal text-gray-500">
                          Pack {index + 1}
                        </h2>
                        <button
                          onClick={() =>
                            handleRemoveCartItem(item.cartId, item.id)
                          }
                          // disabled
                          className="text-primary transition-colors bg-primary-300 p-1.5 rounded-md "
                          aria-label="Delete pack"
                        >
                          {isRemovingItem ? (
                            <Loader2 className="size-5 animate-spin text-cargo-error/60" />
                          ) : (
                            <RiDeleteBin6Line className="size-5 text-primary" />
                          )}
                        </button>
                      </div>

                      {/* Pack Item */}
                      <div className="flex items-end justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-medium">
                            {item.quantity}x
                          </span>
                          <div>
                            <h3 className="text-base font-normal leading-5">
                              {item.menuName}
                            </h3>
                            <span className="text-neutral-600">
                              + extra sausage
                            </span>
                            {/* {item.addons.length > 0 && (
                                 <p className="text-sm font-normal text-gray-500">
                                   {item.addons
                                     .map((addon) => `+ ${addon.name}`)
                                     .join(", ")}
                                 </p>
                               )} */}
                          </div>
                        </div>
                        {/* Increment Decrement Buttons */}
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() =>
                              handleQuantityChange(item, "decrease")
                            }
                            disabled={isPending}
                            className="size-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease packs"
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="text-sm font-normal text-center">
                            {isPending ? (
                              <Loader2 className="size-4 animate-spin duration-300 text-neutral-400" />
                            ) : (
                              item.quantity
                            )}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item, "increase")
                            }
                            disabled={isPending}
                            className="size-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Increase packs"
                          >
                            <Plus className="size-4 text-black" />
                          </button>
                        </div>
                      </div>

                      {/* Packs Counter */}
                      <div className="flex items-center justify-between">
                        <span className="text-base font-medium">
                          {currency(safePrice(item.unitPrice))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4 sm:my-6" />

                {/* Message rows */}
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setShowRiderNote(true)}
                    className="w-full flex items-center justify-between hover:underline cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-base leading-5">
                      <RiRestaurant2Fill className="size-5 text-neutral-600" />{" "}
                      Have a message for the rider ?
                    </span>
                    <RiArrowRightSLine className="size-5 text-neutral-500" />
                  </button>

                  <button
                    onClick={() => setSuccess(true)}
                    className="w-full flex items-center justify-between hover:underline cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-base leading-5">
                      <RiEBike2Line className="size-5 icon-r-left text-neutral-600" />{" "}
                      Have a message for the restaurant ?
                    </span>
                    <RiArrowRightSLine className="size-5 text-neutral-500" />
                  </button>

                  <button
                    onClick={() => setShowGift(true)}
                    className="w-full p-3 bg-neutral-100 rounded-md flex items-center justify-between hover:underline cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <RiGiftFill className="size-5 icon-r-left text-primary" />
                      Ordering for someone else?
                    </span>
                    <RiArrowRightSLine className="size-5 text-neutral-500" />
                  </button>
                </div>

                {/* Delivery vs Pickup */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-base leading-5">Delivery</span>
                    <RadioGroup
                      value={deliveryType}
                      onValueChange={(v: Delivery) => setDeliveryType(v)}
                      className="contents"
                    >
                      <RadioGroupItem value="delivery" />
                    </RadioGroup>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-base leading-5">Pickup</span>
                    <RadioGroup
                      value={deliveryType}
                      onValueChange={(v: Delivery) => setDeliveryType(v)}
                      className="contents"
                    >
                      <RadioGroupItem value="pickup" />
                    </RadioGroup>
                  </label>
                </div>

                <Separator className="my-4 sm:my-6" />

                {/* Delivery details */}
                {deliveryType === "delivery" && (
                  <div className="mb-6">
                    <h3 className="text-base font-medium leading-6">
                      Delivery Details
                    </h3>
                    <div className="space-y-2 mt-4">
                      <button
                        onClick={openAddresses}
                        className="w-full flex items-center justify-between"
                      >
                        <p className="flex items-center gap-2 ">
                          <RiMapPinFill className="size-5 text-primary" />
                          <span className="text-base leading-5 line-clamp-1">
                            {defaultAdresses?.addressLine1 || "Add an address"}
                          </span>
                        </p>
                        <RiArrowRightSLine className="size-5 text-neutral-500" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Payment method */}
                <div>
                  <h3 className="text-base font-medium leading-6">
                    Payment Method
                  </h3>
                  <div className="mt-4 space-y-2">
                    <div className="w-full flex items-center justify-between">
                      <span className="flex items-center gap-2 text-base">
                        <RiWallet3Fill className="size-5 text-primary" /> Wallet
                        Balance -{" "}
                        <span className="text-base font-medium ml-1">
                          {currency(32600)}
                        </span>
                      </span>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={(v: PaymentMethod) =>
                          setPaymentMethod(v)
                        }
                        className="contents"
                      >
                        <RadioGroupItem value="wallet" />
                      </RadioGroup>
                    </div>

                    <div className="w-full flex items-center justify-between">
                      <span className="flex items-center gap-2 text-base">
                        <RiBankCardFill className="size-5 text-primary" /> Add
                        New Card
                      </span>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={(v: PaymentMethod) =>
                          setPaymentMethod(v)
                        }
                        className="contents"
                      >
                        <RadioGroupItem value="newCard" />
                      </RadioGroup>
                    </div>

                    <div className="w-full flex items-center justify-between">
                      <span className="flex items-center gap-2 text-base">
                        <RiBankFill className="size-5 text-primary" /> Bank
                        Transfer
                      </span>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={(v: PaymentMethod) =>
                          setPaymentMethod(v)
                        }
                        className="contents"
                      >
                        <RadioGroupItem value="bankTransfer" />
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <Separator className="my-4 sm:my-6" />

                {/* Coupon code */}
                <div>
                  <button
                    onClick={() => setShowCoupon(true)}
                    className="w-full flex items-center justify-between hover:underline"
                  >
                    <span className="flex items-center gap-2 text-base leading-5">
                      <RiCoupon2Fill className="size-5 text-primary" /> Enter
                      Coupon Code
                    </span>
                    <RiArrowRightSLine className="size-5 text-neutral-500" />
                  </button>
                </div>

                <Separator className="my-6" />

                {/* Payment summary */}
                <div className="">
                  <h3 className="text-base font-medium leading-6">
                    Payment Summary
                  </h3>
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sm leading-4.5">Orders</span>
                      <span>{currency(safePrice(subtotal))}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sm leading-4.5">Delivery Fee</span>
                      <span>{currency(safePrice(deliveryFee))}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sm leading-4.5">Service Fee</span>
                      <span>{currency(safePrice(serviceFee))}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sm leading-4.5">Discounts</span>
                      <span>{currency(safePrice(discountTotal))}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm font-medium mt-4">
                      <span className="text-base font-medium ">Total</span>
                      <span className="text-base font-medium ">
                        {currency(safePrice(total) || safePrice(subtotal))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button
                    onClick={() => handlePlaceOrder(cartItems[0].cartId)}
                    disabled={isMakingPayment}
                    className="submit-btn flex-1"
                  >
                    {isMakingPayment ? (
                      <RiLoader2Line className="size-5 animate-spin" />
                    ) : (
                      "PLACE ORDER"
                    )}
                  </Button>
                  <Button
                    onClick={() => setShowAlert(true)}
                    variant="outline"
                    className="submit-btn flex-1 hover:bg-gray-50 text-neutral-500 border-neutral-300"
                  >
                    CANCEL ORDERS
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Activity Modals */}
          <RiderNoteModal {...modalProps.riderNote} />
          <CouponSuccessModal {...modalProps.couponSuccess} />
          <CouponModal {...modalProps.coupon} />
          <GiftModal {...modalProps.gift} />
          <PickupConfirmModal
            {...modalProps.pickupConfirm}
            cartId={cartItems[0]?.cartId}
          />

          <ConfirmationModal
            confirmText="Clear"
            description="Are you sure you want to clear your cart?"
            title="Clear Cart?"
            open={showAlert}
            onOpenChange={setShowAlert}
            onConfirm={handleClearCart}
          />
        </>
      </SheetContent>
    </Sheet>
  );
};

export default GlobalCheckout;
