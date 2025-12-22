import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RiArrowRightSLine, RiMapPinFill } from "react-icons/ri";

interface GiftModalProps {
  open: boolean;
  onOpenChange: (close: boolean) => void;
}

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Enter a valid phone number"),
  email: z.string("Enter a valid email address").min(1, "Email is required"),
  name: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Full name can only contain letters, spaces, hyphens, and apostrophes"
    ),
});

type ReceiverType = z.infer<typeof formSchema>;

const GiftModal = ({ open, onOpenChange }: GiftModalProps) => {
  const [msg, setMsg] = useState("");
  const { control, handleSubmit } = useForm<ReceiverType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
    },
  });
  const maxLength = 200;

  const onSubmit = (data: ReceiverType) => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-100! gap-o p-0 px-7 overflow-auto max-h-[95vh] hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="dialog-title mt-[74px]">
            Gift Someone
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <FieldSet>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="field">
                    <FieldLabel className="form-label">
                      Reciever&apos;s name
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input"
                      placeholder="Home"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="phoneNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="field">
                    <FieldLabel className="form-label">
                      Reciever&apos;s number
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input"
                      placeholder="+234 080000000000"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="field">
                    <FieldLabel className="form-label">
                      Reciever&apos;s email
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input"
                      placeholder="example@gmail.com"
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* Address */}
              <Field className="gap-1">
                <FieldLabel>Receiver’s delivery address</FieldLabel>
                <button className="w-full p-3 bg-neutral-100 rounded-button flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <RiMapPinFill className="size-5 text-neutral-600" /> 45
                    Denkede Street, Shomolu
                  </span>
                  <RiArrowRightSLine className="size-5 text-neutral-500" />
                </button>
              </Field>
              {/* Message */}
              <div className="relative ">
                <label className="form-label mb-1 block">
                  Add a message for the receiver
                </label>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="p-3 w-full rounded-xl border border-neutral-300 h-[167px] max-h-[167px] bg-neutral-100"
                  placeholder="Please enter any special gift message here."
                  maxLength={maxLength}
                ></textarea>

                <span className="absolute right-3 bottom-3 text-neutral-500 text-xs font-medium">
                  {msg.length}/{maxLength}
                </span>
              </div>
            </FieldGroup>
          </FieldSet>

          <Button
            type="submit"
            className="mt-8 submit-btn mb-6.5"
            // disabled={isPending}
          >
            {/* {isPending ? (
              <RiLoader2Line className="size-5 animate-spin" />
            ) : ( */}
            Save Details
            {/* )} */}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GiftModal;
