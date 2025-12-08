"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuthFlow from "@/lib/stores/authFlowStore";
import ModalTransition from "./ModalTransition";

const OTPModal = () => {
  const { goToStep, formData, closeAuth } = useAuthFlow();

  const otpType = formData.otpType || "signup";
  const email = formData.email || "your email";

  const handleOTPVerify = () => {
    // Simulate OTP verification - you'll replace this with actual verification
    if (otpType === "signup") {
      // After successful signup OTP, go to sign in
      goToStep("signin");
    } else if (otpType === "forgot-password") {
      // After forgot password OTP, go to reset password
      goToStep("reset-password");
    } else {
      // After sign in OTP, close modal (user is now authenticated)
      closeAuth();
    }
  };

  const handleBack = () => {
    if (otpType === "signup") {
      goToStep("signup");
    } else if (otpType === "forgot-password") {
      goToStep("forgot-password");
    } else {
      goToStep("signin");
    }
  };

  return (
    <ModalTransition>
      <DialogHeader>
        <DialogTitle>Enter Verification Code</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <p className="text-sm text-gray-600">
          We&apos;ve sent a verification code to {email}
        </p>

        {/* You'll add your OTP input form here */}
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm">OTP Input Form Goes Here</p>
          <p className="text-xs text-gray-500 mt-2">
            Context: {otpType} verification
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <Button onClick={handleOTPVerify} className="w-full">
            Verify Code (Demo)
          </Button>

          <Button variant="outline" className="w-full">
            Resend Code
          </Button>

          <Button variant="ghost" onClick={handleBack} className="text-sm">
            ← Back
          </Button>
        </div>
      </div>
    </ModalTransition>
  );
};

export default OTPModal;
