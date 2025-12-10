import { MenuItem } from "@/lib/services/promotions.service";
import {
  RiEBike2Line,
  RiGiftLine,
  RiHeartFill,
  RiStarLine,
  RiTimeLine,
} from "react-icons/ri";

const MenuItemCard = ({
  menuItem: { title, image, rating, deliveryFee, deliveryTime, discount },
}: {
  menuItem: MenuItem;
}) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[114px] overflow-hidden rounded-md">
        <img
          src={image.src}
          alt={title}
          className="size-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 rounded-full flex justify-center items-center gap-1 py-1 px-2 bg-primary-50 border-[0.5px] border-primary-900">
          <RiGiftLine className="size-3 text-primary" />
          <p className="font-medium text-xs">{discount}% Off</p>
        </div>
      </div>
      <div className="mt-2.5">
        <div className="flex justify-between">
          <p className="">{title}</p>
          <RiHeartFill className="size-6 text-gray-300" />
        </div>
        <div className="mt-1 flex gap-3 md:gap-4">
          <div className="flex justify-center items-center gap-1">
            <RiStarLine className="size-5.5 text-primary" />
            <span className="text-sm text-gray-700">{rating}</span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <RiEBike2Line className="size-5.5 text-primary" />
            <span className="text-sm text-gray-700">
              {!deliveryFee ? "Free" : deliveryFee}
            </span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <RiTimeLine className="size-5.5 text-primary" />
            <span className="text-sm text-gray-700">{deliveryTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
