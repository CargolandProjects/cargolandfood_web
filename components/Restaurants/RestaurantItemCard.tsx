
import plusIcon from "@/assets/svgs/plusIcon.svg";
import { RiGiftLine } from "react-icons/ri";

interface RestaurantItemCard {
  item: {
    id: number;
    name: string;
    image: string
    description: string;
    price: number;
    discount?: number;
  };
}

const RestaurantItemCard: React.FC<RestaurantItemCard> = ({ item }) => (
  <div
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
        src={item.image}
        alt={item.name}
        // ONLY applies border radius to the left corners
        className="w-full h-full object-cover rounded-l-2xl"
      />
      {item.discount && (
        <div className="absolute top-2 left-2 rounded-full flex justify-center items-center gap-1 py-1 px-2 bg-primary-50 border-[0.5px] border-primary-900">
          <RiGiftLine className="size-3 text-primary" />
          <p className="font-medium text-xs">{item.discount}% Off</p>
        </div>
      )}
    </div>

    {/* Product Details */}
    <div className="grow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {item.description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-bold text-gray-900">
          ₦{item.price.toLocaleString()}
        </span>
        {/* ADDED: Plus Icon Button */}
        <button
          // Match the light orange background, right-side rounding, and padding/size
          className="bg-[#FFEFE8] w-8 h-8 flex items-center justify-center rounded-[8px]"
          onClick={() => console.log("Add product clicked")} // Add your actual click handler here
          aria-label={`Add ${item.name} to cart`}
        >
          <img src={plusIcon.src} alt="Add to cart" className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);


export default RestaurantItemCard