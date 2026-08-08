import React, { useState } from "react";
import ParcelActionModal from "./ParcelActionModal";

const Parcel = () => {
  const [parcelType, setParcelType] = useState<"send" | "receive" | null>(null);

  console.log("Parcel Type:", parcelType); // Log the current parcel type whenever it changes 

  return (
    <div>
      <ParcelActionModal setParcelType={setParcelType} />
      
    </div>
  );
};

export default Parcel;
