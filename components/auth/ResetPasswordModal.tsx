"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuthFlow from "@/lib/stores/authFlowStore";
import ModalTransition from "./ModalTransition";

const ResetPasswordModal = () => {
  const { goToStep } = useAuthFlow();

  const handleResetPasswordSubmit = () => {
    // Simulate password reset - you'll replace this with actual form handling
    // After successful password reset, go to sign in
    goToStep("signin");
  };

  return (
    <ModalTransition>
      <DialogHeader>
        <DialogTitle>Reset Password</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <p className="text-sm text-gray-600">Enter your new password below.</p>

        {/* You'll add your reset password form here */}
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm">Reset Password Form Goes Here</p>
          <p className="text-xs text-gray-500 mt-1">
            (New password + Confirm password fields)
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <Button onClick={handleResetPasswordSubmit} className="w-full">
            Reset Password (Demo)
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

export default ResetPasswordModal;
