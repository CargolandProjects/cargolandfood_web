import { shawarma } from "@/assets/images";
import { Vendor } from "@/lib/services/vendors.service";
import { useRouter } from "next/navigation";
import {
  RiEBike2Line,
  RiGiftLine,
  RiHeartFill,
  RiStarLine,
  RiTimeLine,
} from "react-icons/ri";

const VendorCard = ({
  vendor: { id, businessName, ratings, profileImg },
  routes = "Restaurant",
}: {
  vendor: Vendor;
  routes?: string;
}) => {
  const router = useRouter();
  const route =
    routes === "Restaurant"
      ? "restaurants"
      : routes === "Grocery"
      ? "groceries"
      : "markets";

  const handleClick = () => {
    router.push(`/${route}/${id}`);
  };
  const deliveryFee = 20;
  const deliveryTime = 10;

  return (
    <div onClick={handleClick} className="w-full cursor-pointer">
      <div className="relative w-full h-[114px] xl:h-[144px] overflow-hidden rounded-md">
        <img
          src={shawarma.src}
          alt={businessName}
          className="size-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 rounded-full flex justify-center items-center gap-1 py-1 px-2 bg-primary-50 border-[0.5px] border-primary-900">
          <RiGiftLine className="size-3 text-primary" />
          <p className="font-medium text-xs">{20}% Off</p>
        </div>
      </div>
      <div className="mt-2.5">
        <div className="flex justify-between">
          <p className="text-base leading-5">{businessName}</p>
          <RiHeartFill className="size-6 text-gray-300" />
        </div>
        <div className="mt-1 flex gap-3 md:gap-4">
          <div className="flex justify-center items-center gap-1">
            <RiStarLine className="size-5.5 text-primary" />
            <span className="leading-5 text-neutral-600">{ratings}</span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <RiEBike2Line className="size-5.5 text-primary" />
            <span className="leading-5 text-neutral-600">
              {!deliveryFee ? "Free" : deliveryFee}
            </span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <RiTimeLine className="size-5.5 text-primary" />
            <span className="leading-5 text-neutral-600">{deliveryTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
