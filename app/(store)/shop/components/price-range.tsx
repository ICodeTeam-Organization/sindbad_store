"use client";
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const PriceRange = ({onChangeRange}:{onChangeRange:(s:[number,number])=>void}) => {

  const { filters ,setPriceRange } = useShopFiltersStore();
  const [priecRange, setPriecRange] = useState<[number,number]>([...filters.price]);

  useEffect(() => {
    onChangeRange(priecRange)
  }, [priecRange])
  

  return (
    <div className="mb-6">
      <h3 className="mb-2">السعر</h3>
      {/* <div className="flex items-center mb-4 h-[2px] ">
        <input type="range" min="0" max="1000" className="w-full" />
      </div> */}
      <div className="flex  gap-4">
        <Input
         placeholder="اقل سعر"
         type="number"
         value={filters.price[0]}
         onChange={(e)=>{
          if (+e.target.value > priecRange[1]) return;
          setPriceRange([+e.target.value,filters.price[1]])
         }}
         className=" text-center  hover:outline-none min-h-[40px] border border-gray-300  rounded"
        />
        <Input
         placeholder="اعلى سعر"
         type="number"
         value={filters.price[1]}
         onChange={(e)=>{
          // if (+e.target.value < priecRange.to) return;
          setPriecRange([filters.price[0],+e.target.value])
         }}
         className=" text-center hover:outline-none min-h-[40px] border border-gray-300  rounded"
        />
        {/* <button className="min-w-[150px] min-h-[40px] border border-gray-300  rounded-none">
          أقل سعر
        </button>
        <button className="min-w-[150px] min-h-[40px] border border-gray-300 px-4 py-2 rounded-none">
          أعلى سعر
        </button> */}
      </div>
    </div>
  );
};

export default PriceRange;
