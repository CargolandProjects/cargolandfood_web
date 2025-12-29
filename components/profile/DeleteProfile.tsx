import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/lib/services/auth.service";
import { RiLoader2Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { useDeleteUser } from "@/lib/hooks/mutations/useAuth";
import { Input } from "../ui/input";
import { useSession } from "@/lib/hooks/useSession";

interface DeleteProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: User | null;
}
const DeleteProfile = ({ open, onOpenChange, session }: DeleteProfileProps) => {
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { mutate, isPending } = useDeleteUser();
  const { signOut } = useSession();
  const id = session?.id;

  const handleDelete = () => {
    if (confirm !== "CONFIRM") {
      setError("Please enter CONFIRM");
      return;
    }

    if (!id) {
      setError("Unauthorized");
      return;
    }

    mutate(id, {
      onError: (error) => {
        setError(error.message);
      },
      onSuccess: () => {
        setError("");
        signOut();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog">
        <DialogHeader className="mt-[74px] items-center gap-6">
          <DialogTitle className="dialog-title text-center">
            Delete Account
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <h2 className="text-lg leading-6 text-center">
            You are going to delete your account
          </h2>
          <p className="mt-3 text-base leading-5 text-neutral-600">
            We are very sorry to see you leaving. Deleting your account will
            permanently delete all of the data plus any active subscriptions and
            this action can’t be undone!
          </p>
          <p className="mt-4 text-base leading-5 text-neutral-600">
            If you still want to delete your account, enter “CONFIRM” to
            proceed.
          </p>

          <Input
            type="text"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-12 mt-6 mx-2 p-2.5 pl-3 w-full radius-button border border-neutral-300 focus-visible:border-none focus-visible:ring-primary focus-visible:ring "
          />
          <div className="px-[7.5px] mt-6 space-y-1">
            <p className="text-red-500 text-center">{error}</p>

            <Button
              onClick={handleDelete}
              type="submit"
              className=" submit-btn mb-4.5"
              disabled={isPending}
            >
              {isPending ? (
                <RiLoader2Line className="size-5 animate-spin" />
              ) : (
                " Delete Account"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProfile;
