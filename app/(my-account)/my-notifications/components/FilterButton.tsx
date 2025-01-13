import React from "react";
import { FilterButtonProps } from "../types";

const FilterButton: React.FC<FilterButtonProps> = ({ title }) => {
  return (
    <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none text-sm sm:text-base">
      {title}
    </button>
  );
};

export default FilterButton;
