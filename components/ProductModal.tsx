"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Menu } from "@/lib/services/vendors.service";
import { useAddToCart } from "@/lib/hooks/mutations/useCart";

interface ProductModalProps {
  menu: Menu;
  isSelected: boolean;
  handleSelect: (id: string) => void;
}

const ProductModal = ({
  menu,
  isSelected,
  handleSelect,
}: ProductModalProps) => {
  const { description, id, uploadImageUrl, name, price } = menu;

  const params = useParams();
  const vendorId = params.id as string;
  const addToCart = useAddToCart(vendorId);

  // State for main item quantity
  const [quantity, setQuantity] = useState(1);

  // State for selected size (radio button)
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // State for addons: { addonId: quantity }
  // If quantity is 0 or undefined, addon is not selected
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>(
    {}
  );

  // Handle addon quantity changes
  const handleAddonIncrease = (addonId: string) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [addonId]: (prev[addonId] || 0) + 1,
    }));
  };

  const handleAddonDecrease = (addonId: string) => {
    setSelectedAddons((prev) => {
      const currentQty = prev[addonId] || 0;
      if (currentQty <= 1) {
        // Remove addon if quantity becomes 0
        const newAddons = { ...prev };
        delete newAddons[addonId];
        return newAddons;
      }
      return {
        ...prev,
        [addonId]: currentQty - 1,
      };
    });
  };

  const getAddonQuantity = (addonId: string) => {
    return selectedAddons[addonId] || 0;
  };

  // Handle main quantity changes
  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Calculate total price for display
  const calculateTotal = () => {
    let total = parseFloat(price) * quantity;

    // Add size price if selected
    if (selectedSize) {
      const size = menu.sizes.find((s) => s.id === selectedSize);
      if (size) {
        total += parseFloat(size.price) * quantity;
      }
    }

    // Add addons prices
    Object.entries(selectedAddons).forEach(([addonId, qty]) => {
      const addon = menu.addons.find((a) => a.id === addonId);
      if (addon && qty > 0) {
        total += parseFloat(addon.price) * qty;
      }
    });

    return total;
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Build addons payload (only include addons with quantity > 0)
    const addonsPayload = Object.entries(selectedAddons)
      .filter(([_, qty]) => qty > 0)
      .map(([addonId, qty]) => {
        const addon = menu.addons.find((a) => a.id === addonId);
        return {
          menuAddonId: addonId,
          name: addon!.name,
          price: parseFloat(addon!.price),
          quantity: qty,
        };
      });

    addToCart.mutate(
      {
        menuId: id!,
        menuName: name!,
        unitPrice: price,
        quantity: quantity,
        currency: "NGN",
        addons: addonsPayload.length > 0 ? addonsPayload : undefined,
      },
      {
        onSuccess: () => {
          // Reset state and close modal on success
          setQuantity(1);
          setSelectedAddons({});
          setSelectedSize(null);
          handleSelect(id!); // Close modal
        },
      }
    );
  };

  return (
    <Dialog open={isSelected} onOpenChange={() => handleSelect(id!)}>
      <DialogContent
        showCloseButton={false}
        className="dialog hide-scrollbar max-h-[90vh]! p-0! border-none! outline-none! gap-0"
      >
        <div className="w-full h-[177px] overflow-hidden rounded-t-lg relative">
          <img
            src={uploadImageUrl}
            alt={name}
            className="size-full object-cover"
          />
          <Button
            onClick={() => handleSelect(id!)}
            variant="link"
            className="size-10 rounded-full bg-white absolute right-4.5 top-4.5"
          >
            <X className="text-black size-6" />
          </Button>
        </div>

        <div className="px-4 sm:px-7">
          <div className="mt-4">
            <DialogTitle className="font-medium text-lg leading-6">
              {name}
            </DialogTitle>
            <p className="text-neutral-600 text-xs leading-4 mt-1">
              {description}
            </p>
            <p className=" leading-5 mt-1.5 flex items-center gap-[3px]">
              from <span className="text-base">₦{price}</span>
            </p>
          </div>

          <Separator className="my-4" />

          {menu.sizes && menu.sizes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg leading-6">{name} Size</h3>
              <RadioGroup
                className="space-y-5 mt-5"
                value={selectedSize || undefined}
                onValueChange={setSelectedSize}
              >
                {menu.sizes.map((size) => (
                  <div key={size.id} className="flex justify-between">
                    <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                      <p>{size.name}</p>
                      <p className="text-xs text-neutral-600">
                        + ₦{size.price}
                      </p>
                    </div>

                    <RadioGroupItem value={size.id} id={size.id} />
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <Separator className="my-4" />

          {menu.addons && menu.addons.length > 0 && (
            <div className="mt-4 mb-4">
              <h3 className="text-lg leading-6">Extras</h3>
              <div className="space-y-5 mt-5">
                {menu.addons.map((addon) => {
                  const addonQty = getAddonQuantity(addon.id);
                  return (
                    <div key={addon.id} className="flex justify-between">
                      <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                        <p>{addon.name}</p>
                        <p className="text-xs text-neutral-600">
                          + ₦{addon.price}
                        </p>
                      </div>

                      <div className="flex gap-2.5 items-center">
                        <button
                          type="button"
                          onClick={() => handleAddonDecrease(addon.id)}
                          disabled={addonQty === 0}
                          className="size-5 rounded-full bg-gray-200 flex justify-center items-center disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <RiSubtractFill className="size-4" />
                        </button>
                        <span className="text-center">
                          {addonQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddonIncrease(addon.id)}
                          className="size-5 rounded-full bg-gray-200 flex justify-center items-center"
                        >
                          <RiAddFill className="size-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 sm:mt-20 flex pb-4.5 gap-4 sm:gap-6 items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-3.5">
            <Button
              type="button"
              onClick={handleQuantityDecrease}
              disabled={quantity <= 1}
              className="size-10.5 rounded-button bg-primary-300 hover:bg-primary-300 cursor-pointer flex justify-center items-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RiSubtractFill className="size-4 text-primary" />
            </Button>
            <span className="text-neutral-600 font-medium text-xl">
              {quantity}
            </span>
            <Button
              type="button"
              onClick={handleQuantityIncrease}
              className="size-10.5 rounded-button bg-primary-300 hover:bg-primary-300 cursor-pointer flex justify-center items-center"
            >
              <RiAddFill className="size-4 text-primary" />
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={addToCart.isPending}
            className="uppercase py-3.5 px-5.5 h-10.5 sm:h-12 text-sm font-bold max-w-[184px] whitespace-normal disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addToCart.isPending
              ? "Adding..."
              : `Order Item - ₦${calculateTotal().toLocaleString()}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
