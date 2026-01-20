"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Loader2, Minus, Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiBankCardFill,
  RiBankFill,
  RiCoupon2Fill,
  RiDeleteBin6Line,
  RiEBike2Line,
  RiGiftFill,
  RiMapPinFill,
  RiRestaurant2Fill,
  RiWallet3Fill,
} from "react-icons/ri";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import type { CheckoutPreview } from "@/lib/types/cart.types";
import { useClearCart, useAddToCart } from "@/lib/hooks/mutations/useCart";
import { usePlaceOrder } from "@/lib/hooks/mutations/useOrder";
import { useUIStore } from "@/lib/stores/uiStore";
import ConfirmationModal from "../ConfirmationModal";
import RiderNote from "./RiderNoteModal";
import CouponSuccess from "./CouponSuccessModal";
import CouponModal from "./CouponModal";
import OrderSuccessModal from "./OrderSuccessModal";
import GiftModal from "./GiftModal";
import PickupConfirmModal from "./PickupConfirmModal";

type Delivery = "delivery" | "pickup";
type PaymentMethod = "wallet" | "newCard" | "bankTransfer";

interface CheckoutProps {
  vendorId: string;
  checkoutData: CheckoutPreview | undefined;
  isLoading: boolean;
  deliveryType: "DELIVERY" | "PICKUP";
  onDeliveryTypeChange: (type: "DELIVERY" | "PICKUP") => void;
  closeCheckout: (v: boolean) => void;
}

