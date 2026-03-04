"use client";
import success from "@/assets/gifs/success.gif";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/uiStore";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentSuccessfulPageContent() {
  const openOrderDetails = useUIStore((s) => s.openOrderDetails);

  const searchParams = useSearchParams();
  const reference = searchParams.get("trxref");

  const handleOrderDetails = () => {
    if (!reference) return;
    openOrderDetails({ reference, source: "paymentSuccessful" });
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-[328px] flex flex-col items-center">
        <div className="size-[124px] sm:size-[180px]">
          <img
            src={success.src}
            alt="payment success gif"
            className="size-full"
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-medium sm:font-bold leading-7 sm:leading-8 mt-3 sm:mt-1">
          Transcation Successsful
        </h1>
        <p className="text-base sm:max-w-[287px] leading-5 text-center text-neutral-600 mt-3">
          Your payment was successful, you can now view your order details
        </p>
        <Button
          onClick={handleOrderDetails}
          className="submit-btn mt-[52px] w-full"
        >
          Order Details
        </Button>
      </div>
    </div>
  );
}

export default function PaymentSuccessfulPage() {
  return (
    <Suspense>
      <PaymentSuccessfulPageContent />
    </Suspense>
  );
}
