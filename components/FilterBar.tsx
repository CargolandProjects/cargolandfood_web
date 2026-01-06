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
    <div className="flex space-x-4.5 hide-scrollbar overflow-x-auto">
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter;

        // const baseStyles =
        //   "px-6 py-3 rounded-md transition-colors duration-200 text-sm font-medium whitespace-nowrap";

        // const activeStyles = "bg-orange-600 text-white shadow-md";
        // const inactiveStyles = "bg-gray-100 text-gray-700 hover:bg-gray-200";

        const baseStyles =
          "h-[32px] px-[13px] rounded-button transition-colors duration-200 text-sm font-medium whitespace-nowrap";
        const activeStyles = "bg-primary text-white shadow-md";
        const inactiveStyles = "bg-white border border-neutral-300 text-gray-700 hover:bg-gray-100";

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
