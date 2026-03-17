import { Categories } from "@/lib/services/vendors.service";

export interface CategoryTabProps {
  activeCatId: string | null;
  selectCatId: (tab: string | null) => void;
  categories: Categories[];
}

const CategoryTab = ({
  categories,
  selectCatId,
  activeCatId,
}: CategoryTabProps) => (
  <div className="flex gap-2.5 sm:gap-4.5 max-w-[606px] h-11.5 shrink justify-start overflow-x-auto hide-scrollbar">
    {/* Default All Button  */}
    <button
      onClick={() => selectCatId(null)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
        activeCatId === null
          ? "bg-primary text-white shadow-md" // Active (Orange background)
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50" // Inactive (White background/border)
      }
    `}
    >
      All
    </button>

    {/* Categoreis Selection from Vendor */}
    {categories.map((category) => {
      const isActive = category.id === activeCatId;
      return (
        <button
          key={category.id}
          onClick={() => selectCatId(category.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            isActive
              ? "bg-primary text-white shadow-md" // Active (Orange background)
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50" // Inactive (White background/border)
          }
    `}
        >
          {category.name}
        </button>
      );
    })}
  </div>
);

export default CategoryTab;
