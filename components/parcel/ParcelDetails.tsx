import { useEffect, useRef, useState } from "react";
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
  RiLoader2Line,
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
import { useCreateParcel } from "@/lib/hooks/mutations/useParcel";
import ParcelCheckout from "./ParcelCheckout";
import { useActiveParcel } from "@/lib/hooks/queries/useGetParcel";
import { ActiveParcel } from "@/lib/services/parcel.service";

export type ParcelSteps = "ROUTE" | "PARCEL_INFO" | "CHECKOUT";

const headerTitle: Record<ParcelSteps, string> = {
  ROUTE: "Route",
  PARCEL_INFO: "Details",
  CHECKOUT: "Checkout",
};

const parcelDetailsSchema = z
  .object({
    pickUpAddrName: z
      .string()
      .min(5, "Address is too short")
      .max(200, "Address is too long"),
    pickUpAddrLat: z.string().min(1, "Pickup Latitude is required"),
    pickUpAddrLng: z.string().min(1, "Pickup Longitude is required"),
    dropOffAddrName: z
      .string()
      .min(5, "Address is too short")
      .max(200, "Address is too long"),
    dropOffAddrLat: z.string().min(1, "Drop-off Latitude is required"),
    dropOffAddrLng: z.string().min(1, "Drop-off Longitude is required"),
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

export const DEFAULT_VALUES: ParcelDetailsData = {
  receiverName: "",
  receiverNumber: "",
  senderName: "",
  senderNumber: "",
  pickUpAddrName: "",
  pickUpAddrLat: "",
  pickUpAddrLng: "",
  dropOffAddrLat: "",
  dropOffAddrLng: "",
  dropOffAddrName: "",
  packageIsurance: false,
  packageWorth: "",
};

const ParcelDetailsContent = ({
  // open,
  isDesktop,
  step,
  type,
  activeParcel,
  setOpen,
  setAction,
  setStep,
  form,
}: {
  // open: boolean;
  isDesktop: boolean;
  step: ParcelSteps;
  type: ParcelType | null;
  activeParcel: ActiveParcel | undefined;
  setOpen: (v: boolean) => void;
  setAction: (v: boolean) => void;
  setStep: React.Dispatch<React.SetStateAction<ParcelSteps>>;
  form: UseFormReturn<ParcelDetailsData>;
}) => {
  const { mutate: createParcel, isPending } = useCreateParcel();

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

  const disabled =
    (type === "SEND" && dropOffAddrName.trim().length < 2) ||
    (type === "RECEIVE" && pickUpAddrName.trim().length < 2);

  const currentStep = () => {
    switch (step) {
      case "ROUTE":
        return <ParcelRoute type={type} />;
      case "PARCEL_INFO":
        return <ParcelDetailsForm type={type} />;
      case "CHECKOUT":
        return (
          <ParcelCheckout
            id={activeParcel?.id}
            form={form}
            setOpen={setOpen}
            setAction={setAction}
          />
        );
    }
  };

  const onSubmit = (data: ParcelDetailsData) => {
    console.log("Parcel Data: ", data);
    createParcel(data, {
      onSuccess: () => {
        setStep("CHECKOUT");
      },
    });
  };

  const handleBack = () => {
    if (step === "ROUTE") setOpen(false);
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
              {headerTitle[step]}
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
          <button onClick={handleBack} className="absolute left-0 ml-1">
            <RiArrowLeftLine className="size-5" />
          </button>
          <h2 className="text-lg sm:text-xl font-medium leading-6 sm:leading-7">
            {headerTitle[step]}
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
            <Button disabled={isPending} className="mt-25 submit-btn">
              {isPending ? (
                <RiLoader2Line className="size-5 animate-spin" />
              ) : (
                "Create Parcel"
              )}
            </Button>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

const ParcelDetails = ({
  open,
  type,
  setOpen,
  setAction,
  initialStep = "ROUTE",
}: {
  open: boolean;
  type: ParcelType | null;
  initialStep?: ParcelSteps;
  setOpen: (v: boolean) => void;
  setAction: (v: boolean) => void;
}) => {
  // Detect if we're on desktop (only runs once on mount, then on resize)
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Adjust the breakpoint as needed
  const [step, setStep] = useState<ParcelSteps>("ROUTE");
  const form = useForm<ParcelDetailsData>({
    resolver: zodResolver(parcelDetailsSchema),
    defaultValues: DEFAULT_VALUES,
  });
  const { data: activeParcel } = useActiveParcel();

  const { user: session } = useSession();
  const defaultAddress = session?.address?.find((a) => a.setAddressDefault);

  // Track the last type we initialised for, so session/address re-fetches
  // don't clobber in-progress form data.
  const prevTypeRef = useRef<ParcelType | null>(null);

  // Sync step to the caller's intent each time the sheet opens.
  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(initialStep);
  }, [open, initialStep]);

  useEffect(() => {
    if (activeParcel) {
      form.reset({
        dropOffAddrLat: activeParcel.dropOffAddrLat,
        dropOffAddrLng: activeParcel.dropOffAddrLng,
        dropOffAddrName: activeParcel.dropOffAddrName,
        pickUpAddrLat: activeParcel.pickUpAddrLat,
        pickUpAddrLng: activeParcel.pickUpaddrLng,
        pickUpAddrName: activeParcel.pickUpAddrName,
        senderName: activeParcel.senderName,
        senderNumber: activeParcel.senderNumber,
        receiverName: activeParcel.receiverName,
        receiverNumber: activeParcel.receiverNumber,
        packageWorth: activeParcel.packageWorth,
        packageIsurance: activeParcel.packageIsurance,
      });
    }
  }, [activeParcel, form]);

  console.log("Active Parcel", activeParcel);

  useEffect(() => {
    if (!type || activeParcel) return;

    const typeChanged = prevTypeRef.current !== type;
    prevTypeRef.current = type;

    // Full reset + step reset ONLY on a genuine type change
    if (typeChanged) {
      form.reset();
      setStep("ROUTE");
    }

    if (!defaultAddress?.latitude || !defaultAddress?.longitude) {
      if (typeChanged) {
        toast.error("Latitude or longitude is missing for the default address");
      }
      return;
    }

    // Seed default address / sender / receiver for the current type
    if (type === "SEND") {
      form.setValue("pickUpAddrLat", defaultAddress.latitude);
      form.setValue("pickUpAddrLng", defaultAddress.longitude);
      form.setValue("pickUpAddrName", defaultAddress.addressLine1);
      form.setValue("senderName", session?.fullName || "");
      form.setValue("senderNumber", session?.phoneNumber || "");
    } else {
      form.setValue("dropOffAddrLat", defaultAddress.latitude);
      form.setValue("dropOffAddrLng", defaultAddress.longitude);
      form.setValue("dropOffAddrName", defaultAddress.addressLine1);
      form.setValue("receiverName", session?.fullName || "");
      form.setValue("receiverNumber", session?.phoneNumber || "");
    }
  }, [
    type,
    defaultAddress?.addressLine1,
    defaultAddress?.latitude,
    defaultAddress?.longitude,
    session?.fullName,
    session?.phoneNumber,
    form,
    activeParcel,
  ]);

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
              setAction={setAction}
              activeParcel={activeParcel}
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
              setAction={setAction}
              step={step}
              form={form}
              type={type}
              activeParcel={activeParcel}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </FormProvider>
  );
};

export default ParcelDetails;
