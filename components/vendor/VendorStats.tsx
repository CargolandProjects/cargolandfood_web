import { RiEBike2Line, RiStarLine, RiTimeLine } from "react-icons/ri";

interface VendorStatsProps {
  rating: number;
  deliveryFee: number | string;
  deliveryTime: string;
}

const VendorStats = ({
  rating,
  deliveryFee,
  deliveryTime,
}: VendorStatsProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-neutral-600">
      {/* Rating */}
      <div className="flex items-center gap-1">
        <RiStarLine className="size-5 text-primary" />
        <span className="font-normal text-sm text-neutral-600 ">{rating}</span>
      </div>

      {/* Delivery Fee */}
      <div className="flex items-center gap-1">
        <RiEBike2Line className="size-5 text-primary" />
        <span className="font-normal text-sm text-neutral-600 ">
          ₦{deliveryFee}
        </span>
      </div>

      {/* Separator-
       <div className="border h-4 border-gray-300 opacity-50"/>
       */}
      {/* Time */}
      <div className="flex items-center gap-1">
        <RiTimeLine className="size-5 text-primary" />
        <span className="font-normal text-sm text-neutral-600 ">
          {deliveryTime}
        </span>
      </div>
    </div>
  );
};

export default VendorStats;
