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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useEffect, useState } from "react";
import { useResendOtp, useVerifyOtp } from "@/lib/hooks/mutations/useAuth";
import { useSession } from "@/lib/hooks/useSession";
import { RiLoader2Line } from "react-icons/ri";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const formSchema = z.object({
  otp: z.string().min(4, "OTP must be at least 4 digits"),
  phoneNumber: z.string(),
});

export type VerifyOtp = z.infer<typeof formSchema>;

const OTPModal = () => {
  const { goToStep, formData, closeAuth } = useAuthFlow();
  const { mutate: verifyOtp, isPending } = useVerifyOtp();
  const { completeOtp, user } = useSession();
  const { mutate: resendOtp, isPending: resendPending } = useResendOtp();
  const [otpMessage, setOtpMessage] = useState({
    message: "",
    error: false,
  });
  const [timer, setTimer] = useState(59);

  const { handleSubmit, control } = useForm<VerifyOtp>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      phoneNumber: formData.phone,
    },
  });

  const otpType = formData.otpType || "signup";
  const otpData = useWatch({ control, name: "otp" });

  const routeModal = (addressess: string | undefined) => {
    if (!addressess) {
      goToStep("address");
      return;
    }

    if (otpType === "signup") {
      // After successful signup OTP, go to sign in
      return goToStep("signin");
    } else if (otpType === "forgot-password") {
      // After forgot password OTP, go to reset password
      return goToStep("reset-password");
    } else {
      // After sign in OTP, close modal (user is now authenticated)
      return closeAuth();
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [timer]);

  const handleOTPVerify = (data: VerifyOtp) => {
    verifyOtp(data, {
      onSuccess: (res) => {
        // Persist tokens on OTP verification success
        const access = res?.token?.accessToken;
        const refresh = res?.token?.refreshToken;
        if (typeof window !== "undefined") {
          if (access) localStorage.setItem("auth_token", access);
          if (refresh) localStorage.setItem("refresh_token", refresh);
        }
        console.log(`OTP verified for: ${data.phoneNumber}`);
        // Promote pending user to authenticated user
        completeOtp();
        routeModal(user?.addressess);
      },
    });
  };

  const handleResend = () => {
    if (timer !== 0) {
      setOtpMessage({
        error: true,
        message: `can't request a new otp, wait ${timer} secs`,
      });
      return;
    }
    if (!formData.phone) return;

    resendOtp(
      { phoneNumber: formData.phone },
      {
        onSuccess: () => {
          setOtpMessage({
            error: false,
            message: "New otp sent!",
          });
          setTimer(59);
          console.log("You can now proceed with the API Call");
        },
      }
    );
  };

  // useEffect(() => {
  //   if (otpData.length === 4) {
  //     console.log("OTP Data: ", otpData);
  //     const payload = {
  //       otp: getValues("otp"),
  //       phoneNumber: getValues("phoneNumber"),
  //     };

  //     handleOTPVerify(payload);
  //   }
  // }, [handleOTPVerify, otpData, getValues]);

  // const handleBack = () => {
  //   if (otpType === "signup") {
  //     goToStep("signup");
  //   } else if (otpType === "forgot-password") {
  //     goToStep("forgot-password");
  //   } else {
  //     goToStep("signin");
  //   }
  // };

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
        <DialogTitle className="form-title">Verify your number</DialogTitle>
        <DialogDescription className="form-description text-center">
          We’ve sent a 4-digit code to {formData.phone} <br /> via{" "}
          <span className="text-primary">SMS</span>
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleOTPVerify)}>
        <FieldGroup>
          <Controller
            name="otp"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-3.5">
                <FieldLabel className="mt-8 form-label justify-center">
                  Enter OTP
                </FieldLabel>
                <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup className="justify-center w-full gap-7">
                    <InputOTPSlot index={0} className="otp-slot" />
                    <InputOTPSlot index={1} className="otp-slot" />
                    <InputOTPSlot index={2} className="otp-slot" />
                    <InputOTPSlot index={3} className="otp-slot" />
                  </InputOTPGroup>
                </InputOTP>

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-center"
                  />
                )}
                <FieldDescription className="text-sm text-center">
                  Click{" "}
                  <span
                    onClick={handleResend}
                    className="text-primary hover:underline hover:cursor-pointer "
                  >
                    here
                  </span>{" "}
                  to resend OTP ({timer})
                </FieldDescription>
                <span
                  className={`${
                    otpMessage.error ? "text-red-500" : ""
                  } text-center text-sm -mt-2`}
                >
                  {otpMessage.message}
                </span>
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          disabled={otpData.length !== 4}
          className="disabled:bg-gray-100 disabled:text-gray-300 mt-8 md:py-3.5 submit-btn"
        >
          {isPending || resendPending ? (
            <RiLoader2Line className="size-5 animate-spin" />
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </ModalTransition>
  );
};

export default OTPModal;
