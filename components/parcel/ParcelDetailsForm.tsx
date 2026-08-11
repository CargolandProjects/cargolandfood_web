import z from "zod";
import { ParcelType } from "./Parcel";
import { ParcelSteps } from "./ParcelDetails";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "../ui/field";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import { useSession } from "@/lib/hooks/useSession";

const parcelDetailsSchema = z.object({
  senderName: z
    .string()
    .min(3, "Sender name is required")
    .max(500, "name is too long")
    .optional()
    .or(z.literal("")),
  senderNumber: z
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^\+?\d+$/, "Phone number must contain only digits"),
  receiverName: z
    .string()
    .min(3, "Sender name is required")
    .max(500, "name is too long")
    .optional()
    .or(z.literal("")),
  receiverNumber: z
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^\+?\d+$/, "Phone number must contain only digits"),
  type: z.enum(["SEND", "RECEIVE"]),
});

type ParcelDetailsData = z.infer<typeof parcelDetailsSchema>;

const ParcelDetailsForm = ({
  type,
  setStep,
}: {
  type: ParcelType | null;
  setStep: (v: ParcelSteps) => void;
}) => {
  const { handleSubmit, control } = useForm<ParcelDetailsData>({
    resolver: zodResolver(parcelDetailsSchema),
    defaultValues: {
      receiverName: "",
      receiverNumber: "",
      senderName: "",
      senderNumber: "",
      type: type!,
    },
  });
  const {user: session} = useSession()

  const onSubmit = (data: ParcelDetailsData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup className="gap-6">
          <FieldTitle className="text-base leading-5">
            {" "}
            Sender Information
          </FieldTitle>
          {type === "SEND" ? (
            " "
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
                      className="form-input h-10"
                    />
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
                      Sender&apos;s name
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
                  </Field>
                )}
              />
            </div>
          )}
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ParcelDetailsForm;