const Checkout = ({
  vendorId,
  checkoutData,
  isLoading,
  deliveryType: apiDeliveryType,
  onDeliveryTypeChange,
  closeCheckout,
}: CheckoutProps) => {
  // API mutations
  const clearCartMutation = useClearCart(vendorId);
  const placeOrderMutation = usePlaceOrder(vendorId);
  const { mutate, isPending } = useAddToCart(vendorId);

  // Initialize delivery type from backend data (cart's deliveryType)
  const backendDeliveryType = checkoutData?.cartItem.deliveryType;
  const [deliveryType, setDeliveryType] = useState<Delivery>(() => {
    // Prefer backend data over prop
    if (backendDeliveryType) {
      return backendDeliveryType === "DELIVERY" ? "delivery" : "pickup";
    }
    return apiDeliveryType === "DELIVERY" ? "delivery" : "pickup";
  });

  // Sync UI with backend when data changes
  React.useEffect(() => {
    if (backendDeliveryType) {
      const uiType = backendDeliveryType === "DELIVERY" ? "delivery" : "pickup";
      setDeliveryType(uiType);
    }
  }, [backendDeliveryType]);

  const [showAlert, setShowAlert] = useState(false);
  const [showRiderNote, setShowRiderNote] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showConfirmPickup, setShowConfirmPickup] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  // Format currency
  const currency = (n: number) => `₦ ${n.toLocaleString()}`;

  // Safe number parsing for API string values
  const safePrice = (value: string | undefined | null) => {
    if (!value) return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // Handle delivery type change - convert UI lowercase to API uppercase
  const handleDeliveryTypeChange = (type: Delivery) => {
    setDeliveryType(type);
    onDeliveryTypeChange(type === "delivery" ? "DELIVERY" : "PICKUP");
  };

  const handleOrder = () => {
    placeOrderMutation.mutate(undefined, {
      onSuccess: () => {
        setShowOrderSuccess(true);
      },
    });
  };

  // Handle place order
  const handlePlaceOrder = () => {
    if (deliveryType === "pickup") {
      setShowConfirmPickup(true);
      return;
    }

    handleOrder();
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (!checkoutData?.cartItem.id) return;

    clearCartMutation.mutate(checkoutData.cartItem.id, {
      onSuccess: () => {
        setShowAlert(false);
        closeCheckout(false);
      },
    });
  };

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (
    item: (typeof cartItems)[0],
    newQuantity: number
  ) => {
    if (newQuantity < 1) return; // Don't allow quantity less than 1

    // Re-add item with new quantity (API replaces/updates existing item)
    mutate({
      menuId: item.menuId,
      menuName: item.menuName,
      unitPrice: item.unitPrice,
      quantity: newQuantity,
      currency: "NGN",
      addons: item.addons.map((addon) => ({
        menuAddonId: addon.menuAddonId,
        name: addon.name,
        price: safePrice(addon.price),
        quantity: addon.quantity,
      })),
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-sm:fixed max-sm:inset-0 bg-white p-4 flex items-center justify-center">
        <p className="text-gray-500">Loading checkout...</p>
      </div>
    );
  }

  // Empty cart state
  if (!checkoutData || !checkoutData.cartItem.items.length) {
    return (
      <div className="max-sm:fixed max-sm:inset-0 bg-white p-4 flex items-center justify-center">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  // Extract data from API response
  const { cartItem, subtotal, deliveryFee, serviceFee, discountTotal, total } =
    checkoutData;
  const cartItems = cartItem.items;

  return (
    <>
      <div className="max-sm:fixed max-sm:inset-0 bg-white p-4 overflow-auto hide-scrollbar ">
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
        <Separator className="mt-3 mb-6 max-sm:hidden" />

        {/* Pack Items */}
        <div className="space-y-4 sm:space-y-6 max-sm:mt-5">
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-3"
            >
              {/* Pack Header */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-normal text-gray-500">
                  Pack {index + 1}
                </h2>
                <button
                  // disabled
                  className="text-primary transition-colors bg-primary-300 p-1.5 rounded-md "
                  aria-label="Delete pack"
                >
                  <RiDeleteBin6Line className="size-5 text-primary" />
                </button>
              </div>

              {/* Pack Item */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-medium">{item.quantity}x</span>
                  <div>
                    <h3 className="text-base font-normal leading-5">
                      {item.menuName}
                    </h3>
                    {item.addons.length > 0 && (
                      <p className="text-sm font-normal text-gray-500">
                        {item.addons
                          .map((addon) => `+ ${addon.name}`)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-base font-medium">
                  {currency(safePrice(item.totalPrice))}
                </span>
              </div>

              {/* Packs Counter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-medium">1x</span>
                  <span className="text-base font-normal leading-5">Packs</span>
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1 || isPending}
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
                        handleQuantityChange(item, item.quantity + 1)
                      }
                      disabled={isPending}
                      className="size-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase packs"
                    >
                      <Plus className="size-4 text-black" />
                    </button>
                  </div>
                </div>
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
              <RiRestaurant2Fill className="size-5 text-neutral-600" /> Have a
              message for the rider ?
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
              onValueChange={(v: Delivery) => handleDeliveryTypeChange(v)}
              className="contents"
            >
              <RadioGroupItem value="delivery" />
            </RadioGroup>
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-base leading-5">Pickup</span>
            <RadioGroup
              value={deliveryType}
              onValueChange={(v: Delivery) => handleDeliveryTypeChange(v)}
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
              <button className="w-full flex items-center justify-between">
                <span className="flex items-center gap-2 text-base leading-5">
                  <RiMapPinFill className="size-5 text-primary" /> 45 Denkede
                  Street, Shomolu
                </span>
                <RiArrowRightSLine className="size-5 text-neutral-500" />
              </button>
            </div>
          </div>
        )}

        {/* Payment method */}
        <div>
          <h3 className="text-base font-medium leading-6">Payment Method</h3>
          <div className="mt-4 space-y-2">
            <div className="w-full flex items-center justify-between">
              <span className="flex items-center gap-2 text-base">
                <RiWallet3Fill className="size-5 text-primary" /> Wallet Balance
                -{" "}
                <span className="text-base font-medium ml-1">
                  {currency(32600)}
                </span>
              </span>
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
                <RiBankCardFill className="size-5 text-primary" /> Add New Card
              </span>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(v: PaymentMethod) => setPaymentMethod(v)}
                className="contents"
              >
                <RadioGroupItem value="newCard" />
              </RadioGroup>
            </div>

            <div className="w-full flex items-center justify-between">
              <span className="flex items-center gap-2 text-base">
                <RiBankFill className="size-5 text-primary" /> Bank Transfer
              </span>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(v: PaymentMethod) => setPaymentMethod(v)}
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
              <RiCoupon2Fill className="size-5 text-primary" /> Enter Coupon
              Code
            </span>
            <RiArrowRightSLine className="size-5 text-neutral-500" />
          </button>
        </div>

        <Separator className="my-6" />

        {/* Payment summary */}
        <div className="">
          <h3 className="text-base font-medium leading-6">Payment Summary</h3>
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
            onClick={handlePlaceOrder}
            disabled={placeOrderMutation?.isPending}
            className="submit-btn flex-1"
          >
            {placeOrderMutation?.isPending ? "PLACING ORDER..." : "PLACE ORDER"}
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

      {/* Activity Modals */}
      <RiderNote open={showRiderNote} onOpenChange={setShowRiderNote} />
      <CouponSuccess open={showSuccess} onOpenChange={setSuccess} />
      <CouponModal open={showCoupon} onOpenChange={setShowCoupon} />
      <OrderSuccessModal
        open={showOrderSuccess}
        onOpenChange={setShowOrderSuccess}
        closeCheckout = {closeCheckout}
      />
      <GiftModal open={showGift} onOpenChange={setShowGift} />
      <PickupConfirmModal
        open={showConfirmPickup}
        onOpenChange={setShowConfirmPickup}
        onConfirm={handleOrder}
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

export default Checkout;
