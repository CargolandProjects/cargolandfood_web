"use client";

import React from "react";

interface Filter {
  label: string;
  value: string;
}

interface FilterBarProps {
  filters: Filter[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;
}

const FilterBar = ({
  filters,
  activeFilter = "all",
  onFilterChange,
}: FilterBarProps) => {
  return (
    <div className="flex space-x-[12px] overflow-x-auto pb-2">
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter;

        // const baseStyles =
        //   "px-6 py-3 rounded-md transition-colors duration-200 text-sm font-medium whitespace-nowrap";

        // const activeStyles = "bg-orange-600 text-white shadow-md";
        // const inactiveStyles = "bg-gray-100 text-gray-700 hover:bg-gray-200";

        const baseStyles =
          "w-[102px] h-[32px] p-[6px] rounded-[10px] transition-colors duration-200 text-sm font-medium whitespace-nowrap";

        const activeStyles = "bg-orange-600 text-white shadow-md";
        const inactiveStyles = "bg-gray-100 text-gray-700 hover:bg-gray-200";

        return (
          <button
            key={filter.value}
            className={`${baseStyles} ${
              isActive ? activeStyles : inactiveStyles
            }`}
            onClick={() => onFilterChange?.(filter.value)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
