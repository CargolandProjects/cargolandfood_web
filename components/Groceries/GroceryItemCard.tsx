import { Product } from "@/lib/stores/CartStore";
import React from "react";
import ProductModal from "../ProductModal";
import { RiAddFill } from "react-icons/ri";

interface GroceryItemCard {
  product: Product;
  handleSelect: (id: string) => void;
  selectedId: string | null;
}

const GroceryItemCard = ({
  product,
  handleSelect,
  selectedId,
}: GroceryItemCard) => {
  const { description, id, imageUrl, name, price } = product;
  const isSelected = id === selectedId;

  return (
    <div>
      <div
        onClick={() => handleSelect(id!)}
        className="max-w-[277px w-full h-[167px] flex flex-col justify-end rounded-2xl cursor-pointer relative"
      >
        <div className="w-[139px] h-[93px] mx-auto rounded-lg overflow-hidden absolute top-0 z-30 right-1/2 transform translate-x-1/2">
          <img src={imageUrl} alt={name} className="size-full object-cover" />
        </div>

        <div className="card-shadow">
          <div className="space-y-0.75 flex flex-col justify-end px-5.5 trapezium-card h-[111px] pb-3">
            <div className="pt-[182.5px]">
              <p className="">{name}</p>

              <div className="flex justify-between items-center mt-1.5">
                <p className="text-base font-medium">₦{price}</p>
                <button
                  aria-label={`Add ${name} to cart`}
                  className="flex justify-center items-center size-7.5 rounded-full bg-primary-100"
                >
                  <RiAddFill className="size-6 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        handleSelect={handleSelect}
        isSelected={isSelected}
        product={product}
      />
    </div>
  );
};

export default GroceryItemCard;
