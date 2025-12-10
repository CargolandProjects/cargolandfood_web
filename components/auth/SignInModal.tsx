"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuthFlow from "@/lib/stores/authFlowStore";
import ModalTransition from "./ModalTransition";
import { logo } from "@/assets/svgs";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

const SignInModal = () => {
  const { goToStep } = useAuthFlow();
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onsubmit = (data: FormData) => {
    console.log("Submitted Successfully:", data);
    setTimeout(() => {
      goToStep("otp-verification", { phone: data.phoneNumber, otpType: "signup" });
    }, 3000);
  };

  return (
    <ModalTransition>
      <DialogHeader className="items-center">
        <div className="size-[50px] bg-black flex justify-center items-center rounded-lg">
          <img
            src={logo.src}
            alt="CargoLand Food Logo"
            className="h-[33.4px] w-7 object-cover"
          />
        </div>
        <DialogTitle className="form-title">Welcome Back</DialogTitle>
        <DialogDescription className="form-description text-center">
          You can login into your account using your <br /> phone number
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onsubmit)}>
        <FieldSet>
          <FieldGroup className="gap-5">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="field">
                  <FieldLabel className="form-label">Phone Number</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="+234 08000000000"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="field">
                  <FieldLabel className="form-label">Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <Button
          type="submit"
          className="mt-8 md:py-3.5 h-12 uppercase font-black w-full hover:cursor-pointer"
        >
          Continue
        </Button>
      </form>

      <div>
        <p className="relative my-4 text-gray-500 text-center">
          <Separator
            decorative={true}
            className="absolute  top-1/2 transform translate-y-1/2"
          />
          <span className="relative bg-background px-2 z-10">
            Or continue with
          </span>
        </p>

        <div className="flex w-full justify-center gap-4">
          <div className="size-10 shadow-cargo-sm rounded-full border border-gray-200"></div>
          <div className="size-10 shadow-cargo-sm rounded-full border border-gray-200"></div>
          <div className="size-10 shadow-cargo-sm rounded-full border border-gray-200"></div>
        </div>
      </div>
      {/* Navigation buttons */}
      <div className="flex flex-col space-y-2">
        <Button
          variant="link"
          onClick={() => goToStep("forgot-password")}
          className="text-sm text-brand-black font-normal"
        >
          Forgot Password?
        </Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => goToStep("signup")}
            className="text-primary hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </ModalTransition>
  );
};

export default SignInModal;
