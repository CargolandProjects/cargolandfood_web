import { currency } from "@/lib/utils";
import { RiEdit2Fill, RiGlobalFill } from "react-icons/ri";
import { Separator } from "../ui/separator";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
import { PaymentMethod } from "../orders/PageCheckOut";
import { Button } from "../ui/button";
import Loader from "../Loader";

import { Controller, useFormContext } from "react-hook-form";
import { ParcelDetailsData } from "./ParcelDetails";
import { PhoneInput } from "../ui/phone-input";
import { Input } from "../ui/input";
import { Parcel } from "@/lib/services/parcel.service";
import { useGetParcelDlFees } from "@/lib/hooks/queries/useParcel";

const ParcelCheckout = ({
  paymentMethod,
  setPaymentMethod,
  activeParcel,
}: {
  // form: UseFormReturn<ParcelDetailsData>;
  activeParcel: Parcel | undefined;

  paymentMethod: PaymentMethod | null;
  setPaymentMethod: (v: PaymentMethod) => void;
}) => {
  const [edit, setEdit] = useState(false);

  const { control, getValues, watch } = useFormContext<ParcelDetailsData>();
  const formData = getValues();

  const pickUpAddrLat = watch("pickUpAddrLat");
  const pickUpAddrLng = watch("pickUpAddrLng");
  const dropOffAddrLat = watch("dropOffAddrLat");
  const dropOffAddrLng = watch("dropOffAddrLng");
  const packageWorth = watch("packageWorth");
  const packageIsurance = watch("packageIsurance");

  const {
    data: deliveryFees,
    isLoading: isGettingFees,
    isSuccess,
    isError,
    refetch,
  } = useGetParcelDlFees({
    pickUpAddrLat,
    pickUpAddrLng,
    dropOffAddrLat,
    dropOffAddrLng,
    packageWorth,
    packageIsurance,
  });

  return (
    <div>
      <div className="">
        <h3 className="text-base font-medium leading-5">
          Confirm your details
        </h3>

        <div className="my-6 px-2 py-3 bg-primary/8 rounded-sm">
          <div className="flex justify-between">
            <h3 className="text-base font-medium leading-5">
              Sender Information
            </h3>
            <Button
              onClick={() => setEdit((prev) => !prev)}
              type="button"
              variant="ghost"
              className="p-0! h-auto hover:bg-transparent"
            >
              <RiEdit2Fill className="size-6 text-primary" />
            </Button>
          </div>

          {(!edit || activeParcel) && (
            <div className="mt-3 rounded-sm bg-white space-y-4 px-3 py-4">
              <div className="flex justify-between gap-4">
                <span className="shrink-0">Sender name:-</span>
                <span className="font-medium">{formData.senderName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="shrink-0">Sender number:-</span>
                <span className="font-medium">{formData.senderNumber}</span>
              </div>
              {/* <div className="flex justify-between gap-4">
                <span className="shrink-0">Receiver name:-</span>
                <span className="font-medium">{formData.receiverName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="shrink-0">Receiver number:-</span>
                <span className="font-medium">{formData.receiverNumber}</span>
              </div> */}
              <div className="flex justify-between gap-4">
                <span className="shrink-0">Pick Up:-</span>
                <span className="font-medium line-clamp-1 break-all">
                  {formData.pickUpAddrName}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="shrink-0">Drop Off:-</span>
                <span className="font-medium line-clamp-1 break-all">
                  {formData.dropOffAddrName}
                </span>
              </div>
            </div>
          )}

          {edit && !activeParcel && (
            <FieldGroup className="mt-3 rounded-sm bg-white gap-4 px-3 py-4">
              <Controller
                name="senderName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    {/* Wrap the label and input in a flex row */}
                    <div className="flex items-end justify-between gap-4">
                      <FieldLabel
                        htmlFor={field.name}
                        className="form-label font-normal! shrink-0"
                      >
                        Sender name:-
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Name"
                        className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 text-right shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black h-5 transition-colors font-medium text-sm"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="senderNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <div className="flex flex-row items-end justify-between gap-4">
                      <FieldLabel
                        htmlFor={field.name}
                        className="form-label font-normal! shrink-0"
                      >
                        Sender number:-
                      </FieldLabel>
                      <div className="flex-1 flex justify-end">
                        <PhoneInput
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          defaultCountry={"NG"}
                          inline
                          aria-invalid={fieldState.invalid}
                          placeholder="+234 08000000000"
                          // We use arbitrary variants [&>input] to style the actual input inside the PhoneInput wrapper
                          className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 shadow-none [&>input]:text-right [&>input]:border-0 [&>input]:bg-transparent [&>input]:shadow-none [&>input]:focus-visible:ring-0 h-5 transition-colors font-medium text-sm"
                        />
                      </div>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* <Controller
                name="receiverName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <div className="flex flex-row items-end justify-between gap-4">
                      <FieldLabel
                        htmlFor={field.name}
                        className="form-label font-normal! shrink-0"
                      >
                        Receiver name:-
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Name"
                        className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 text-right shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black h-5 transition-colors font-medium text-sm"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="receiverNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <div className="flex flex-row items-end justify-between gap-4">
                      <FieldLabel
                        htmlFor={field.name}
                        className="form-label font-normal! shrink-0"
                      >
                        Receiver number:-
                      </FieldLabel>
                      <div className="flex-1 flex justify-end">
                        <PhoneInput
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          defaultCountry={"NG"}
                          inline
                          aria-invalid={fieldState.invalid}
                          placeholder="+234 08000000000"
                          // We use arbitrary variants [&>input] to style the actual input inside the PhoneInput wrapper
                          className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 shadow-none [&>input]:text-right [&>input]:border-0 [&>input]:bg-transparent [&>input]:shadow-none [&>input]:focus-visible:ring-0 h-5 transition-colors font-medium text-sm"
                        />
                      </div>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              /> */}

              <Controller
                name="pickUpAddrName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    {/* Wrap the label and input in a flex row */}
                    <div className="flex flex-row items-end justify-between gap-4">
                      <FieldLabel
                        htmlFor={field.name}
                        className="form-label font-normal! shrink-0"
                      >
                        Pick Up:-
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Pickup Address"
                        disabled
                        className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 text-right shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black h-5 transition-colors font-medium text-sm"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="dropOffAddrName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    {/* Wrap the label and input in a flex row */}
                    <div className="flex flex-row items-end justify-between gap-4">
                      <FieldLabel
                        htmlFor={field.name}
                        className="form-label font-normal! shrink-0"
                      >
                        Drop Off:-
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Pickup Address"
                        disabled
                        className="border-0 border-b border-gray-300 rounded-none bg-transparent px-0 text-right shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black h-5 transition-colors font-medium text-sm"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* <Button
              // className="w-fit self-end"
              >
                Save
              </Button> */}
            </FieldGroup>
          )}

          {edit && activeParcel && (
            <p className="mt-1 text-xs text-center text-red-500">
              Parcel created already, can&apos;t edit!
            </p>
          )}
        </div>
      </div>

      {/* Message rows */}
      {/* <div className="space-y-4 md:space-y-6 mb-6">
        <Button
          type="button"
          variant="ghost" //   onClick={() => setShowRiderNote(true)}
          className="p-4! h-auto w-full flex items-center justify-between border rounded-md hover:underline cursor-pointer"
        >
          <span className="flex items-center gap-2 text-base leading-5">
            <RiEBike2Line className="size-6 text-neutral-600" /> Have a message
            for the rider ?
          </span>
          <RiArrowRightSLine className="size-5 text-neutral-500" />
        </Button>

     
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
      </div> */}

      <Separator className="my-6" />

      {/* Payment Summary */}
      <div className="">
        <h3 className="text-base font-medium leading-6">Payment Summary</h3>
        {isGettingFees && (
          <div className="mt-2 flex gap-2 items-center">
            <Loader size={5} />
            <p className="text-xs font-normal">Calculating delivery fee...</p>
          </div>
        )}

        {isError && (
          <p className="mt-2 text-xs font-normal">
            We could not calculate the fee.{" "}
            <span
              onClick={() => refetch()}
              className="text-primary hover:cursor-pointer hover:underline hover:underline-offset-2"
            >
              retry
            </span>
          </p>
        )}

        {isSuccess && (
          <div className="mt-4 space-y-2">
            <div className="flex items-start justify-between text-sm">
              <div className="flex flex-col">
                <span className="text-sm leading-4.5">Package Value</span>
                <span className="leading-5 text-xs text-neutral-500">
                  Declared for insurance not chared
                </span>
              </div>
              <span className="leading-5">{currency(packageWorth)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-sm leading-4.5">Delivery Fee</span>
              <span className="leading-5">
                {currency(deliveryFees?.deliveryFee.toString())}
              </span>
            </div>

            <div className="flex items-start justify-between text-sm">
              <div className="flex flex-col">
                <span className="text-sm leading-4.5">Insurance</span>
                <span className="leading-5 text-xs text-neutral-500">
                  2% of {currency(packageWorth)} declared value
                </span>
              </div>
              <span className="leading-5">
                {currency(deliveryFees.insuranceFee.toString())}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-base font-medium leading-6">Total</span>
              <span className="text-base font-medium leading-6">
                {currency(deliveryFees?.total.toString())}
              </span>
            </div>
          </div>
        )}
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
            {/* <FieldLabel
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
                      {currency("0")}
                    </span>
                  )}
                </p>
                <RadioGroupItem id="wallet" value="WALLET" />
              </Field>
            </FieldLabel> */}
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
    </div>
  );
};

export default ParcelCheckout;
