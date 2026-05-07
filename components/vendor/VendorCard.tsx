import {
  FavouriteSource,
  useToggleFavourite,
} from "@/lib/hooks/mutations/useToggleFavourite";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
import { useSession } from "@/lib/hooks/useSession";
import { Vendor } from "@/lib/services/vendors.service";
import useAuthFlow from "@/lib/stores/authFlowStore";
import { fallbackImg } from "@/lib/utils";
import { cld } from "@/lib/utils/cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  RiEBike2Line,
  RiGiftLine,
  RiHeartFill,
  RiLock2Fill,
  RiStarLine,
  RiTimeLine,
} from "react-icons/ri";
import { toast } from "sonner";

interface VendorCardProps {
  vendor: Vendor;
  vendorId: string;
  aggregateDiscount?: number;
  source?: FavouriteSource;
  asFavouriteCard?: boolean;
}

const VendorCard = ({
  vendor: {
    businessName,
    ratings,
    profileImg,
    isFavourite,
    preparationTime,
    deliveryFee,
    estimationTimeArrival,
    isOpenNow,
  },
  vendorId,
  aggregateDiscount,
  asFavouriteCard = false,
  source,
}: VendorCardProps) => {
  const { user, isAuthenticated } = useSession();
  const openAuth = useAuthFlow((s) => s.openAuth);
  const { zoneId } = useActiveZone();
  const { mutate: toggleFavourite, isPending } = useToggleFavourite(
    source,
    zoneId ?? ""
  );
  const router = useRouter();

  const estTime = estimationTimeArrival
    ? estimationTimeArrival
    : preparationTime;

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
    if (!isAuthenticated) {
      toast.error("You have to sIgn in to perform this action");
      openAuth();
    }

    if (!user || !vendorId) return;
    const payload = {
      isFavourite: !isFavourite,
      vendorId: vendorId,
      userId: user?.id,
    };

    toggleFavourite(payload);
  };

  return (
    <div onClick={handleClick} className="w-full cursor-pointer">
      <div
        className={`relative w-full bg-neutral-100 ${
          asFavouriteCard ? "h-[114px]" : "h-[114px] xl:h-36 "
        } overflow-hidden rounded-md`}
      >
        <Image
          src={cld(profileImg, "VCard") || "/fallback_vendor.webp"}
          alt={businessName}
          className="size-full object-cover"
          fill
          onError={(e) => fallbackImg(e, "/fallback_vendor.webp")}
        />
        {!asFavouriteCard && aggregateDiscount && (
          <div className="absolute top-3 left-3 rounded-full flex justify-center items-center gap-1 py-1 px-2 bg-primary-50 border-[0.5px] border-primary-900">
            <RiGiftLine className="size-3 text-primary" />
            <p className="font-medium text-xs">{aggregateDiscount}% Off</p>
          </div>
        )}

        {!asFavouriteCard && !isOpenNow && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative flex flex-col justify-center items-center">
              <div className="size-6 rounded-full bg-white flex justify-center items-center">
                <RiLock2Fill className="size-3.5 text-primary" />
              </div>
              <h3 className="text-white text-xs font-bold leading-5">Closed</h3>
            </div>
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
              {ratings?.toFixed(1)}
            </span>
          </div>
          <div className="flex justify-center items-center gap-1">
            <RiEBike2Line className="size-5.5 text-primary" />
            <span className="leading-5 text-neutral-600">
              {deliveryFee ?? "0"}
            </span>
          </div>
          {estTime && (
            <div className="flex justify-center items-center gap-1">
              <RiTimeLine className="size-5.5 text-primary" />
              <span className="leading-5 text-neutral-600">{estTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
