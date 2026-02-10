import React from "react";
import {
  RiArrowGoBackLine,
  RiLoader2Line,
  RiTakeawayFill,
} from "react-icons/ri";
import { ActiveTab } from "./Sidebar";
import { Button } from "../ui/button";
import { useUIStore } from "@/lib/stores/uiStore";
import Loader from "../Loader";
import ErrorStateUi from "../ErrorStateUi";
import EmptyStateUi from "../EmptyStateUi";
import { useCart } from "@/lib/hooks/queries/useCart";
import { useClearCart } from "@/lib/hooks/mutations/useMutateCart";
import { fallbackImg } from "@/lib/utils";

interface SettingsProps {
  setActiveTab: (tab: ActiveTab) => void;
}

interface Cart {
  id: string;
  title: string;
  price: string;
  image: string;
  address: string;
  qty: number;
}

// const cart: Cart[] = [
//   {
//     id: "08503157-05af-4d34-a5e5-fe9bf061dcf0",
//     title: "Pepperoni pizza",
//     price: "9650",
//     image: pizza.src,
//     address: "45 Denkede Street, Shomolu",
//     qty: 2,
//   },
//   {
//     id: "2",
//     title: "Hamburger",
//     price: "9650",
//     image: burger.src,
//     address: "45 Denkede Street, Shomolu",
//     qty: 1,
//   },
//   {
//     id: "3",
//     title: "Shawarma",
//     price: "9650",
//     image: shawarma.src,
//     address: "45 Denkede Street, Shomolu",
//     qty: 3,
//   },
//   {
//     id: "4",
//     title: "Pepperoni pizza",
//     price: "9650",
//     image: pizza.src,
//     address: "45 Denkede Street, Shomolu",
//     qty: 2,
//   },
//   {
//     id: "5",
//     title: "Hamburger",
//     price: "9650",
//     image: burger.src,
//     address: "45 Denkede Street, Shomolu",
//     qty: 1,
//   },
//   {
//     id: "6",
//     title: "Shawarma",
//     price: "9650",
//     image: shawarma.src,
//     address: "45 Denkede Street, Shomolu",
//     qty: 3,
//   },
// ];

const Cart = ({ setActiveTab }: SettingsProps) => {
  const openCheckout = useUIStore((s) => s.openCheckout);
  const { data, isLoading, isError, isSuccess } = useCart();
  const { mutate: deleteCart, isPending } = useClearCart();
  const carts = data?.data || [];
  const address = data?.address;
  console.log("cart data", carts);
  // const cartWithItems = carts?.filter((cart) => cart.items.length > 0) || [];

  const handleDeleteCart = (cartId: string, vendorId: string) => {
    deleteCart({ cartId, vendorId });
  };

  const handleOpenCHeckout = (id: string) => {
    console.log("id", "I was trigered", id);
    if (!id.trim()) return;
    openCheckout({ vendorId: id });
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => setActiveTab(null)} className="absolute left-0">
          <RiArrowGoBackLine className="size-5" />
        </button>
        <h2 className="text-lg leading-6">Cart</h2>
      </div>

      {isLoading && (
        <div className="h-full flex justify-center items-center">
          <Loader size={12} />
        </div>
      )}

      {isError && (
        <div className="h-full flex justify-center items-center">
          <ErrorStateUi message="Error Fetching Cart " />
        </div>
      )}

      {isSuccess && carts.length === 0 && (
        <div className="mt-20.5">
          <EmptyStateUi
            message=" Your cart is empty"
            description="   Explore and add items to the cart to show here"
            btn
            btnText="Add To Cart"
          />
        </div>
      )}

      {isSuccess && carts.length > 0 && (
        <div className="mt-4 space-y-3">
          {carts.map((cart, idx) => {
            // const item = cart.items[0];

            const vendorTotal = cart.carts.reduce((vendorSum, c) => {
              return (
                vendorSum +
                c.items.reduce(
                  (itemSum, item) => itemSum + Number(item.totalPrice),
                  0
                )
              );
            }, 0);

            const itemCount = cart.carts.reduce(
              (sum, c) => sum + c.items.length,
              0
            );

            return (
              <div className="" key={idx}>
                <div
                  key={idx}
                  className="space-y-4 px-3 py-4 rounded-md border border-neutral-300"
                >
                  <div className="flex items-center">
                    <div className="w-15 h-14 rounded-button overflow-hidden">
                      <img
                        src={cart.vendor.profileImg}
                        alt={cart.vendor.businessName}
                        className="size-full object-cover"
                        onError={(e) => fallbackImg(e, "/fallback_vendor.webp")}
                      />
                    </div>

                    <div className="ml-4">
                      <h3 className="text-base leading-6 capitalize">
                        {cart.vendor.businessName}
                      </h3>
                      <div className="flex gap-1.5 items-center mt-1">
                        <p className="text-xs text-neutral-600 ">
                          {itemCount || cart.carts.length} items
                        </p>
                        <div className="h-4 w-px bg-neutral-200" />
                        <p className="text-neutral-600 text-xs font-medium">
                          ₦{vendorTotal?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex gap-2 items-center">
                    <RiTakeawayFill className="size-5 text-neutral-600" />
                    <p className="text-base leading-5 line-clamp-1">
                      {address?.addressLine1 || "No address added"}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button
                      onClick={() =>
                        handleDeleteCart(
                          cart.carts[0].items[0].cartId,
                          cart.vendor.vendorId
                        )
                      }
                      variant="outline"
                      className="submit-btn flex-1 hover:bg--gray-50  border-neutral-300 capitalize"
                    >
                      {isPending ? (
                        <RiLoader2Line className="size-5 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                    <Button
                      onClick={() => handleOpenCHeckout(cart.vendor.vendorId)}
                      className="submit-btn flex-1"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
