import { Product } from "@/lib/stores/CartStore";
import React from "react";
import ProductModal from "../ProductModal";
import { RiAddFill } from "react-icons/ri";

interface MarketItemCardProps {
  product: Product;
  handleSelect: (id: string) => void;
  selectedId: string | null;
}

const MarketItemCard = ({
  product,
  handleSelect,
  selectedId,
}: MarketItemCardProps) => {
  const { id, imageUrl, name, price } = product;
  const isSelected = id === selectedId;

  return (
    <div>
      <div
        onClick={() => handleSelect(id!)}
        className="w-full h-[162px] flex flex-col justify-end rounded-2xl cursor-pointer relative"
      >
        <div className="w-[134px] sm:w-[139px] h-21 sm:h-[93px] mx-auto rounded-lg overflow-hidden absolute top-1.25 z-1 right-1/2 transform translate-x-1/2">
          <img src={imageUrl} alt={name} className="size-full object-cover" />
        </div>

        <div className="card-shadow">
          <div className="flex flex-col justify-end px-5.5 trapezium-card h-[111px] pb-3">
            <p>{name}</p>

            <div className="flex justify-between items-end">
              <p className="text-base font-medium">
                ₦{Number(price).toLocaleString()}
              </p>
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

      <ProductModal
        handleSelect={handleSelect}
        isSelected={isSelected}
        product={product}
      />
    </div>
  );
};

export default MarketItemCard;
