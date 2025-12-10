"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuthFlow from "@/lib/stores/authFlowStore";
import ModalTransition from "./ModalTransition";

const SignUpModal = () => {
  const { goToStep, setFormData } = useAuthFlow();

  const handleSignUpSubmit = () => {
    // Simulate form submission - you'll replace this with actual form handling
    const mockFormData = {
      email: "hello@example.com",
      phone: "+1234567890",
      firstName: "John",
      lastName: "Doe",
    };

    // Store form data and navigate to OTP
    setFormData(mockFormData);
    goToStep("otp-verification", { otpType: "signup" });
  };

  return (
    <ModalTransition>
      <DialogHeader>
        <DialogTitle>Sign Up</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <p className="text-sm text-gray-600">
          Create your account to get started
        </p>

        {/* You'll add your sign up form here */}
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm">Sign Up Form Goes Here</p>
        </div>

        {/* Mock submit button for demo */}
        <Button onClick={handleSignUpSubmit} className="w-full">
          Sign Up (Demo)
        </Button>

        {/* Navigation */}
        <div className="text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => goToStep("signin")}
            className="text-primary hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </ModalTransition>
  );
};

export default SignUpModal;
