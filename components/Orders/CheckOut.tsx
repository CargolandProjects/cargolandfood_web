"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import {
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

type Delivery = "delivery" | "pickup";
type PaymentMethod = "wallet" | "newCard" | "bankTransfer";

import { useCartStore } from "@/lib/stores/useCartStore";
import ConfirmationModal from "../ConfirmationModal";
import { ScrollArea } from "../ui/scroll-area";
import RiderNote from "./RiderNoteModal";
import CouponSuccess from "./CouponSuccessModal";
import CouponModal from "./CouponModal";

const Checkout = () => {
  const {
    items,
    remove,
    increase,
    decrease,
    getTotalPrice,
    getItemPosition,
    clearCart,
  } = useCartStore();
  const [deliveryType, setDeliveryType] = useState<Delivery | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showRiderNote, setShowRiderNote] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );

  const currency = (n: number) => `₦ ${n.toLocaleString()}`;

  // Payment summary (stubbed for now)
  const subTotal = getTotalPrice();
  const deliveryFee = 800;
  const serviceFee = 900;
  const discounts = 660;
  const total = subTotal + deliveryFee + serviceFee - discounts;

  return (
    <>
      <ScrollArea className="max-w-[400px] h-[85vh] shadow-lg rounded-xl">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          {/* Header */}
          <h2 className="text-xl font-medium">Checkout</h2>
          <Separator className="mt-3 mb-6" />

          {/* Pack Items */}
          <div className="space-y-6 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-3"
              >
                {/* Pack Header */}
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-normal text-gray-500">
                    Pack {getItemPosition(item.id)}
                  </h2>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-primary transition-colors bg-primary-300 hover:bg-primary-400/20 p-1.5 rounded-md cursor-pointer"
                    aria-label="Delete pack"
                  >
                    <RiDeleteBin6Line className="size-5" />
                  </button>
                </div>

                {/* Pack Item */}
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-medium">1x</span>
                    <div>
                      <h3 className="text-base font-normal leading-5">
                        {item.product.name}
                      </h3>
                      <p className="text-sm font-normal text-gray-500">
                        + extra sausage
                      </p>
                    </div>
                  </div>
                  <span className="text-base font-medium">
                    {currency(item.unitPrice)}
                  </span>
                </div>

                {/* Packs Counter */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-medium">1x</span>
                    <span className="text-base font-normal leading-5">
                      Packs
                    </span>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => decrease(item.id)}
                        className="size-5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                        aria-label="Decrease packs"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="text-sm font-normal text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increase(item.id)}
                        className="size-5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                        aria-label="Increase packs"
                      >
                        <Plus className="size-4 text-black" />
                      </button>
                    </div>
                  </div>
                  <span className="text-base font-medium">
                    {currency(Number(item.product.price))}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Message rows */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => setShowRiderNote(true)}
              className="w-full flex items-center justify-between hover:underline cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm">
                <RiRestaurant2Fill className="size-5 text-neutral-700" /> Have a
                message for the rider ?
              </span>
              <RiArrowRightSLine className="size-5 text-neutral-500" />
            </button>

            <button
              onClick={() => setSuccess(true)}
              className="w-full flex items-center justify-between hover:underline cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm">
                <RiEBike2Line className="size-5 icon-r-left text-neutral-700" />{" "}
                Have a message for the restaurant ?
              </span>
              <RiArrowRightSLine className="size-5 text-neutral-500" />
            </button>
          </div>

          {/* Delivery vs Pickup */}
          <div className="space-y-2 mb-6">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Delivery</span>
              <RadioGroup
                value={deliveryType}
                onValueChange={(v: Delivery) => setDeliveryType(v)}
                className="contents"
              >
                <RadioGroupItem value="delivery" />
              </RadioGroup>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm">Pickup</span>
              <RadioGroup
                value={deliveryType}
                onValueChange={(v: Delivery) => setDeliveryType(v)}
                className="contents"
              >
                <RadioGroupItem value="pickup" />
              </RadioGroup>
            </label>
          </div>

          <Separator className="my-6" />

          {/* Delivery details */}
          {deliveryType === "delivery" && (
            <div className="mb-6">
              <h3 className="text-base font-medium leading-6">
                Delivery Details
              </h3>
              <div className="space-y-2 mt-4">
                <button className="w-full flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <RiMapPinFill className="size-5 text-primary" /> 45 Denkede
                    Street, Shomolu
                  </span>
                  <RiArrowRightSLine className="size-5 text-neutral-500" />
                </button>
                <button className="w-full flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <RiGiftFill className="size-5 text-primary" /> Ordering for
                    someone else?
                  </span>
                  <RiArrowRightSLine className="size-5 text-neutral-500" />
                </button>
              </div>
            </div>
          )}

          {/* Payment method */}
          <div className=" mb-6">
            <h3 className="text-base font-medium leading-6">Payment Method</h3>
            <div className="mt-4 space-y-2">
              <button className="w-full flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <RiWallet3Fill className="size-5 text-primary" /> Wallet
                  Balance -{" "}
                  <span className="font-medium ml-1">{currency(32600)}</span>
                </span>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v: PaymentMethod) => setPaymentMethod(v)}
                  className="contents"
                >
                  <RadioGroupItem value="wallet" />
                </RadioGroup>
              </button>
              <button className="w-full flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <RiBankCardFill className="size-5 text-primary" /> Add New
                  Card
                </span>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v: PaymentMethod) => setPaymentMethod(v)}
                  className="contents"
                >
                  <RadioGroupItem value="newCard" />
                </RadioGroup>
              </button>
              <button className="w-full flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <RiBankFill className="size-5 text-primary" /> Bank Transfer
                </span>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v: PaymentMethod) => setPaymentMethod(v)}
                  className="contents"
                >
                  <RadioGroupItem value="bankTransfer" />
                </RadioGroup>
              </button>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Coupon code */}
          <div className="mb-6">
            <button
              onClick={() => setShowCoupon(true)}
              className="w-full flex items-center justify-between hover:underline"
            >
              <span className="flex items-center gap-2 text-sm">
                <RiCoupon2Fill className="size-5 text-primary" /> Enter Coupon
                Code
              </span>
              <RiArrowRightSLine className="size-5 text-neutral-500" />
            </button>
          </div>

          <Separator className="my-6" />

          {/* Payment summary */}
          <div className="mb-6">
            <h3 className="text-base font-medium leading-6">Payment Summary</h3>
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sm leading-4.5">Orders</span>
                <span>{currency(subTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sm leading-4.5">Delivery Fee</span>
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 ">
            <Button className="submit-btn flex-1">PLACE ORDER</Button>
            <Button
              onClick={() => setShowAlert(true)}
              variant="outline"
              className="submit-btn flex-1 hover:bg-gray-50 text-neutral-400 border-neutral-200"
            >
              CANCEL ORDERS
            </Button>
          </div>
        </div>
      </ScrollArea>

      {/* Activity Modals */}
      <RiderNote open={showRiderNote} onOpenChange={setShowRiderNote} />
      <CouponSuccess open={showSuccess} onOpenChange={setSuccess} />
      <CouponModal open={showCoupon} onOpenChange={setShowCoupon} />

      <ConfirmationModal
        confirmText="Clear"
        description="Are you sure you want to clear your cart?"
        // confirmText="Clear"
        // cancelText="Clear"
        title="Clear Cart?"
        open={showAlert}
        onOpenChange={() => setShowAlert(false)}
        onConfirm={clearCart}
      />
    </>
  );
};

export default Checkout;
