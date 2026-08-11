import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { ParcelType } from "./Parcel";
import ParcelRoute from "./ParcelRoute";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import {
  RiArrowGoBackLine,
  RiArrowLeftLine,
  RiCloseFill,
} from "react-icons/ri";
import { Separator } from "../ui/separator";
import { useSession } from "@/lib/hooks/useSession";
import ParcelDetailsForm from "./ParcelDetailsForm";

export type ParcelSteps = "ROUTE" | "PARCEL_INFO" | "CHECKOUT";

const ParcelDetailsContent = ({
  // open,
  isDesktop,
  setOpen,
  type,
}: {
  // open: boolean;
  isDesktop: boolean;
  setOpen: (v: boolean) => void;
  type: ParcelType | null;
}) => {
  const [step, setStep] = useState<ParcelSteps>("ROUTE");
  const [route, setRoute] = useState({
    origin: "",
    destination: "",
  });
  const { user: session } = useSession();
  const defaultAddress = session?.address?.find((a) => a.setAddressDefault);

  // update the default address based on type
  useEffect(() => {
    if (type === "SEND")
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoute((prev) => ({
        ...prev,
        origin: defaultAddress?.addressLine1 || "",
      }));
    else
      setRoute((prev) => ({
        ...prev,
        destination: defaultAddress?.addressLine1 || "",
      }));
  }, [defaultAddress?.addressLine1, type]);

  console.log("Route Locations:", route);

  const handleRoute = (value: string, type: "ORIGIN" | "DESTINATION") => {
    if (type === "ORIGIN") setRoute((prev) => ({ ...prev, origin: value }));
    if (type === "DESTINATION")
      setRoute((prev) => ({ ...prev, destination: value }));
  };

  const currentStep = () => {
    switch (step) {
      case "ROUTE":
        return (
          <ParcelRoute
            type={type}
            route={route}
            setRoute={handleRoute}
            setStep={setStep}
          />
        );
      case "PARCEL_INFO":
        return <ParcelDetailsForm type={type} setStep={setStep} />;
    }
  };

  const handleBack = () => {
    if (step === "PARCEL_INFO") setStep("ROUTE");
    if (step === "CHECKOUT") setStep("PARCEL_INFO");
  };

  return (
    <div className="h-screen pb-4 px-5 sm:px-6 sm:pb-6 overflow-y-auto hide-scrollbar">
      {isDesktop ? (
        // Desktop Header
        <SheetHeader className="p-0 pb-1 pt-4 sm:pt-6 sticky top-0 z-20 bg-white flex flex-row items-center justify-between">
          <div className="flex gap-2">
            <button onClick={handleBack}>
              <RiArrowGoBackLine className="size-5" />
            </button>

            <SheetTitle className="text-xl font-medium max-sm:text-center leading-7">
              {step === "ROUTE" && "Route"}
              {step === "PARCEL_INFO" && "Details"}
            </SheetTitle>
          </div>

          <SheetClose asChild>
            <button className="size-10 flex justify-center items-center rounded-full bg-neutral-100">
              <RiCloseFill className="size-6" />
            </button>
          </SheetClose>
        </SheetHeader>
      ) : (
        // Mobile Header
        <div className="pb-3 pt-4 sticky top-0 z-20 flex items-center justify-center bg-white">
          <button
            onClick={() => setOpen(false)}
            className="absolute left-0 ml-1"
          >
            <RiArrowLeftLine className="size-5" />
          </button>
          <h2 className="text-lg sm:text-xl font-medium leading-6 sm:leading-7">
            {step === "ROUTE" && "Route"}
            {step === "PARCEL_INFO" && "Details"}
          </h2>
        </div>
      )}

      {isDesktop && <Separator className="mt-2 mb-6" />}

      {currentStep()}
    </div>
  );
};

const ParcelDetails = ({
  open,
  setOpen,
  type,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  type: ParcelType | null;
}) => {
  // Detect if we're on desktop (only runs once on mount, then on resize)
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Adjust the breakpoint as needed

  return (
    <>
      {isDesktop && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="p-0 gap-0 min-w-[464px] [&>button]:hidden">
            <ParcelDetailsContent
              setOpen={setOpen}
              isDesktop={isDesktop}
              // close={close}
              type={type}
            />
          </SheetContent>
        </Sheet>
      )}

      <AnimatePresence mode="wait">
        {!isDesktop && open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
            className="fixed z-37 inset-0 bg-white"
          >
            <ParcelDetailsContent
              setOpen={setOpen}
              isDesktop={isDesktop}
              type={type}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ParcelDetails;
