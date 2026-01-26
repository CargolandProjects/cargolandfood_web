"use client";

import { useParams } from "next/navigation";
import { Menu } from "@/lib/services/vendors.service";
import ProductModal from "../ProductModal";
import { useAddToCart } from "@/lib/hooks/mutations/useCart";
import { RiAddFill } from "react-icons/ri";

interface RestaurantItemCard {
  menu: Menu;
  handleSelect: (id: string) => void;
  selectedId: string | null;
}

const RestaurantItemCard = ({
  menu,
  handleSelect,
  selectedId,
}: RestaurantItemCard) => {
  const { description, id, uploadImageUrl, name, price } = menu;
  const isSelected = id === selectedId;
  
  const params = useParams();
  const vendorId = params.id as string;
  const addToCart = useAddToCart(vendorId);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addToCart.mutate({
      menuId: id!,
      menuName: name!,
      unitPrice: price!,
      quantity: 1,
      currency: "NGN",
      // No addons for quick add
    });
  };

  return (
    <>
      <div
        onClick={() => handleSelect(id!)}
        className="flex h-[116px] min-w-[310px] sm:h-34.5 rounded-2xl overflow-hidden border border-neutral-300 gap-2 cursor-pointer"
      >
        {/* Product Image - Adjusted for Left-Side Radius Only */}
        <div className="w-30 ml-[3px] my-[3px] shrink-0 rounded-l-xl rounded-r-xs overflow-hidden relative">
          {/* Width set to 138px to match height for a square/large image area */}
          <img
            src={uploadImageUrl}
            alt={name || "Product image"}
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center flex-1">
          <div>
            <h3 className="text-sm sm:text-lg leading-5 sm:leading-6 line-clamp-1">
              {name}
            </h3>
            <p className="text-xs leading-4 sm:mt-1 text-neutral-600 line-clamp-2 max-w-[145px]">
              {description}
            </p>
          </div>

          <div className="flex justify-between items-center sm:mt-4 sm:mr-2.5">
            <span className="text-base sm:text-xl font-medium">
              ₦{Number(price).toLocaleString()}
            </span>
            {/* ADDED: Plus Icon Button */}
            <button
              // Match the light orange background, right-side rounding, and padding/size
              className="bg-primary-100 size-9 flex items-center justify-center rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleQuickAdd}
              disabled={addToCart.isPending}
              aria-label={`Add ${name} to cart`}
            >
              {addToCart.isPending ? (
                <span className="text-xs text-primary">...</span>
              ) : (
                <RiAddFill className="size-6 text-primary" />
              )}
            </button>
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
export default RestaurantItemCard;
