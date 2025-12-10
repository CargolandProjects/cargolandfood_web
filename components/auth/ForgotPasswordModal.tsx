"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuthFlow from "@/lib/stores/authFlowStore";
import ModalTransition from "./ModalTransition";

const ForgotPasswordModal = () => {
  const { goToStep, setFormData } = useAuthFlow();

  const handleForgotPasswordSubmit = () => {
    // Simulate form submission - you'll replace this with actual form handling
    const mockFormData = {
      email: "user@example.com",
    };

    // Store email and navigate to OTP for password reset
    setFormData(mockFormData);
    goToStep("otp-verification", { otpType: "forgot-password" });
  };

  return (
    <ModalTransition>
      <DialogHeader>
        <DialogTitle>Forgot Password</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <p className="text-sm text-gray-600">
          Enter your email address and we&apos;ll send you a verification code
          to reset your password.
        </p>

        {/* You'll add your forgot password form here */}
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm">Forgot Password Form Goes Here</p>
        </div>

        <div className="flex flex-col space-y-2">
          <Button onClick={handleForgotPasswordSubmit} className="w-full">
            Send Verification Code (Demo)
          </Button>

          <Button
            variant="ghost"
            onClick={() => goToStep("signin")}
            className="text-sm"
          >
            ← Back to Sign In
          </Button>
        </div>
      </div>
    </ModalTransition>
  );
};

export default ForgotPasswordModal;
