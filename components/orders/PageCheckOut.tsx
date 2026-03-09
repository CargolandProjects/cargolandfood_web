"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  RiArrowLeftLine,
  RiArrowRightSLine,
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import type { CheckoutPreview } from "@/lib/types/cart.types";
import {
  useClearCart,
  useAddToCart,
  useRemoveCartItem,
} from "@/lib/hooks/mutations/useMutateCart";
import { useMakePayment } from "@/lib/hooks/mutations/usePlaceOrder";
import ConfirmationModal from "../ConfirmationModal";
import RiderNote from "./RiderNoteModal";
import CouponSuccess from "./CouponSuccessModal";
import CouponModal from "./CouponModal";
import GiftModal from "./GiftModal";
import PickupConfirmModal from "./PickupConfirmModal";
import ErrorStateUi from "../ErrorStateUi";
import Loader from "../Loader";
import EmptyStateUi from "../EmptyStateUi";
import { useUIStore } from "@/lib/stores/uiStore";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";
import { useWalletBalance } from "@/lib/hooks/queries/useWallet";
import { useChargeWallet } from "@/lib/hooks/mutations/useChargeWallet";
// import { useNotificationEvent } from "@/lib/hooks/useSocket";
// import { useSuccessfulPaymentEvent } from "@/lib/hooks/useSocket";
// import { useQueryClient } from "@tanstack/react-query";

type Delivery = "DELIVERY" | "PICKUP";
type PaymentMethod = "wallet" | "digitalTransfer";

interface CheckoutProps {
  vendorId: string;
  checkoutData: CheckoutPreview;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  deliveryType: "DELIVERY" | "PICKUP";
  onDeliveryTypeChange: (type: "DELIVERY" | "PICKUP") => void;
  closeCheckout?: (v: boolean) => void;
}

