import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { ActiveTab } from "./Sidebar";
import { riceDish, shawarma } from "@/assets/images";
import VendorCard from "../VendorCard";
import Loader from "../Loader";
import ErrorStateUi from "../ErrorStateUi";
import EmptyStateUi from "../EmptyStateUi";
import { useFavourites } from "@/lib/hooks/queries/useFavourites";
import { useSession } from "@/lib/hooks/useSession";

interface FavouritesProps {
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

const Favourites = ({ setActiveTab }: FavouritesProps) => {
  const { user } = useSession();
  // console.log("Session Datassss", user.id)
  const {
    data: favouriteVendors,
    isLoading,
    isError,
    isSuccess,
  } = useFavourites(user?.id || "");

  // const isLoading = false;
  // const isError = false;
  // const isSuccess = true;

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
          <ErrorStateUi message="Error Fetching favourites " />
        </div>
      )}

      {isSuccess &&favouriteVendors.length === 0 && (
        <div className="mt-20.5 ">
          <EmptyStateUi
            message="No favourite yet"
            description="You haven’t added any food to favourite"
          />
        </div>
      )}

      {isSuccess && favouriteVendors.length > 0 && (
        <div className="mt-4 space-y-4">
          {favouriteVendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              vendorId={vendor.vendorId}
              asFavouriteCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
