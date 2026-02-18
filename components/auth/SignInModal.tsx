"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuthFlow from "@/lib/stores/authFlowStore";
import ModalTransition from "./ModalTransition";
import { apple, facebook, google, logo } from "@/assets/svgs";
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
import { useSignIn } from "@/lib/hooks/mutations/useAuth";
import { useSession } from "@/lib/hooks/useSession";
import { RiLoader2Line } from "react-icons/ri";
import { toast } from "sonner";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .transform((val) => {
      //Normalize to +234 format
      const phone = val.replace(/[^\d+]/g, "");
      if (phone.startsWith("+234")) return phone;
      if (phone.startsWith("0")) return `+234${phone.slice(1)}`;
      if (phone.startsWith("234")) return `+${phone}`;
      return phone;
    })
    .refine(
      (val) => /^\+234[789]\d{9}$/.test(val),
      "Enter a valid phone number"
    ),

  // password: z.string().min(8, "Password must be at least 8 characters"),
});

export type Signin = z.infer<typeof formSchema>;

const SignInModal = () => {
  const goToStep = useAuthFlow((s) => s.goToStep);
  const { mutate, isPending } = useSignIn();
  const { setPendingUser } = useSession();

  const { handleSubmit, control } = useForm<Signin>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      // password: "",
    },
  });

  const onsubmit = (data: Signin) => {
    // console.log("Submitted Data:", data);
    mutate(data, {
      onSuccess: (res) => {
        try {
          // Save pending user until OTP verification completes
          const pendingUser = res.data.user;
          if (pendingUser) setPendingUser(pendingUser);
        } catch {}
        console.log("Submitted Successfully:", data);
        goToStep("otp-verification", {
          phone: data.phoneNumber,
          otpType: "signin",
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <ModalTransition>
      <DialogHeader className="items-center gap-0">
        <div className="size-[50px] bg-black flex justify-center items-center rounded-lg">
          <img
            src={logo.src}
            alt="CargoLand Food Logo"
            className="h-[33.4px] w-7 object-cover"
          />
        </div>
        <DialogTitle className="form-title mt-4">Welcome Back</DialogTitle>
        <DialogDescription className="form-description text-center mt-0.5 sm:mt-2">
          You can login into your account using your <br /> phone number
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onsubmit)} className="my-8">
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
            {/* <Controller
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
            "Continue"
          )}
        </Button>
      </form>

      <div className="space-y-4">
        <p className="relative text-gray-500 text-center">
          <Separator
            decorative={true}
            className="absolute  top-1/2 transform translate-y-1/2"
          />
          <span className="relative bg-background px-2 z-10">
            Or continue with
          </span>
        </p>

        <div className="flex w-full justify-center gap-4">
          <button className="size-10 flex justify-center items-center shadow-cargo-sm rounded-full border border-gray-200">
            <img src={google.src} alt="google_icon" />
          </button>
          <button className="size-10 flex justify-center items-center shadow-cargo-sm rounded-full border border-gray-200">
            <img src={facebook.src} alt="google_icon" />
          </button>
          <button className="size-10 flex justify-center items-center shadow-cargo-sm rounded-full border border-gray-200">
            <img src={apple.src} alt="google_icon" />
          </button>
        </div>
      </div>
      {/* Navigation buttons */}
      <div className="flex flex-col sm:gap-2 mt-6">
        {/* <Button
          variant="link"
          onClick={() => goToStep("forgot-password")}
          className="text-sm text-brand-black font-normal"
        >
          Forgot Password?
        </Button> */}

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
