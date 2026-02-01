import { emptyBox } from "@/assets/svgs";
import React from "react";
import { Button } from "./ui/button";

interface EmptyStateUiProps {
  message: string;
  description: string;
  btn?: boolean;
  btnText?: string;
}

const EmptyStateUi = ({
  message,
  description,
  btn,
  btnText,
}: EmptyStateUiProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="size-50">
        <img
          src={emptyBox.src}
          alt="empty_cart_illustration"
          className="size-full object-cover"
        />
      </div>

      <div className="text-center mt-6">
        <h3 className="text-lg leading-6 text-neutral-500">{message}</h3>
        <p className="mt-3 max-w-[300px] text-base font-normal leading-5 text-neutral-500">
          {description}
        </p>
      </div>

      {btn && (
        <Button
          className="mt-20 md:py-3.5 submit-btn"
          // disabled={isPending}
        >
          {btnText}
        </Button>
      )}
    </div>
  );
};

export default EmptyStateUi;
