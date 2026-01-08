import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { useCartStore, type Product } from "@/lib/stores/CartStore";
import { X } from "lucide-react";

interface ProductModalProps {
  product: Product;
  isSelected: boolean;
  handleSelect: (id: string) => void;
}

const ProductModal = ({
  product,
  isSelected,
  handleSelect,
}: ProductModalProps) => {
  const { description, id, imageUrl, name, price } = product;
  const { addItem, decrease, items } = useCartStore();

  const current = items.find((i) => i.id === id);
  const handleIncrease = () => {
    addItem(product);
  };
  const handledecrease = () => {
    decrease(id!);
  };

  return (
    <Dialog open={isSelected} onOpenChange={() => handleSelect(id!)}>
      <DialogContent
        showCloseButton={false}
        className="max-w-100! max-md:w-[95vw] max-h-[90vh] overflow-auto hide-scrollbar p-0 border-none! outline-none! gap-0"
      >
        <div className="w-full h-[177px] overflow-hidden rounded-t-lg relative">
          <img src={imageUrl} alt={name} className="size-full object-cover" />
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

          <div className="mb-4">
            <h3 className="text-lg leading-6">Pizza Size</h3>
            <RadioGroup className="space-y-5 mt-5">
              <div className="flex justify-between">
                <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                  <p>Pepperoni Pizza</p>
                  <p className="text-xs text-neutral-600">+ ₦7,600</p>
                </div>

                <RadioGroupItem value="pepperoni_pizza" id="v1" />
              </div>
              <div className="flex justify-between">
                <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                  <p>Pepperoni Large</p>
                  <p className="text-xs text-neutral-600">+ ₦7,600</p>
                </div>

                <RadioGroupItem value="pepperoni_large" id="v2" />
              </div>
              <div className="flex justify-between">
                <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                  <p>Pepperoni XL</p>
                  <p className="text-xs text-neutral-600">+ ₦7,600</p>
                </div>

                <RadioGroupItem value="pepperoni_xl" id="v3" />
              </div>
            </RadioGroup>
          </div>

          <Separator className="my-4" />

          <div className="mt-4 mb-4">
            <h3 className="text-lg leading-6">Extras</h3>
            <div className="space-y-5 mt-5">
              <div className="flex justify-between">
                <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                  <p>Pepperoni Pizza</p>
                  <p className="text-xs text-neutral-600">+ ₦3,800</p>
                </div>

                <div className="flex gap-2.5">
                  <div className="size-5 rounded-full bg-gray-200 flex justify-center items-center">
                    <RiSubtractFill className="size-4" />
                  </div>
                  <span>1</span>
                  <div className="size-5 rounded-full bg-gray-200 flex justify-center items-center">
                    <RiAddFill className="size-4" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                  <p>Pepperoni Large</p>
                  <p className="text-xs text-neutral-600">+ ₦3,200</p>
                </div>

                <div className="flex gap-2.5">
                  {/* <div className="size-5 rounded-full bg-gray-200 flex justify-center items-center">
                      <RiSubtractFill className="size-4" />
                    </div>
                    <span>1</span> */}
                  <div className="size-5 rounded-full bg-gray-200 flex justify-center items-center">
                    <RiAddFill className="size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-20 flex pb-4.5 gap-4 sm:gap-6 items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-3.5">
            <Button
              onClick={handledecrease}
              className="size-10.5 rounded-button bg-primary-300 hover:bg-primary-300 cursor-pointer flex justify-center items-center"
            >
              <RiSubtractFill className="size-4 text-primary" />
            </Button>
            <span className="text-neutral-600 font-medium text-xl">
              {current?.quantity || 0}
            </span>
            <Button
              onClick={handleIncrease}
              className="size-10.5 rounded-button bg-primary-300 hover:bg-primary-300 cursor-pointer flex justify-center items-center"
            >
              <RiAddFill className="size-4 text-primary" />
            </Button>
          </div>
          <Button className="uppercase py-3.5 px-5.5 h-10.5 sm:h-12 text-sm font-bold max-w-[205px] whitespace-normal ">
            Order Item - ₦{(600).toLocaleString()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
