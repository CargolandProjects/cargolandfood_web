import React from "react";
import { RiArrowGoBackLine, RiArrowLeftLine } from "react-icons/ri";
import { ActiveTab } from "./Sidebar";
import VendorCard from "../vendor/VendorCard";
import Loader from "../Loader";
import ErrorStateUi from "../ErrorStateUi";
import EmptyStateUi from "../EmptyStateUi";
import { useFavourites } from "@/lib/hooks/queries/useFavourites";
import { useSession } from "@/lib/hooks/useSession";
import UnauthenticatedUi from "../UnauthenticatedUi";

interface FavouritesProps {
  setActiveTab: (tab: ActiveTab) => void;
  isAuthenticated: boolean;
}

const Favourites = ({ setActiveTab, isAuthenticated }: FavouritesProps) => {
  const { user } = useSession();
  const {
    data: favouriteVendors,
    isLoading,
    isError,
    isSuccess,
  } = useFavourites(user?.id || "", isAuthenticated);

  return (
    <div className="h-full">
      {/* Header */}
      <div className="relative flex items-center justify-center mb-2">
        <button
          onClick={() => setActiveTab(null)}
          className="absolute left-0 max-sm:hidden"
        >
          <RiArrowGoBackLine className="size-5" />
        </button>
        <button
          onClick={() => setActiveTab(null)}
          className="absolute left-2.5 sm:hidden"
        >
          <RiArrowLeftLine className="size-5" />
        </button>
        <h2 className="text-lg leading-6">Favourite</h2>
      </div>

      <div className="h-full overflow-y-auto hide-scrollbar">
        {!isAuthenticated && (
          <UnauthenticatedUi description="You need to sign in before performing any action on Cargoland Food." />
        )}

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

        {isSuccess && favouriteVendors.length === 0 && (
          <div className="h-full flex justify-center items-center">
            <EmptyStateUi
              message="No favourite yet"
              description="You haven’t added any food to favourite"
            />
          </div>
        )}

        {isSuccess && favouriteVendors.length > 0 && (
          <div className="mt-2 pb-6 space-y-4">
            {favouriteVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                vendorId={vendor.id}
                source="general"
                asFavouriteCard
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
