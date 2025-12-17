import plusIcon from "@/assets/svgs/plusIcon.svg";
import { RiGiftLine } from "react-icons/ri";
import ProductModal from "../ProductModal";

import type { Product } from "@/lib/stores/useCartStore";

interface RestaurantItemCard {
  product: Product;
  handleSelect: (id: string) => void;
  selectedId: string | null;
}

const RestaurantItemCard: React.FC<RestaurantItemCard> = ({
  product,
  handleSelect,
  selectedId,
}) => {
  const { description, id, imageUrl, name, price } = product
  const isSelected = id === selectedId;

  return (
    <>
      <div
        onClick={() => handleSelect(id)}
        className="
      flex bg-white rounded-2xl overflow-hidden 
      border border-gray-200 shadow-sm 
      h-[138px] relative cursor-pointer
    "
      >
        {/* Product Image - Adjusted for Left-Side Radius Only */}
        <div className="w-[138px] h-full shrink-0 relative">
          {/* Width set to 138px to match height for a square/large image area */}
          <img
            src={imageUrl}
            alt={name || "Product image"}
            className="w-full h-full object-cover rounded-l-2xl"
          />
          
        </div>

        {/* Product Details */}
        <div className="grow p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
              {description}
            </p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-gray-900">
              ₦{Number(price ?? "0").toLocaleString()}
            </span>
            {/* ADDED: Plus Icon Button */}
            <button
              // Match the light orange background, right-side rounding, and padding/size
              className="bg-[#FFEFE8] w-8 h-8 flex items-center justify-center rounded-[8px]"
              onClick={() => handleSelect(id)}
              aria-label={`Add ${name} to cart`}
            >
              <img src={plusIcon.src} alt="Add to cart" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <ProductModal handleSelect={handleSelect} isSelected={isSelected} product={product} />
    </>
  );
};
export default RestaurantItemCard;
