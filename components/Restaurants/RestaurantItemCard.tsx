import ProductModal from "../ProductModal";

import type { Product } from "@/lib/stores/CartStore";
import { RiAddFill } from "react-icons/ri";

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
        onClick={() => handleSelect(id!)}
        className="
      flex rounded-2xl overflow-hidden 
      border border-neutral-300 gap-2
      relative cursor-pointer
    "
      >
        {/* Product Image - Adjusted for Left-Side Radius Only */}
        <div className="w-30 h-32.5 shrink-0 rounded-l-xl rounded-r-xs overflow-hidden relative">
          {/* Width set to 138px to match height for a square/large image area */}
          <img
            src={imageUrl}
            alt={name || "Product image"}
            className="w-full h-full object-cover rounded-l-2xl"
          />
          
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center flex-1">
          <div>
            <h3 className="text-lg font-medium leading-6 line-clamp-1">
              {name}
            </h3>
            <p className="text-xs leading-4 mt-1 text-neutral-600 line-clamp-2 max-w-[145px]">
              {description}
            </p>
          </div>

          <div className="flex justify-between items- mt-6 ">
            <span className="text-xl font-medium">
              ₦{Number(price ?? "0").toLocaleString()}
            </span>
            {/* ADDED: Plus Icon Button */}
            <button
              // Match the light orange background, right-side rounding, and padding/size
              className="absolute right-2.5 bottom-2.5 bg-primary-100 size-9 flex items-center justify-center rounded-md"
              onClick={() => handleSelect(id!)}
              aria-label={`Add ${name} to cart`}
            >
              <RiAddFill className="size-6 text-primary" />
            </button>
          </div>
        </div>
      </div>

      <ProductModal handleSelect={handleSelect} isSelected={isSelected} product={product} />
    </>
  );
};
export default RestaurantItemCard;
