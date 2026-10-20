import { boxLocation, receivePackage, sendPacakage } from "@/assets/svgs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { ParcelType } from "./Parcel";
import { ActiveParcel } from "@/lib/services/parcel.service";

const ParcelActionModal = ({
  open,
  isLoading,
  setOpen,
  activeParcel,
  onSelectType,
  onResumeCheckout,
}: {
  open: boolean;
  isLoading: boolean;
  setOpen: (v: boolean) => void;
  activeParcel: ActiveParcel | undefined;
  onSelectType: (type: ParcelType) => void;
  onResumeCheckout: () => void;
}) => {
  console.log("PARCEL ACTION: ", activeParcel);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="relative w-[103px] h-[72px] sm:w-31 sm:h-29 flex-col gap-0 rounded-md sm:rounded-xl cursor-pointer bg-[#EFFAF6] text-black hover:bg-[#EFFAF6]/80 ring-0!">
          <span className="absolute top-0.5 left-0.5 px-3 py-1 text-[8px] leading-3 font-medium rounded-full text-white bg-primary">
            New
          </span>
          <div className="size-8 sm:size-10 overflow-hidden">
            <Image
              src={boxLocation}
              alt="box location icon"
              className="object-cover size-full"
            />
          </div>
          <p className="font-medium text-xs sm:text-sm mt-1.5 text-center">
            Parcel
          </p>
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`max-w-[400px]! max-sm:w-[95vw]! px-5 pb-5.75 gap-0 ${isLoading ? "h-[270px]" : "pt-14.5"} `}
      >
        {isLoading && (
          <div className="flex items-center justify-center">
            {/* <Loader2 className="size-10 text-primary animate-spin" /> */}
            <p className="text-base animate-pulse text-gray-500">
              Fetching Parcel Details!
            </p>
          </div>
        )}

        {!isLoading && activeParcel && (
          <>
            <DialogHeader className="items-center gap-3">
              <DialogTitle className="text-2xl font-bold leading-8">
                Pending Parcel
              </DialogTitle>
              <DialogDescription className="text-base leading-5">
                You have an unpaid parcel. Continue to checkout to finish, or
                cancel it to start a new one.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <Button onClick={onResumeCheckout} className="submit-btn">
                Continue to Checkout
              </Button>
            </div>
          </>
        )}

        {!isLoading && !activeParcel && (
          <>
            <DialogHeader className="items-center gap-3">
              <DialogTitle className="text-2xl font-bold leading-8">
                Parcel
              </DialogTitle>
              <DialogDescription className="text-base leading-5">
                Do you want to send or receive items?
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => onSelectType("SEND")}
                variant="ghost"
                className="flex-col flex-1 h-[100px] sm:h-[145px] p-0 gap-2 bg-neutral-100 ring-0!"
              >
                <div className="size-10 sm:size-20 overflow-hidden">
                  <Image
                    src={sendPacakage}
                    alt="send package"
                    className="object-cover size-full"
                  />
                </div>
                <p className="sm:text-sm leading-4 text-center">
                  Send a package
                </p>
              </Button>
              <Button
                onClick={() => onSelectType("RECEIVE")}
                variant="ghost"
                className="flex-col flex-1 h-[100px] sm:h-[145px] p-0 gap-2 bg-neutral-100 ring-0!"
              >
                <div className="size-10 sm:size-20 overflow-hidden">
                  <Image
                    src={receivePackage}
                    alt="receive package"
                    className="object-cover size-full"
                  />
                </div>
                <p className="sm:text-sm leading-4 text-center">
                  Receive a package
                </p>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ParcelActionModal;
