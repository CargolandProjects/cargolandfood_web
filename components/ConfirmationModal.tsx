"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { RiCloseFill } from "react-icons/ri";

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

const ConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Continue",
  cancelText = "Cancel",
  // variant = "default",
}: ConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[400px]! p-0 m-0 gap-0 rounded-2xl px-10.5">
        <AlertDialogHeader className=" gap-0">
          <Button onClick={() => onOpenChange(false)} variant="ghost" className="size-10 absolute top-4.5 right-4.5">
            <RiCloseFill className="size-6" />
          </Button>
          <AlertDialogTitle className="text-2xl mt-[74px] font-bold leading-8 text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="max-w-[287px] text-base font-normal leading-5 text-neutral-600 text-center mt-3">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 mb-14 gap-3">
          <AlertDialogCancel className="submit-btn flex-1 hover:bg-gray-50 text-neutral-500 border-neutral-300">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="submit-btn flex-1"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
