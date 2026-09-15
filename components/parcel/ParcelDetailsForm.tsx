import { ParcelType } from "./Parcel";
import { ParcelDetailsData } from "./ParcelDetails";
import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import { useSession } from "@/lib/hooks/useSession";
import { Button } from "../ui/button";
import {
  RiDiscussLine,
  RiEdit2Fill,
  RiSecurePaymentLine,
} from "react-icons/ri";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { formatNumber } from "@/lib/utils";

const ParcelDetailsForm = ({ type }: { type: ParcelType | null }) => {
  const { control, watch, setValue } = useFormContext<ParcelDetailsData>();
  const [edit, setEdit] = useState(false);
  const { user: session } = useSession();

  const insurePackage = watch("packageIsurance");

  return (
    <FieldSet>
      <FieldGroup className="gap-6">
        <FieldTitle className="text-base leading-5">
          Sender Information
        </FieldTitle>
        {!edit && type === "SEND" ? (
          <div className=" px-4 py-3 flex justify-between items-center gap-4 bg-primary-50">
            <div className="rounded-sm space-y-1">
              <h3 className="text-xs text-neutral-600 font-normal leading-4">
                Details
              </h3>
              <p className="">{session?.fullName}</p>
              <p className="">{session?.phoneNumber}</p>
            </div>

            <Button
              onClick={() => setEdit(true)}
              type="button"
              variant="ghost"
              className="p-0! h-auto hover:bg-transparent"
            >
              <RiEdit2Fill className="size-6 text-primary" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Controller
              name="senderName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor={field.name}
                    className="form-label font-normal!"
                  >
                    Sender&apos;s name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
                    className="form-input h-10"
                  />
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
                  <FieldLabel
                    htmlFor={field.name}
                    className="form-label font-normal!"
                  >
                    Sender&apos;s number
                  </FieldLabel>
                  <PhoneInput
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    defaultCountry={"NG"}
                    inline
                    aria-invalid={fieldState.invalid}
                    placeholder="+234 08000000000"
                    className="form-input h-10 px-3 "
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        )}
      </FieldGroup>

      <FieldGroup className="gap-6">
        <FieldTitle className="text-base leading-5">
          Receiver Information
        </FieldTitle>
        {!edit && type === "RECEIVE" ? (
          <div className=" px-4 py-3 flex justify-between items-center gap-4 bg-primary-50">
            <div className="rounded-sm space-y-1">
              <h3 className="text-xs text-neutral-600 font-normal leading-4">
                Details
              </h3>
              <p className="">{session?.fullName}</p>
              <p className="">{session?.phoneNumber}</p>
            </div>

            <Button
              onClick={() => setEdit(true)}
              type="button"
              variant="ghost"
              className="p-0! h-auto hover:bg-transparent"
            >
              <RiEdit2Fill className="size-6 text-primary" />
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Controller
              name="receiverName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor={field.name}
                    className="form-label font-normal!"
                  >
                    Receiver&apos;s name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
                    className="form-input h-10"
                  />
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
                  <FieldLabel
                    htmlFor={field.name}
                    className="form-label font-normal!"
                  >
                    Receiver&apos;s number
                  </FieldLabel>
                  <PhoneInput
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    defaultCountry={"NG"}
                    inline
                    aria-invalid={fieldState.invalid}
                    placeholder="+234 08000000000"
                    className="form-input h-10 px-3 "
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        )}
      </FieldGroup>

      <FieldGroup className="gap-6">
        <FieldTitle className="text-base leading-5">
          Package Insurance
        </FieldTitle>

        <Controller
          name="packageIsurance"
          control={control}
          render={({ field, fieldState }) => (
            <FieldLabel htmlFor={field.name} className="p-4">
              <Field
                orientation="horizontal"
                data-invalid={fieldState.invalid}
                className="p-0! gap-3 hover:cursor-pointer"
              >
                <RiSecurePaymentLine className="size-4 text-primary shrink-0" />

                <div className="">
                  <p className="leading-5.5">Package Insurance</p>
                  <p className="text-xs text-gray-500">
                    Secure your shipment with our insurance and stay protected
                    against unexpected event. We’ve got you covered!
                  </p>
                </div>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) setValue("packageWorth", "");
                  }}
                  id={field.name}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            </FieldLabel>
          )}
        />

        {insurePackage && (
          <div className="">
            <Controller
              name="packageWorth"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor={field.name}
                    className="form-label font-normal!"
                  >
                    How much is your package worth?
                  </FieldLabel>
                  <Input
                    {...field}
                    value={formatNumber(field.value)}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D/g, ""))
                    }
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="How much?"
                    className="form-input h-10"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="mt-2 px-4 py-3 flex gap-3 rounded-xs bg-primary-50">
              <div className="size-10 flex shrink-0 justify-center items-center rounded-full bg-primary/10">
                <RiDiscussLine className="size-5.5 text-primary" />
              </div>
              <div className="">
                <p className="">The Reason We Need It.</p>
                <p className="mt-1 text-xs text-gray-600">
                  No worries! Your protection fee is calculated based on the
                  value of your parcel.
                </p>
              </div>
            </div>
          </div>
        )}
      </FieldGroup>
    </FieldSet>
  );
};

export default ParcelDetailsForm;