const PageCheckOut = ({
  vendorId,
  checkoutData,
  isError,
  isLoading,
  isSuccess,
  deliveryType,
  onDeliveryTypeChange,
  closeCheckout,
}: CheckoutProps) => {
  const openOrderSuccess = useUIStore((s) => s.openOrderSuccess);
  const [showAlert, setShowAlert] = useState(false);
  const [showRiderNote, setShowRiderNote] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showConfirmPickup, setShowConfirmPickup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    "wallet"
  );
  const [isRemovingItemId, setIsRemovingItemId] = useState<string | null>(null);
  const [quantityChangeId, setQuantityChangeId] = useState<string | null>(null);
  const openAddresses = useUIStore((s) => s.openAddresses);
  // const openOrderSuccess = useUIStore((s) => s.openOrderSuccess);
  const { user } = useSession();

  // API mutations
  const clearCartMutation = useClearCart();
  const { mutate, isPending } = useAddToCart();
  const { mutate: removeItem } = useRemoveCartItem(vendorId);
  const { mutate: makePayment, isPending: isMakingPayment } = useMakePayment();
  const { mutate: chargeWallet, isPending: isChargingWallet } =
    useChargeWallet();
  const { data: balance, isLoading: isBalanceLoading } = useWalletBalance();

  // const queryClient = useQueryClient();

  // Hook to listen to successful payment event
  // useNotificationEvent((data) => {
  //   try {
  //     console.log("Notification Event: ", data);

  //     // console.log("Payment Success Event: ", data);
  //     // openOrderSuccess();
  //     // queryClient.invalidateQueries({
  //     //   queryKey: ["cart"],
  //     // });

  //     // const vendorId = data.payload?.data?.vendorId;
  //     // if (vendorId)
  //     //   queryClient.invalidateQueries({
  //     //     queryKey: ["checkoutPreview"],
  //     //   });0
  //   } catch (error) {
  //     console.error("Error handling successful payment:", error);
  //     toast.error("Payment successful, but UI update failed. Please refresh.");
  //   }
  // });

  // Format currency
  const currency = (n: number) => `₦${n.toLocaleString()}`;

  // Safe number parsing for API string values
  const safePrice = (value: string | undefined | null) => {
    if (!value) return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Handle delivery type change - convert UI lowercase to API uppercase
  const handleDeliveryTypeChange = (type: "DELIVERY" | "PICKUP") => {
    onDeliveryTypeChange(type);
  };

  const handleOrder = useCallback(
    (cartId: string, description: string) => {
      if (!paymentMethod) {
        toast.error("Please select a payment method");
        return;
      }

      if (paymentMethod === "digitalTransfer")
        makePayment(cartId, {
          onSuccess: (res) => {
            const authUrl = res.data.authorization_url;

            if (!authUrl) {
              toast.error("Payment initiation failed");
              return;
            }
            //Navigate to payment gateway url
            window.location.href = authUrl;
          },
        });

      if (paymentMethod === "wallet")
        chargeWallet(
          { cartId, description },
          {
            onSuccess: (res) => {
              const orderId = res.orderData.data.id;
              openOrderSuccess({
                preparationTime: "soon",
                orderId,
              });
              setShowConfirmPickup(false);
            },
          }
        );
    },
    [paymentMethod, makePayment, chargeWallet, openOrderSuccess,]
  );

  // Handle place order
  const handlePlaceOrder = (cartId: string, description: string) => {
    if (deliveryType === "PICKUP") {
      setShowConfirmPickup(true);
      return;
    }

    handleOrder(cartId, description);
  };

  const handleClearCart = () => {
    if (!checkoutData?.cart.id) return;

    clearCartMutation.mutate(
      { cartId: checkoutData.cart.id, vendorId },
      {
        onSuccess: () => {
          setShowAlert(false);
          if (closeCheckout) closeCheckout(false);
        },
      }
    );
  };

  const handleRemoveCartItem = (cartId: string, cartItemId: string) => {
    if (!cartId || !cartItemId) return;
    setIsRemovingItemId(cartItemId);

    removeItem(
      { cartId: cartId, cartItemId: cartItemId },
      {
        onSettled: () => setIsRemovingItemId(null),
      }
    );
  };

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (
    item: (typeof cartItems)[0],
    action: "increase" | "decrease"
  ) => {
    if (item.quantity < 1) return; // Don't allow quantity less than 1

    setQuantityChangeId(item.id);

    mutate(
      {
        item: {
          menuId: item.menuId,
          menuName: item.menuName,
          unitPrice: item.unitPrice,
          description: item.description,
          menuImg: item.menuImg,
          quantity: 1,
          action: action === "increase" ? "INCREMENT" : "DECREMENT",
          currency: "NGN",
          // addons: item.addons.map((addon) => ({
          //   menuAddonId: addon.menuAddonId,
          //   name: addon.name,
          //   price: safePrice(addon.price),
          //   quantity: addon.quantity,
          // })),
        },
        vendorId,
      },
      {
        onSettled: () => setQuantityChangeId(null),
      }
    );
  };

  // Extract data from API response
  const {
    subtotal = "0",
    deliveryFee = "0",
    serviceFee = "0",
    discountTotal = "0",
    total = "0",
  } = checkoutData || {};
  const cartItems = checkoutData.cart.items;

  const orderSummary = cartItems
    .map((item) => {
      const addonNames = item.addons.map((addon) => addon.name).join(", ");
      return addonNames
        ? `${
            item.quantity > 1
              ? `${item.quantity} portions of ${item.menuName}`
              : `1 portion of ${item.menuName}`
          } + ${addonNames}`
        : `${
            item.quantity > 1
              ? `${item.quantity} portions of ${item.menuName}`
              : `1 portion of ${item.menuName}`
          }`;
    })
    .join(" • ");

  // Create memoized modal props object
  const getmodalProps = useCallback(
    (
      orderSummary: string,
      isChargingWallet: boolean,
      isMakingPayment: boolean
    ) => ({
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
        description: orderSummary,
        isChargingWallet,
        isMakingPayment,
        onConfirm: (cartId: string, description: string) =>
          handleOrder(cartId, description),
      },
      couponSuccess: {
        open: showSuccess,
        onOpenChange: setShowSuccess,
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

  const modalProps = getmodalProps(
    orderSummary,
    isChargingWallet,
    isMakingPayment
  );

  const defaultAdresses = user?.address.find((addr) => addr.setAddressDefault);

  return (
    <>
      <div className="h-full max-sm:fixed max-sm:inset-0  overflow-auto hide-scrollbar p-4 bg-white">
        {/* Header */}
        <div className="relative max-sm:flex items-center justify-center">
          {closeCheckout && (
            <button
              onClick={() => closeCheckout(false)}
              className="absolute left-0"
            >
              <RiArrowLeftLine className="size-5" />
            </button>
          )}
          <h2 className="text-xl font-medium max-sm:text-center leading-7">
            Your Order Summary
          </h2>
        </div>
        <Separator className={`mt-3 ${isSuccess && "mb-6"} max-sm:hidden`} />

        {isLoading && (
          <div className="h-full flex justify-center items-center">
            <Loader size={12} />
          </div>
        )}

        {isError && (
          <div className="h-full flex justify-center items-center">
            <ErrorStateUi message="Error Getting Checkout Details " />
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
            {/* Pack Items */}
            <div className="space-y-4 sm:space-y-6 max-sm:mt-5">
              {cartItems.map((item, index) => {
                const addonsSummary = item.addons
                  .map((addon) => addon.name)
                  .join(", ");
                return (
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
                        {isRemovingItemId === item.id ? (
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
                          {addonsSummary && (
                            <span className="text-neutral-600">
                              + {addonsSummary}
                            </span>
                          )}
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
                          onClick={() => handleQuantityChange(item, "decrease")}
                          disabled={isPending}
                          className="size-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          aria-label="Decrease packs"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="text-sm font-normal text-center">
                          {item.menuId === quantityChangeId ? (
                            <Loader2 className="size-4 animate-spin duration-300 text-neutral-400" />
                          ) : (
                            item.quantity
                          )}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, "increase")}
                          disabled={isPending}
                          className="size-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          aria-label="Increase packs"
                        >
                          <Plus className="size-4 text-black" />
                        </button>
                      </div>
                    </div>

                    {/* Packs Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium">
                        {currency(safePrice(item.unitPrice))}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator className="my-4 sm:my-6" />

            {/* Message rows */}
            <div className="space-y-4 mb-6">
              <button
                onClick={() => setShowRiderNote(true)}
                className="w-full flex items-center justify-between hover:underline cursor-pointer"
              >
                <span className="flex items-center gap-2 text-base leading-5">
                  <RiRestaurant2Fill className="size-5 text-neutral-600" /> Have
                  a message for the rider ?
                </span>
                <RiArrowRightSLine className="size-5 text-neutral-500" />
              </button>

              <button
                onClick={() => setShowSuccess(true)}
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
                  onValueChange={(v: Delivery) => handleDeliveryTypeChange(v)}
                  className="contents"
                >
                  <RadioGroupItem value="DELIVERY" />
                </RadioGroup>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-base leading-5">Pickup</span>
                <RadioGroup
                  value={deliveryType}
                  onValueChange={(v: Delivery) => handleDeliveryTypeChange(v)}
                  className="contents"
                >
                  <RadioGroupItem value="PICKUP" />
                </RadioGroup>
              </label>
            </div>

            <Separator className="my-4 sm:my-6" />

            {/* Delivery details */}
            {deliveryType === "DELIVERY" && (
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
                  <div className="flex items-center gap-2 text-base">
                    <RiWallet3Fill className="size-5 text-primary" /> Wallet
                    Balance -
                    {isBalanceLoading ? (
                      <Loader styles="size-4! text-neutral-400!" />
                    ) : (
                      <span className="text-base font-medium ml-1">
                        {currency(Number(balance))}
                      </span>
                    )}
                  </div>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(v: PaymentMethod) => setPaymentMethod(v)}
                    className="contents"
                  >
                    <RadioGroupItem value="wallet" />
                  </RadioGroup>
                </div>

                <div className="w-full flex items-center justify-between">
                  <span className="flex items-center gap-2 text-base">
                    <RiBankFill className="size-5 text-primary" /> Digital
                    Transfer
                  </span>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(v: PaymentMethod) => setPaymentMethod(v)}
                    className="contents"
                  >
                    <RadioGroupItem value="digitalTransfer" />
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
                  <RiCoupon2Fill className="size-5 text-primary" /> Enter Coupon
                  Code
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
            <div className="grid sm:grid-cols-2 gap-4 max-sm:mx-2 mt-6">
              <Button
                onClick={() =>
                  handlePlaceOrder(cartItems[0].cartId, orderSummary)
                }
                disabled={isMakingPayment || isChargingWallet}
                className="submit-btn"
              >
                {isMakingPayment || isChargingWallet ? (
                  <RiLoader2Line className="size-5 animate-spin" />
                ) : (
                  "PLACE ORDER"
                )}
              </Button>
              <Button
                onClick={() => setShowAlert(true)}
                variant="outline"
                className="submit-btn hover:bg-gray-50 text-neutral-500 border-neutral-300"
              >
                CANCEL ORDERS
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Activity Modals */}
      <RiderNote {...modalProps.riderNote} />
      <CouponSuccess {...modalProps.couponSuccess} />
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
  );
};

export default PageCheckOut;
