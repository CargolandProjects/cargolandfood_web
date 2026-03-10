import { useToggleFavourite } from "@/lib/hooks/mutations/useToggleFavourite";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
import { useSession } from "@/lib/hooks/useSession";
import { Vendor } from "@/lib/services/vendors.service";
import { fallbackImg } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  RiEBike2Line,
  RiGiftLine,
  RiHeartFill,
  RiStarLine,
  RiTimeLine,
} from "react-icons/ri";

interface VendorCardProps {
  vendor: Vendor;
  vendorId: string;
  source?: "homepage" | "vendorpage" | "general";
  asFavouriteCard?: boolean;
}

const VendorCard = ({
  vendor: { businessName, ratings, profileImg, isFavourite, preparationTime },
  vendorId,
  asFavouriteCard = false,
  source,
}: VendorCardProps) => {
  const { user } = useSession();
  const { zoneId } = useActiveZone();
  const { mutate: toggleFavourite, isPending } = useToggleFavourite(
    source,
    zoneId ?? ""
  );
  const router = useRouter();

  const handleClick = () => {
    // There is id from the getAllVendors endpoint as "id" and from getFavourites as vendorId (both referencing the actual vendorId)
    // This card is being used in both hence
    router.push(`/vendor/${vendorId}`);
  };

  const handleToggleFavourite = (
    isFavourite: boolean,
    vendorId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!user || !vendorId) return;
    const payload = {
      isFavourite: !isFavourite,
      vendorId: vendorId,
      userId: user?.id,
    };

    toggleFavourite(payload);
  };

  const deliveryFee = 20;

  return (
    <div onClick={handleClick} className="w-full cursor-pointer">
      <div
        className={`relative w-full bg-neutral-100 ${
          asFavouriteCard ? "h-[114px]" : "h-[114px] xl:h-36 "
        } overflow-hidden rounded-md`}
      >
        <img
          src={profileImg || "/fallback_vendor.webp"}
          alt={businessName}
          className="size-full object-cover"
          loading="lazy"
          onError={(e) => fallbackImg(e, "/fallback_vendor.webp")}
        />
        {!asFavouriteCard && (
          <div className="absolute top-3 left-3 rounded-full flex justify-center items-center gap-1 py-1 px-2 bg-primary-50 border-[0.5px] border-primary-900">
            <RiGiftLine className="size-3 text-primary" />
            <p className="font-medium text-xs">{20}% Off</p>
          </div>
        )}
      </div>
      <div className="mt-2.5">
        <div className="flex justify-between">
          <p className="text-base leading-5">{businessName}</p>
          <button
            disabled={isPending}
            onClick={(e: React.MouseEvent) =>
              handleToggleFavourite(isFavourite, vendorId, e)
            }
          >
            <RiHeartFill
              className={`${
                isFavourite ? "text-primary" : "text-gray-300"
              } size-6 `}
            />
          </button>
        </div>
        <div className="mt-1 flex gap-3 md:gap-4">
          <div className="flex justify-center items-center gap-1">
            <RiStarLine className="size-5.5 text-primary" />
            <span className="leading-5 text-neutral-600">
              {ratings?.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <RiEBike2Line className="size-5.5 text-primary" />
            <span className="leading-5 text-neutral-600">
              {!deliveryFee ? "Free" : deliveryFee}
            </span>
          </div>
          {preparationTime && (
            <div className="flex justify-center items-center gap-1">
              <RiTimeLine className="size-5.5 text-primary" />
              <span className="leading-5 text-neutral-600">
                {preparationTime}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
