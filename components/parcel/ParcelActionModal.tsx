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

const ParcelActionModal = ({
  setParcelType,
}: {
  setParcelType: (type: "send" | "receive") => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative w-[103px] h-[72px] sm:w-31 sm:h-29 flex-col gap-0 rounded-md sm:rounded-xl cursor-pointer bg-[#EFFAF6] text-black hover:bg-[#EFFAF6]/80">
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

      <DialogContent className="max-w-[400px]! max-sm:w-[95vw]! px-5 pt-14.5 pb-5.75 gap-0 ">
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
            onClick={() => setParcelType("send")}
            variant="ghost"
            className="flex-col flex-1 h-[100px] sm:h-[145px] p-0 gap-2 bg-neutral-100"
          >
            <div className="size-10 sm:size-20 overflow-hidden">
              <Image
                src={sendPacakage}
                alt="box location icon"
                className="object-cover size-full"
              />
            </div>
            <p className="sm:text-sm leading-4 text-center">Send a package</p>
          </Button>
          <Button
            onClick={() => setParcelType("receive")}
            variant="ghost"
            className="flex-col flex-1 h-[100px] sm:h-[145px] p-0 gap-2 bg-neutral-100"
          >
            <div className="size-10 sm:size-20 overflow-hidden">
              <Image
                src={receivePackage}
                alt="box location icon"
                className="object-cover size-full"
              />
            </div>
            <p className="sm:text-sm leading-4 text-center">Send a package</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelActionModal;
