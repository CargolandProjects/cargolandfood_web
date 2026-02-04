import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { ActiveTab } from "./Sidebar";
import Loader from "../Loader";
import ErrorStateUi from "../ErrorStateUi";
import EmptyStateUi from "../EmptyStateUi";

interface OrdersProps {
  setActiveTab: (tab: ActiveTab) => void;
}

const orders = [];

const Orders = ({ setActiveTab }: OrdersProps) => {
  const isLoading = false;
  const isError = false;
  const isSuccess = true;
  return (
    <div>
      {/* Header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => setActiveTab(null)} className="absolute left-0">
          <RiArrowGoBackLine className="size-5" />
        </button>
        <h2 className="text-lg leading-6">Orders</h2>
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

      {orders.length === 0 && (
        <div className="mt-20.5 ">
          <EmptyStateUi
            message="No Orders yet"
            description="You haven’t added any food to favourite"
            btn
            btnText="Order now"
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
