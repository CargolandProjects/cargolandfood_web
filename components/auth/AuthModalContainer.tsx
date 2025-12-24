"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AnimatePresence } from "framer-motion";
import useAuthFlow from "@/lib/stores/authFlowStore";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import OTPModal from "./OTPModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ResetPasswordModal from "./ResetPasswordModal";
import SuccessModal from "./SuccessModal";
import SelectAddressModal from "./SelectAddressModal";
import ConfirmationModal from "@/components/ConfirmationModal";

const AuthModalContainer = () => {
  const {
    currentStep,
    isOpen,
    attemptClose,
    showExitConfirmation,
    confirmClose,
    cancelClose,
  } = useAuthFlow();

  const renderModal = () => {
    switch (currentStep) {
      case "signin":
        return <SignInModal />;
      case "signup":
        return <SignUpModal />;
      case "otp-verification":
        return <OTPModal />;
      case "forgot-password":
        return <ForgotPasswordModal />;
      case "reset-password":
        return <ResetPasswordModal />;
      case "success":
        return <SuccessModal />;
      case "address":
        return <SelectAddressModal />;
      default:
        return null;
    }
  };

  // const styles: Partial<Record<AuthState, string>> = {
  //   signup: "max-w-[400px]!",
  // };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={attemptClose}>
        <DialogContent
          className={
            "overflow-auto max-h-[95vh] max-w-100! hide-scrollbar pt-[74px] pb-4.5"
          }
        >
          <AnimatePresence mode="wait">{renderModal()}</AnimatePresence>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        open={showExitConfirmation}
        onOpenChange={cancelClose}
        onConfirm={confirmClose}
        title="Leave authentication?"
        description="You'll lose your progress and need to start over. Are you sure you want to continue?"
        confirmText="Leave"
        cancelText="Stay"
        variant="destructive"
      />
    </>
  );
};

export default AuthModalContainer;
