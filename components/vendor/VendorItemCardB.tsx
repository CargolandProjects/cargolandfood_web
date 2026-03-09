"use client";

import { Menu } from "@/lib/services/vendors.service";
import ProductModal from "../ProductModal";
import { useAddToCart } from "@/lib/hooks/mutations/useMutateCart";
import { RiAddFill, RiGiftLine } from "react-icons/ri";
import { fallbackImg } from "@/lib/utils";
import useAuthFlow from "@/lib/stores/authFlowStore";
import { useSession } from "@/lib/hooks/useSession";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface VendorItemCard {
  menu: Menu;
  handleSelect?: (id: string) => void;
  onNavigate?: () => void;
  vendorId: string;
  selectedId?: string | null;
}

const VendorItemCardB = ({
  menu,
  handleSelect,
  onNavigate,
  vendorId,
  selectedId,
}: VendorItemCard) => {
  const { id, uploadImageUrl, name, price, PromotionItem, description } = menu;
  const isSelected = id === selectedId;
  const { isAuthenticated } = useSession();
  const openAuth = useAuthFlow((s) => s.openAuth);

  const { mutate, isPending } = useAddToCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please signin to add item to cart");
      openAuth();
      return;
    }

    mutate({
      item: {
        menuId: id!,
        menuName: name!,
        unitPrice: price!,
        description,
        action: "SET",
        quantity: 1,
        menuImg: uploadImageUrl,
        currency: "NGN",
        // No addons for quick add
      },
      vendorId,
    });
  };

  const handleClick = () => {
    if (onNavigate) onNavigate();
    if (handleSelect) handleSelect(id);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="w-full max-w-[280px] h-[162px] flex flex-col justify-end rounded-2xl cursor-pointer relative"
      >
        <div className="w-[134px] sm:w-[139px] h-21 sm:h-[93px] mx-auto rounded-lg overflow-hidden absolute top-px z-1 right-1/2 transform translate-x-1/2">
          <img
            src={uploadImageUrl}
            alt={name}
            className="size-full object-cover"
            onError={(e) => fallbackImg(e, "/fallback_vendor.webp")}
          />

          {PromotionItem && PromotionItem?.length > 0 && (
            <div className="absolute top-1.5 inset-x-0 flex justify-center">
              <div className="rounded-full flex w-fit justify-center items-center gap-1 py-0.5 px-1 bg-white">
                <RiGiftLine className="size-3 text-primary" />
                <p className="font-medium text-xs text-primary">
                  {PromotionItem?.[0]?.promotion.percentageValue}% Off
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="card-shadow">
          <div className="flex flex-col justify-end px-5.5 trapezium-card h-[111px] pb-3 bg-amber-200">
            <p className="line-clamp-1">{name}</p>

            <div className="flex justify-between items-end">
              <p className="text-base font-medium">
                ₦{Number(price).toLocaleString()}
              </p>
              <button
                onClick={handleQuickAdd}
                disabled={isPending}
                aria-label={`Add ${name} to cart`}
                className="flex justify-center items-center size-7.5 rounded-full bg-primary-100"
              >
                {isPending ? (
                  <Loader2 className="size-5 text-primary animate-spin" />
                ) : (
                  <RiAddFill className="size-6 text-primary" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        handleSelect={handleSelect}
        isSelected={isSelected}
        menu={menu}
      />
    </>
  );
};
export default VendorItemCardB;
