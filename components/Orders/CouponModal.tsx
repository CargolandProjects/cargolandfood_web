"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface CouponModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply?: (code: string) => void;
}

const PRESET_COUPONS = [
  { code: "PIZZA10", description: "Get 10% off on any pizza order." },
  { code: "WELCOME50", description: "50% off your first order!" },
  { code: "WEEKEND5", description: "Save $5 on orders over $25 this weekend." },
  { code: "EXTRA20", description: "20% off on orders above $30." },
] as const;

export default function CouponModal({
  open,
  onOpenChange,
  onApply,
}: CouponModalProps) {
  const [selected, setSelected] = useState<string>("WELCOME50");
  const [code, setCode] = useState<string>("WELCOME50");

  // Keep input synced when a radio option is chosen
  useEffect(() => {
    setCode(selected);
  }, [selected]);

  const handleApply = () => {
    if (!code?.trim()) return onOpenChange(false);
    onApply?.(code);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]! p-0 gap-0 rounded-2xl">
        <DialogHeader className="mt-[74px]">
          <DialogTitle className="dialog-title text-center">Coupon</DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="mt-8 pb-4.5 px-7">
          <div className="w-full ">
            <label htmlFor="coupon" className="text-sm font-medium">
              Enter Coupon Code
            </label>
            <Input
              id="coupon"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="DRKEYZ"
              className="w-full mt-1 px-3 py-2.5 h-10 text-sm font-medium rounded-button bg-neutral-100  placeholder:text-[#8A8F98] focus-visible:ring-0"
            />
          </div>

          {/* Divider */}
          <Separator className="my-6" />

          {/* Preset options list */}
          <div className="w-full pb-8">
            <p className="px-2 text-sm font-medium text-neutral-600">
              Select from these
            </p>
            <RadioGroup
              value={selected}
              onValueChange={(v) => setSelected(v)}
              className="mt-4 gap-4"
            >
              {PRESET_COUPONS.map((opt) => (
                <label
                  key={opt.code}
                  className="flex w-full cursor-pointer bg-neutral-100 items-center gap-3 rounded-md px-4 py-3"
                >
                  <div className="flex-1 max-w-[275px] space-y-1">
                    <div className="text-xs font-normal text-neutral-600 line-clamp-1">
                      {opt.code}
                    </div>
                    <div className="text-base font-normal line-clamp-1">
                      {opt.description}
                    </div>
                  </div>
                  <RadioGroupItem value={opt.code} />
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Primary button: 327x48 */}
          <Button
            className="submit-btn"
            onClick={handleApply}
          >
            ADD COUPON
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
