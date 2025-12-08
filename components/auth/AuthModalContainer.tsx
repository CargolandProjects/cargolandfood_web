"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence } from "framer-motion";
import useAuthFlow from "@/lib/stores/authFlowStore";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import OTPModal from "./OTPModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ResetPasswordModal from "./ResetPasswordModal";

const AuthModalContainer = () => {
  const { currentStep, isOpen, closeAuth } = useAuthFlow();

  const renderModal = () => {
    switch (currentStep) {
      case 'signin':
        return <SignInModal />;
      case 'signup':
        return <SignUpModal />;
      case 'otp-verification':
        return <OTPModal />;
      case 'forgot-password':
        return <ForgotPasswordModal />;
      case 'reset-password':
        return <ResetPasswordModal />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeAuth}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {renderModal()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModalContainer;