import plusIcon from "@/assets/svgs/plusIcon.svg";
import { RiAddFill, RiGiftLine, RiSubtractFill } from "react-icons/ri";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";

interface RestaurantItemCard {
  item: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    discount?: number;
  };
  handleSelect: (id: string) => void;
  selectedId: string | null;
  onOrderItem: () => void;
}

const RestaurantItemCard: React.FC<RestaurantItemCard> = ({
  item: { description, id, image, name, price, discount },
  handleSelect,
  selectedId,
  onOrderItem,
}) => {
  const isSelected = id === selectedId;

  return (
    <>
      <div
        onClick={() => handleSelect(id)}
        className="
      flex bg-white rounded-2xl overflow-hidden 
      border border-gray-200 shadow-sm 
      h-[138px]
    "
      >
        {/* Product Image - Adjusted for Left-Side Radius Only */}
        <div className="w-[138px] h-full shrink-0 relative">
          {/* Width set to 138px to match height for a square/large image area */}
          <img
            src={image}
            alt={name}
            // ONLY applies border radius to the left corners
            className="w-full h-full object-cover rounded-l-2xl"
          />
          {discount && (
            <div className="absolute top-2 left-2 rounded-full flex justify-center items-center gap-1 py-1 px-2 bg-primary-50 border-[0.5px] border-primary-900">
              <RiGiftLine className="size-3 text-primary" />
              <p className="font-medium text-xs">{discount}% Off</p>
            </div>
          )}
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
              ₦{price.toLocaleString()}
            </span>
            {/* ADDED: Plus Icon Button */}
            <button
              // Match the light orange background, right-side rounding, and padding/size
              className="bg-[#FFEFE8] w-8 h-8 flex items-center justify-center rounded-[8px]"
              onClick={() => console.log("Add product clicked")} // Add your actual click handler here
              aria-label={`Add ${name} to cart`}
            >
              <img src={plusIcon.src} alt="Add to cart" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

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
              <div className="size-10.5 rounded-button bg-primary-300 flex justify-center items-center">
                <RiSubtractFill className="size-4 text-primary" />
              </div>
              <span className="text-gray-500 font-medium text-xl">1</span>
              <div className="size-10.5 rounded-button bg-primary-300 flex justify-center items-center">
                <RiAddFill className="size-4 text-primary" />
              </div>
            </div>
            <Button
              onClick={onOrderItem}
              className="uppercase py-3.5 px-5.5 text-sm font-bold "
            >
              Order Item - ₦600
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default RestaurantItemCard;
