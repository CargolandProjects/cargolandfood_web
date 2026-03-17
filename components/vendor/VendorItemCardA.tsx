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

interface VendorItemCardA {
  menu: Menu;
  handleSelect?: (id: string) => void;
  onNavigate?: () => void;
  vendorId: string;
  selectedId?: string | null;
  isSearch?: boolean;
}

const VendorItemCardA = ({
  menu,
  handleSelect,
  onNavigate,
  vendorId,
  selectedId,
  isSearch = false,
}: VendorItemCardA) => {
  const { description, id, uploadImageUrl, name, price, PromotionItem } = menu;
  const isSelected = id === selectedId;
  const { isAuthenticated } = useSession();
  const openAuth = useAuthFlow((s) => s.openAuth);

  // const params = useParams();
  // const vendorId = params.id as string;
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
        className="flex h-[116px] min-w-[235px] sm:h-34.5 rounded-2xl overflow-hidden border border-neutral-300 gap-2 cursor-pointer"
      >
        {/* Product Image - Adjusted for Left-Side Radius Only */}
        <div className="w-30 ml-[3px] my-[3px] shrink-0 rounded-l-xl rounded-r-xs overflow-hidden relative">
          {/* Width set to 138px to match height for a square/large image area */}
          <img
            src={uploadImageUrl || "/fallback_vendor.webp"}
            alt={name || "Product image"}
            className="w-full h-full object-cover rounded-l-2xl bg-neutral-100"
            onError={(e) => fallbackImg(e, "/fallback_vendor.webp")}
          />
          {PromotionItem && PromotionItem?.length > 0 && (
            <div className="absolute top-2 left-2 rounded-full flex justify-center items-center gap-1 py-0.5 px-1 bg-white">
              <RiGiftLine className="size-3 text-primary" />
              <p className="font-medium text-xs text-primary">
                {PromotionItem?.[0]?.promotion.percentageValue}% Off
              </p>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-1 justify-between gap-[13px]">
          <div className="flex flex-col justify-center">
            <h3 className="text-sm sm:text-lg leading-5 sm:leading-6 line-clamp-1">
              {name}
            </h3>
            <p className="text-xs leading-4 text-neutral-600 line-clamp-2 max-w-[70%]">
              {description}
            </p>
            <span className="text-base sm:text-xl font-medium mt-[13px] sm:mt-6">
              ₦{Number(price).toLocaleString()}
            </span>
          </div>

          {/* ADDED: Plus Icon Button */}
          {!isSearch && (
            <button
              // Match the light orange background, right-side rounding, and padding/size
              className="self-end shrink-0 bg-primary-100 size-9 flex items-center justify-center rounded-md disabled:opacity-50 mr-2.5 mb-2.5"
              onClick={handleQuickAdd}
              disabled={isPending}
              aria-label={`Add ${name} to cart`}
            >
              {isPending ? (
                <Loader2 className="size-5 text-primary animate-spin" />
              ) : (
                <RiAddFill className="size-6 text-primary" />
              )}
            </button>
          )}
        </div>
      </div>

      <ProductModal
        vendorId={vendorId}
        handleSelect={handleSelect}
        isSelected={isSelected}
        menu={menu}
      />
    </>
  );
};
export default VendorItemCardA;
