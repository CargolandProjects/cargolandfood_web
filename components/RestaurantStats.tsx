import {
  RiEBike2Line,
  RiStarLine,
  RiTimeLine,
} from "react-icons/ri";

interface RestaurantStatsProps {
  rating: number;
  deliveryFee: number | string;
  deliveryTime: string;
}

const RestaurantStats = ({
  rating,
  deliveryFee,
  deliveryTime,
}: RestaurantStatsProps) => {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      {/* Rating */}
      <div className="flex items-center gap-1">
        <RiStarLine className="size-5 text-primary" />
        <span className="font-semibold text-gray-900">{rating}</span>
      </div>
      
      {/* Separator */}
      <div className="w-1 h-4 bg-gray-300 opacity-50"></div>
      
      {/* Delivery Fee */}
      <div className="flex items-center gap-1">
        <RiEBike2Line className="size-5 text-primary" />
        <span className="text-sm font-medium text-gray-900">
          {typeof deliveryFee === "number" && deliveryFee !== 0 
            ? `₦${deliveryFee}` 
            : "Free"}
        </span>
      </div>
      
      {/* Separator */}
      <div className="w-1 h-4 bg-gray-300 opacity-50"></div>
      
      {/* Time */}
      <div className="flex items-center gap-1">
        <RiTimeLine className="size-5 text-primary" />
        <span className="text-sm text-gray-900">{deliveryTime}</span>
      </div>
    </div>
  );
};

export default RestaurantStats;
