import React from "react";
import { FilterButtonProps } from "../types";
import { cn } from "@/lib/utils";

const FilterButton: React.FC<FilterButtonProps> = ({ title , count = 0 , onClick , isActive  }) => {
  return (
    <button onClick={onClick} className={cn(
      "px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none text-sm  transition duration-300",
      isActive && '  shadow-lg  '
    )}>
      {title}
      {count > 0 && <span className=" px-1 py-[2px]  text-center bg-red-500 rounded-full text-white mr-2" >{count}</span>}
    </button>
  );
};

export default FilterButton;
