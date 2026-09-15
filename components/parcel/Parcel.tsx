import { useState } from "react";
import ParcelActionModal from "./ParcelActionModal";
import ParcelDetails, { ParcelSteps } from "./ParcelDetails";
import { useActiveParcel } from "@/lib/hooks/queries/useGetParcel";

export type ParcelType = "SEND" | "RECEIVE";

const Parcel = () => {
  const [parcelType, setParcelType] = useState<ParcelType | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openActions, setAction] = useState(false);
  const [initialStep, setInitialStep] = useState<ParcelSteps>("ROUTE");

  const { data: activeParcel, isLoading } = useActiveParcel();
  console.log("Parcel Type:", parcelType); // Log the current parcel type whenever it changes

  const handleSelectType = (type: ParcelType) => {
    setParcelType(type);
    setInitialStep("ROUTE");
    setOpenDetails(true);
    setAction(false);
  };

  const handleResumeCheckout = () => {
    setInitialStep("CHECKOUT");
    setOpenDetails(true);
    setAction(false);
  };

  return (
    <div>
      <ParcelActionModal
        open={openActions}
        isLoading={isLoading}
        setOpen={setAction}
        activeParcel={activeParcel}
        onSelectType={handleSelectType}
        onResumeCheckout={handleResumeCheckout}
      />
      <ParcelDetails
        open={openDetails}
        setOpen={setOpenDetails}
        type={parcelType}
        initialStep={initialStep}
        setAction={setAction}
      />
    </div>
  );
};

export default Parcel;
