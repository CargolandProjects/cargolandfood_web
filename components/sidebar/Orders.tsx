import { RiArrowGoBackLine, RiMore2Fill } from "react-icons/ri";
import { ActiveTab } from "./Sidebar";
import Loader from "../Loader";
import ErrorStateUi from "../ErrorStateUi";
import EmptyStateUi from "../EmptyStateUi";
import { useGetOrders } from "@/lib/hooks/queries/useGetOrders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { fallbackImg } from "@/lib/utils";

interface OrdersProps {
  setActiveTab: (tab: ActiveTab) => void;
}

type Tabs = "current" | "previous";

const Orders = ({ setActiveTab }: OrdersProps) => {
  const { data: orders, isLoading, isError, isSuccess } = useGetOrders();
  const [currentTab, setCurrentTab] = useState<Tabs>("current");

  const filteredOrders =
    orders?.filter((order) => {
      if (currentTab === "current")
        return order.items.some(
          (item) => item.addonItem && item.addonItem.length > 0
        );

      return order.status === "NEW";
    }) || [];

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

      {isSuccess && orders.length === 0 && (
        <div className="mt-20.5 ">
          <EmptyStateUi
            message="No Orders yet"
            description="You haven’t added any food to favourite"
            btn
            btnText="Order now"
          />
        </div>
      )}

      {isSuccess && orders.length > 0 && (
        <Tabs
          value={currentTab}
          onValueChange={(v) => setCurrentTab(v as Tabs)}
          className="mt-4 gap-0"
        >
          <TabsList className="w-full h-12.5! bg-[#FEF3EB]">
            <TabsTrigger
              value="current"
              className="text-neutral-500 text-base font-medium leading-6"
            >
              Current
            </TabsTrigger>
            <TabsTrigger
              value="previous"
              className="text-neutral-500 text-base font-medium leading-6"
            >
              Previous
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6 mt-4">
            {filteredOrders.map((order, idx) => {
              const orderSummary = order.items
                .map((item) => {
                  const addonNames = item.addonItem
                    .map((addon) => addon.name)
                    .join(", ");
                  return addonNames
                    ? `${item.menuName} + ${addonNames}`
                    : item.menuName;
                })
                .join(" • ");

              return (
                <div key={idx}>
                  <div className="flex gap-4">
                    {/* Order images */}
                    <div>
                      {/* Menu image */}
                      <div className="size-[68px] rounded-md overflow-hidden">
                        <img
                          src={"/fallback_vendor.webp"}
                          alt="menu item"
                          className="size-full object-cover"
                          onError={(e) =>
                            fallbackImg(e, "/fallback_vendor.webp")
                          }
                        />
                      </div>
                      {/* Addons section */}
                      <div className="mt-1 flex gap-1">
                        <div className="size-8 rounded-md overflow-hidden">
                          <img
                            src={"/fallback_vendor.webp"}
                            alt="menu item"
                            className="size-full object-cover"
                            onError={(e) =>
                              fallbackImg(e, "/fallback_vendor.webp")
                            }
                          />
                        </div>
                        {order.items.length > 0 && (
                          <p className="size-8 text-xs rounded-md font-medium text-neutral-500 leading-4 bg-neutral-100 flex justify-center items-center">
                            +{order.items.length - 1}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order detials */}
                    <div className="flex-1">
                      <h3 className="text-base leading-6 text-alt-black">
                        {order.status}
                      </h3>
                      <div className="mt-1.5">
                        <div className=" grid grid-cols-[87px_1fr] gap-x-3 gap-y-1.5">
                          <p className="text-xs leading-4 text-neutral-600">
                            Delivered on:
                          </p>
                          <p className="text-xs leading-4 font-medium text-neutral-600">
                            14th August
                          </p>
                          <p className="text-xs leading-4 text-neutral-600">
                            Order summary:
                          </p>
                          <p className="text-xs leading-4 font-medium text-neutral-600 line-clamp-1">
                            {orderSummary}
                          </p>
                          <p className="text-xs leading-4 text-neutral-600">
                            Total price paid:
                          </p>
                          <p className="text-xs leading-4 font-medium text-neutral-600">
                            ₦{Number(order.total).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      className="h-10 flex-1 uppercase rounded-button!"
                    >
                      Track Order
                    </Button>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="previous" className="space-y-6 mt-4">
            {filteredOrders.map((order, idx) => {
              const orderSummary = order.items
                .map((item) => {
                  const addonNames = item.addonItem
                    .map((addon) => addon.name)
                    .join(", ");
                  return addonNames
                    ? `${item.menuName} + ${addonNames}`
                    : item.menuName;
                })
                .join(" • ");

              return (
                <div key={idx}>
                  <div className="flex gap-4">
                    {/* Order images */}
                    <div>
                      {/* Menu image */}
                      <div className="size-[68px] rounded-md overflow-hidden">
                        <img
                          src={"/fallback_vendor.webp"}
                          alt="menu item"
                          className="size-full object-cover"
                          onError={(e) =>
                            fallbackImg(e, "/fallback_vendor.webp")
                          }
                        />
                      </div>
                      {/* Addons section */}
                      <div className="mt-1 flex gap-1">
                        <div className="size-8 rounded-md overflow-hidden">
                          <img
                            src={"/fallback_vendor.webp"}
                            alt="menu item"
                            className="size-full object-cover"
                            onError={(e) =>
                              fallbackImg(e, "/fallback_vendor.webp")
                            }
                          />
                        </div>
                        {order.items.length > 0 && (
                          <p className="size-8 text-xs rounded-md font-medium text-neutral-500 leading-4 bg-neutral-100 flex justify-center items-center">
                            +{order.items.length - 1}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order detials */}
                    <div className="flex-1">
                      <h3 className="text-base leading-6 text-alt-black">
                        {order.status}
                      </h3>
                      <div className="mt-1.5">
                        <div className=" grid grid-cols-[87px_1fr] gap-x-3 gap-y-1.5">
                          <p className="text-xs leading-4 text-neutral-600">
                            Delivered on:
                          </p>
                          <p className="text-xs leading-4 font-medium text-neutral-600">
                            14th August
                          </p>
                          <p className="text-xs leading-4 text-neutral-600">
                            Order summary:
                          </p>
                          <p className="text-xs leading-4 font-medium text-neutral-600 line-clamp-1">
                            {orderSummary}
                          </p>
                          <p className="text-xs leading-4 text-neutral-600">
                            Total price paid:
                          </p>
                          <p className="text-xs leading-4 font-medium text-neutral-600">
                            ₦{Number(order.total).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      className="h-10 flex-1 uppercase rounded-button!"
                    >
                      Reorder
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="outline"
                          className="h-10 rounded-button!"
                        >
                          <RiMore2Fill className="size-5 text-neutral-700" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Give ratings</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Orders;
