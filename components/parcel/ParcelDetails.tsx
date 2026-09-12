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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  useForm,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { toast } from "sonner";

export type ParcelSteps = "ROUTE" | "PARCEL_INFO" | "CHECKOUT";

const parcelDetailsSchema = z
  .object({
    pickUpAddrName: z
      .string()
      .min(5, "Address is too short")
      .max(200, "Address is too long"),
    pickUpAddrLat: z.number("Latitude must be a number"),
    pickUpAddrLng: z.number("Longitude must be a number"),
    dropOffAddrName: z
      .string()
      .min(5, "Address is too short")
      .max(200, "Address is too long"),
    dropOffAddrLat: z.number("Latitude must be a number"),
    dropOffAddrLng: z.number("Longitude must be a number"),
    senderName: z
      .string("Sender name is required")
      .min(3, "Sender name is too short")
      .max(500, "name is too long")
      .optional(),
    senderNumber: z
      .string()
      .min(7, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\+?\d+$/, "Phone number must contain only digits"),
    receiverName: z
      .string("Receiver name is required")
      .min(3, "Receiver name is too short")
      .max(500, "name is too long")
      .optional(),
    receiverNumber: z
      .string()
      .min(7, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\+?\d+$/, "Phone number must contain only digits"),
    packageWorth: z.string("Enter package").or(z.literal("")),
    packageIsurance: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.packageIsurance && !data.packageWorth.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Package worth is required",
        path: ["packageWorth"],
      });
    }
  });

export type ParcelDetailsData = z.infer<typeof parcelDetailsSchema>;

const ParcelDetailsContent = ({
  // open,
  isDesktop,
  step,
  type,
  setOpen,
  setStep,
  form,
}: {
  // open: boolean;
  isDesktop: boolean;
  step: ParcelSteps;
  type: ParcelType | null;
  setOpen: (v: boolean) => void;
  setStep: React.Dispatch<React.SetStateAction<ParcelSteps>>;
  form: UseFormReturn<ParcelDetailsData>;
}) => {
  const { user: session } = useSession();
  const defaultAddress = session?.address?.find((a) => a.setAddressDefault);

  const pickUpAddrLat = useWatch({
    control: form.control,
    name: "pickUpAddrLat",
  });
  const pickUpAddrLng = useWatch({
    control: form.control,
    name: "pickUpAddrLng",
  });
  const dropOffAddrLat = useWatch({
    control: form.control,
    name: "dropOffAddrLat",
  });
  const dropOffAddrLng = useWatch({
    control: form.control,
    name: "dropOffAddrLng",
  });
  const pickUpAddrName = useWatch({
    control: form.control,
    name: "pickUpAddrName",
  });
  const dropOffAddrName = useWatch({
    control: form.control,
    name: "dropOffAddrName",
  });

  const disabled = !pickUpAddrName.trim() || !dropOffAddrName.trim();

  // update the default address based on type
  useEffect(() => {
    if (!defaultAddress?.latitude || !defaultAddress?.longitude) {
      toast.error("Latitude or longitude is missing for the default address");
      return;
    }

    if (type === "SEND")
      form.setValues({
        pickUpAddrLat: Number(defaultAddress?.latitude),
        pickUpAddrLng: Number(defaultAddress?.longitude),
        pickUpAddrName: defaultAddress?.addressLine1,
        senderName: session?.fullName || "",
        senderNumber: session?.phoneNumber || "",
      });
    else
      form.setValues({
        dropOffAddrLat: Number(defaultAddress?.latitude),
        dropOffAddrLng: Number(defaultAddress?.longitude),
        dropOffAddrName: defaultAddress?.addressLine1,
        receiverName: session?.fullName || "",
        receiverNumber: session?.phoneNumber || "",
      });
  }, [
    defaultAddress?.addressLine1,
    defaultAddress?.latitude,
    defaultAddress?.longitude,
    form,
    session?.fullName,
    session?.phoneNumber,
    type,
  ]);

  const currentStep = () => {
    switch (step) {
      case "ROUTE":
        return <ParcelRoute type={type} />;
      case "PARCEL_INFO":
        return <ParcelDetailsForm type={type} />;
    }
  };

  const onSubmit = (data: ParcelDetailsData) => {
    console.log(data);
  };

  const handleBack = () => {
    if (step === "PARCEL_INFO") setStep("ROUTE");
    if (step === "CHECKOUT") setStep("PARCEL_INFO");
  };

  const routeFields = [
    "pickUpAddrName",
    "pickUpAddrLat",
    "pickUpAddrLng",
    "dropOffAddrName",
    "dropOffAddrLat",
    "dropOffAddrLng",
  ] as const;

  const handleNext = async () => {
    const isValid = await form.trigger(routeFields);

    if (!isValid) {
      console.error("form errors", form.formState.errors);
      return;
    }

    // validate for lat & lng depending on the type and address
    if (type === "SEND" && (!dropOffAddrLat || !dropOffAddrLng)) {
      toast.error("Latitude or longitude is missing for the drop off address");
      return;
    }

    if (type === "RECEIVE" && (!pickUpAddrLat || !pickUpAddrLng)) {
      toast.error("Latitude or longitude is missing for the pickup address");
      return;
    }

    setStep("PARCEL_INFO");
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

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {currentStep()}

          {step === "ROUTE" && (
            <Button
              onClick={handleNext}
              type="button"
              disabled={disabled}
              className="mt-25 submit-btn"
            >
              Next
            </Button>
          )}

          {step === "PARCEL_INFO" && (
            <Button className="mt-25 submit-btn">Create Parcel</Button>
          )}
        </form>
      </FormProvider>
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
  const [step, setStep] = useState<ParcelSteps>("ROUTE");
  const form = useForm<ParcelDetailsData>({
    resolver: zodResolver(parcelDetailsSchema),
    defaultValues: {
      receiverName: "",
      receiverNumber: "",
      senderName: "",
      senderNumber: "",
      pickUpAddrName: "",
      pickUpAddrLat: 0,
      pickUpAddrLng: 0,
      dropOffAddrLat: 0,
      dropOffAddrLng: 0,
      dropOffAddrName: "",
      packageIsurance: false,
      packageWorth: "",
    },
  });

  return (
    <FormProvider {...form}>
      {isDesktop && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="p-0 gap-0 min-w-116 [&>button]:hidden">
            <ParcelDetailsContent
              setOpen={setOpen}
              isDesktop={isDesktop}
              setStep={setStep}
              step={step}
              form={form}
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
              setStep={setStep}
              step={step}
              form={form}
              type={type}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </FormProvider>
  );
};

export default ParcelDetails;
