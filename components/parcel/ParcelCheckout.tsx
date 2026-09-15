import { currency, safePrice } from "@/lib/utils";
import {
  RiArrowRightSLine,
  RiBankFill,
  RiCoupon2Fill,
  RiEBike2Line,
  RiGlobalFill,
  RiLoader2Line,
  RiRestaurant2Fill,
  RiWallet3Fill,
} from "react-icons/ri";
import { Separator } from "../ui/separator";
import { Field, FieldLabel } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect, useState } from "react";
import { PaymentMethod } from "../orders/PageCheckOut";
import { Button } from "../ui/button";
import Loader from "../Loader";
import { useChargeWallet } from "@/lib/hooks/mutations/useChargeWallet";
import { useMakePayment } from "@/lib/hooks/mutations/usePlaceOrder";
import {
  useDeleteParcel,
  useGetParcelDlFees,
} from "@/lib/hooks/mutations/useParcel";
import { useActiveParcel } from "@/lib/hooks/queries/useGetParcel";
import { UseFormReturn } from "react-hook-form";
import {
  DEFAULT_VALUES,
  ParcelDetailsData,
} from "./ParcelDetails";
import ConfirmationModal from "../ConfirmationModal";

const ParcelCheckout = ({
  id,
  setOpen,
  setAction,
  form,
}: {
  id: string | undefined;
  setOpen: (v: boolean) => void;
  setAction: (v: boolean) => void;
  form: UseFormReturn<ParcelDetailsData>;
}) => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    "DIGITAL_TRANSFER",
  );

  const { data } = useActiveParcel();
  const { mutate: deleteParcel, isPending: isDeleting } = useDeleteParcel();
  const { mutate: getDlFees, isPending: isGettingFees } = useGetParcelDlFees();
  const { mutate: makePayment, isPending: isMakingPayment } = useMakePayment();
  const { mutate: chargeWallet, isPending: isChargingWallet } =
    useChargeWallet();

  const handleDelete = () => {
    if (!id) return;
    deleteParcel(id, {
      onSuccess: () => {
        form.reset(DEFAULT_VALUES);
        setOpen(false);
        setAction(true);
      },
    });
  };

  return (
    <div>
      {/* Message rows */}
      <div className="space-y-4 md:space-y-6 mb-6">
        <Button
          variant="ghost" //   onClick={() => setShowRiderNote(true)}
          className="p-4! h-auto w-full flex items-center justify-between border rounded-md hover:underline cursor-pointer"
        >
          <span className="flex items-center gap-2 text-base leading-5">
            <RiEBike2Line className="size-6 text-neutral-600" /> Have a message
            for the rider ?
          </span>
          <RiArrowRightSLine className="size-5 text-neutral-500" />
        </Button>

        {/* Coupon code */}

        <Button
          variant="ghost"
          onClick={() => setShowCoupon(true)}
          className="p-0! h-auto w-full flex items-center justify-between hover:underline hover:bg-transparent"
        >
          <span className="flex items-center gap-2 text-base leading-5">
            <RiCoupon2Fill className="size-6 text-primary" /> Enter Coupon Code
          </span>
          <RiArrowRightSLine className="size-5 text-neutral-500" />
        </Button>
      </div>

      <Separator className="my-6" />

      {/* Payment Summary */}
      <div className="">
        <h3 className="text-base font-medium leading-6">Payment Summary</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-sm leading-4.5">Delivery Fee</span>
            <span className="leading-5">{currency(safePrice("0"))}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-base font-medium leading-6">Total</span>
            <span className="text-base font-medium leading-6">
              {currency(safePrice("0"))}
            </span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Payment method */}
      <div>
        <h3 className="text-base font-medium leading-6">Payment Method</h3>
        <div className="mt-4 space-y-2">
          <RadioGroup
            orientation="horizontal"
            value={paymentMethod}
            onValueChange={(v: PaymentMethod) => setPaymentMethod(v)}
            className="gap-2"
          >
            {/*  Wallet */}
            <FieldLabel
              htmlFor="wallet"
              className="bg-transparent! border-none!"
            >
              <Field
                orientation="horizontal"
                className="p-0! gap-2 justify-between hover:cursor-pointer"
              >
                <p className="flex items-center gap-2 text-base ">
                  <RiWallet3Fill className="size-5 text-primary" /> Wallet
                  Balance -
                  {false ? (
                    <Loader styles="size-4! text-neutral-400!" />
                  ) : (
                    <span className="text-base font-medium ml-1">
                      {currency(Number("0"))}
                    </span>
                  )}
                </p>
                <RadioGroupItem id="wallet" value="WALLET" />
              </Field>
            </FieldLabel>
            {/* Digital transfer */}
            <FieldLabel
              htmlFor="digitalTransfer"
              className="bg-transparent! border-none!"
            >
              <Field
                orientation="horizontal"
                className="p-0! gap-2 justify-between hover:cursor-pointer"
              >
                <p className="flex items-center gap-2 text-base ">
                  <RiGlobalFill className="size-5 text-primary" /> Pay Online
                </p>
                <RadioGroupItem id="digitalTransfer" value="DIGITAL_TRANSFER" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col  gap-4 mt-6 md:mt-10">
        <Button
          type="button"
          //   onClick={() => handlePlaceOrder(cartItems[0].cartId, orderSummary)}
          //   disabled={isMakingPayment || isChargingWallet}
          className="submit-btn "
        >
          {isMakingPayment || isChargingWallet ? (
            <RiLoader2Line className="size-5 animate-spin" />
          ) : (
            "Make Payment"
          )}
        </Button>
        <Button
          type="button"
          onClick={() => setShowAlert(true)}
          disabled={isDeleting}
          variant="outline"
          className="submit-btn hover:bg-gray-50 text-neutral-500 border-neutral-300"
        >
          {isDeleting ? (
            <RiLoader2Line className="size-5 animate-spin" />
          ) : (
            "CANCEL ORDER"
          )}
        </Button>
      </div>

      <ConfirmationModal
        title="Delete Parcel"
        description="Are you sure you want to delete your parcel Order?"
        confirmText="Proceed "
        open={showAlert}
        onOpenChange={setShowAlert}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ParcelCheckout;
