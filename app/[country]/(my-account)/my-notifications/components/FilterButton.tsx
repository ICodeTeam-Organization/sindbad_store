import React from "react";
import { FilterButtonProps } from "../types";
import { cn } from "@/lib/utils";

const FilterButton: React.FC<FilterButtonProps> = ({ title , count = 0 , onClick , isActive  }) => {
  return (
    <button onClick={onClick} className={cn(
      "px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none text-sm  transition duration-300",
      isActive && '  shadow-sm border-primary  '
    )}>
      <span>{title}</span>
      {count > 0 && <span className="   text-center  text-primary font-bold rounded-full   mr-2" >{count}</span>}
    </button>
  );
};

export default FilterButton;
