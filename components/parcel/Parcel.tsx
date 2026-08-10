import { useState } from "react";
import ParcelActionModal from "./ParcelActionModal";
import ParcelDetails from "./ParcelDetails";

export type ParcelType = "SEND" | "RECEIVE";

const Parcel = () => {
  const [parcelType, setParcelType] = useState<ParcelType | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openActions, setAction] = useState(false);

  console.log("Parcel Type:", parcelType); // Log the current parcel type whenever it changes

  return (
    <div>
      <ParcelActionModal
        open={openActions}
        setOpen={setAction}
        setParcelType={setParcelType}
        openDetails={setOpenDetails}
      />
      <ParcelDetails
        open={openDetails}
        setOpen={setOpenDetails}
        type={parcelType}
      />
    </div>
  );
};

export default Parcel;
