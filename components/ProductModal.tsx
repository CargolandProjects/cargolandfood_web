import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { useCartStore } from "@/lib/stores/CartStore";
import { X } from "lucide-react";
import { Menu } from "@/lib/services/vendors.service";

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
  const { addItem, decrease, items } = useCartStore();

  const current = items.find((i) => i.id === id);
  const handleIncrease = () => {
    addItem(menu);
  };
  const handledecrease = () => {
    decrease(id!);
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

          <div className="mb-4">
            <h3 className="text-lg leading-6">{name} Size</h3>
            <RadioGroup className="space-y-5 mt-5">
              {menu.sizes.map((size) => (
                <div key={size.id} className="flex justify-between">
                  <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                    <p>{size.name}</p>
                    <p className="text-xs text-neutral-600">+ ₦{size.price}</p>
                  </div>

                  <RadioGroupItem value={size.id} id={size.id} />
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator className="my-4" />

          <div className="mt-4 mb-4">
            <h3 className="text-lg leading-6">Extras</h3>
            <div className="space-y-5 mt-5">
              {menu.addons.map((addon) => (
                <div key={addon.id} className="flex justify-between">
                  <div className="flex-1 grid grid-cols-[2fr_1fr] 200 max-w-[180px]">
                    <p>{addon.name}</p>
                    <p className="text-xs text-neutral-600">+ ₦{addon.price}</p>
                  </div>

                  <div className="flex gap-2.5">
                    <button className="size-5 rounded-full bg-gray-200 flex justify-center items-center">
                      <RiSubtractFill className="size-4" />
                    </button>
                    <span>1</span>
                    <button className="size-5 rounded-full bg-gray-200 flex justify-center items-center">
                      <RiAddFill className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
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
          <Button className="uppercase py-3.5 px-5.5 h-10.5 sm:h-12 text-sm font-bold max-w-[184px] whitespace-normal ">
            Order Item - ₦{(600).toLocaleString()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
