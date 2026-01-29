import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { ActiveTab } from "./Sidebar";
import { riceDish, shawarma } from "@/assets/images";
import VendorCard from "../VendorCard";
import { emptyBox } from "@/assets/svgs";
import Loader from "../Loader";
import ErrorStateUi from "../ErrorStateUi";

interface FavouriteProps {
  setActiveTab: (tab: ActiveTab) => void;
}

interface FavouriteVendor {
  id: string;
  businessName: string;
  ratings: number;
  profileImg: string;
}

const favouriteVendor: FavouriteVendor[] = [
  {
    id: "1",
    businessName: "Shawarma Plus+",
    ratings: 4.7,
    profileImg: shawarma.src,
  },
  {
    id: "2",
    businessName: "Mavise Foods",
    ratings: 4.7,
    profileImg: riceDish.src,
  },
  {
    id: "3",
    businessName: "Shawarma Plus+",
    ratings: 4.7,
    profileImg: shawarma.src,
  },
  {
    id: "3",
    businessName: "Shawarma Plus+",
    ratings: 4.7,
    profileImg: shawarma.src,
  },
];

const Favourite = ({ setActiveTab }: FavouriteProps) => {
  const isLoading = false;
  const isError = false;
  const isSuccess = true;

  return (
    <div className="h-full">
      {/* Header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => setActiveTab(null)} className="absolute left-0">
          <RiArrowGoBackLine className="size-5" />
        </button>
        <h2 className="text-lg leading-6">Favourite</h2>
      </div>

      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <Loader size={12} />
        </div>
      )}

      {isError && (
        <div className="h-full flex justify-center items-center">
          <ErrorStateUi message="Error Fetching Orders " />
        </div>
      )}

      {favouriteVendor.length === 0 && (
        <div className="mt-20.5 flex flex-col justify-center items-center">
          <div className="size-50">
            <img
              src={emptyBox.src}
              alt="empty_cart_illustration"
              className="size-full object-cover"
            />
          </div>

          <div className="text-center mt-6">
            <h3 className="text-lg leading-6 text-neutral-500">
              No favourite yet
            </h3>
            <p className="mt-3 max-w-[300px] text-base font-normal leading-5 text-neutral-500">
              You haven’t added any food to favourite
            </p>
          </div>
        </div>
      )}

      {isSuccess && favouriteVendor.length > 0 && (
        <div className="mt-4 space-y-4">
          {favouriteVendor.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              isFavourite
              asFavouriteCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
