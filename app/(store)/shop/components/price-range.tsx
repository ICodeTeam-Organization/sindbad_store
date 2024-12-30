"use client";
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";

const PriceRange = ({onChangeRange}:{onChangeRange:(s:[number,number])=>void}) => {

  const { filters } = useShopFiltersStore();
  const [priecRange, setPriecRange] = useState<[number,number]>(filters.price);

  const [isUpdated, setIsUpdated] = useState(false);
  const rangeChamged = useDebounce(priecRange,1000);
  useEffect(() => {
    if (rangeChamged && isUpdated) {
      setIsUpdated(false);
      onChangeRange(priecRange)
    }
  }, [rangeChamged])
  
  useEffect(() => {
    setPriecRange(filters.price)
  }, [filters.price])
  

  return (
    <div className="my-6  ">
      <h3 className="mb-2">السعر</h3>
      {/* <div className="flex items-center mb-4 h-[2px] ">
        <input type="range" min="0" max="1000" className="w-full" />
      </div> */}
      <div className="flex  gap-4 items-center">
        <Input
         placeholder="اقل سعر"
         type="number"
         value={priecRange[0]}
         onChange={(e)=>{
          if (+e.target.value > priecRange[1]) return;
          setIsUpdated(true)
          setPriecRange(o=>([+e.target.value,o[1]]))
         }}
         className=" text-center  hover:outline-none min-h-[40px] border border-gray-300  rounded"
        />
        <span > الى </span>
        <Input
         placeholder="اعلى سعر"
         type="number"
         value={priecRange[1]}
         onChange={(e)=>{
          setIsUpdated(true)
          // if (+e.target.value < priecRange.to) return;
          setPriecRange(o=>([o[0],+e.target.value]))
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
