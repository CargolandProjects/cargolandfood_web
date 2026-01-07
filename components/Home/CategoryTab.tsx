import { CategoryTab as Category } from "../restaurants/ReastaurantPageContent";

const CategoryTab = ({ name, isActive = false, selectTab }: Category) => (
  <button
    onClick={() => selectTab(name)}
    className={`
      px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
      ${
        isActive
          ? "bg-primary text-white shadow-md" // Active (Orange background)
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50" // Inactive (White background/border)
      }
    `}
  >
    {name}
  </button>
);

export default CategoryTab;
