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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useSignUp } from "@/lib/hooks/mutations/useAuth";
import { RiLoader2Line } from "react-icons/ri";
import { toast } from "sonner";

const formSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[\+]?[1-9][\d]{0,15}$/, "Enter a valid phone number"),
    email: z.email("Enter a valid email address").min(1, "Email is required"),
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name must be less than 50 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Full name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/(?=.*\d)/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    referralCode: z.string().optional(),
    country: z.string().min(1, "Please select your country"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type Signup = z.infer<typeof formSchema>;

const SignUpModal = () => {
  const { goToStep } = useAuthFlow();
  const { mutate, isPending } = useSignUp();
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<Signup>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
      country: "Nigeria",
    },
  });
  // const {} = useForm
  const onSubmit = (data: Signup) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = data;

    mutate(payload, {
      onSuccess: (data) => {
        goToStep("success");

       toast.success(data.message)
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
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
        <DialogTitle className="form-title">Create an account</DialogTitle>
        <DialogDescription className="form-description">
          Please sign up to get started
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-8">
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
                    placeholder="+234 080000000000"
                    className="form-input"
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
                  <FieldLabel className="form-label">Email Address</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="fullName"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="field">
                  <FieldLabel className="form-label">Full Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Oladimeji Adebiyi"
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
                    placeholder="Enter a password"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="field">
                  <FieldLabel className="form-label">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your password"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="referralCode"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="field">
                  <FieldLabel className="form-label">Referral Code</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter a referral code (Optional)"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* <Controller
              name="country"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="field">
                  <FieldLabel className="form-label">Country</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Select your country"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}
          </FieldGroup>
        </FieldSet>

        <Button
          type="submit"
          className="mt-8 md:py-3.5 submit-btn"
          disabled={isPending}
        >
          {isPending ? (
            <RiLoader2Line className="size-5 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      <div>
        <p className="text-sm mt-3.5 text-center">
          By signing up, you agree to our{" "}
          <span className="text-primary">Terms of Service </span> <br />
          and <span className="text-primary">Privacy Policy </span>{" "}
        </p>

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

        <div className="text-center mt-6 text-gray-500">
          <span>Already have an account? </span>
          <button
            onClick={() => goToStep("signin")}
            className="text-primary hover:underline"
          >
            Log in
          </button>
        </div>
      </div>

      {/* Navigation */}
      {/* <div className="text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => goToStep("signin")}
            className="text-primary hover:underline"
          >
            Sign In
          </button>
        </div> */}
    </ModalTransition>
  );
};

export default SignUpModal;
