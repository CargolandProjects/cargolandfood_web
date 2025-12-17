import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { ProductItem } from "./Restaurants/RestaurantItemCard";

interface ProductModalProps {
  product: ProductItem;
  isSelected: boolean;
  handleSelect: (id: string) => void;
}

const ProductModal = ({
  product: { description, id, image, name, price },
  isSelected,
  handleSelect,
}: ProductModalProps) => {
  return (
    <Dialog open={isSelected} onOpenChange={() => handleSelect(id)}>
      <DialogContent
        showCloseButton={false}
        className="max-w-100! max-h-[90vh] overflow-auto hide-scrollbar p-0 border-none! outline-none! gap-0"
      >
        <div className="w-full h-[177px] overflow-hidden rounded-t-lg">
          <img src={image} alt={name} className="size-full object-cover" />
        </div>
        <div>
          <div className="mt-4 px-7">
            <DialogTitle className="font-medium text-lg leading-6">
              {name}
            </DialogTitle>
            <p className="text-gray-500 text-xs leading-4 mt-1">
              {description}
            </p>
            <p className=" leading-4 mt-1.5">
              from <span className="text-base ">₦{price}</span>
            </p>
          </div>

          <Separator className="my-4" />

          <div className=" px-7 mb-4">
            <h3 className="text-lg leading-6">Pizza Size</h3>
            <RadioGroup className="space-y-5 mt-5">
              <div className="flex justify-between">
                <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                  <p>Pepperoni Pizza</p>
                  <p className="text-xs text-gray-500">+ ₦7,600</p>
                </div>

                <RadioGroupItem value="pepperoni_pizza" id="v1" />
              </div>
              <div className="flex justify-between">
                <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                  <p>Pepperoni Large</p>
                  <p className="text-xs text-gray-500">+ ₦7,600</p>
                </div>

                <RadioGroupItem value="pepperoni_large" id="v2" />
              </div>
              <div className="flex justify-between">
                <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                  <p>Pepperoni XL</p>
                  <p className="text-xs text-gray-500">+ ₦7,600</p>
                </div>

                <RadioGroupItem value="pepperoni_xl" id="v3" />
              </div>
            </RadioGroup>
          </div>

          <Separator className="my-4" />

          <div className="mt-4 px-7 mb-4">
            <h3 className="text-lg leading-6">Extras</h3>
            <div className="space-y-5 mt-5">
              <div className="flex justify-between">
                <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                  <p>Pepperoni Pizza</p>
                  <p className="text-xs text-gray-500">+ ₦3,800</p>
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
                  <p className="text-xs text-gray-500">+ ₦3,200</p>
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

        <div className="mt-20 flex px-7 pb-4.5 gap-6 items-center justify-center">
          <div className="flex items-center gap-3.5">
            <Button className="size-10.5 rounded-button bg-primary-300 flex justify-center items-center">
              <RiSubtractFill className="size-4 text-primary" />
            </Button>
            <span className="text-gray-500 font-medium text-xl">1</span>
            <Button className="size-10.5 rounded-button bg-primary-300 flex justify-center items-center">
              <RiAddFill className="size-4 text-primary" />
            </Button>
          </div>
          <Button className="uppercase py-3.5 px-5.5 h-12 text-sm font-bold ">
            Order Item - ₦600
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
