"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuthFlow from "@/lib/stores/authFlowStore";
import ModalTransition from "./ModalTransition";

const SignInModal = () => {
  const { goToStep } = useAuthFlow();

  return (
    <ModalTransition>
      <DialogHeader>
        <DialogTitle>Sign In</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <p className="text-sm text-gray-600">
          Sign in to your account to continue
        </p>

        {/* You'll add your sign in form here */}
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm">Sign In Form Goes Here</p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col space-y-2">
          <Button
            variant="ghost"
            onClick={() => goToStep("forgot-password")}
            className="text-sm"
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
      </div>
    </ModalTransition>
  );
};

export default SignInModal;
