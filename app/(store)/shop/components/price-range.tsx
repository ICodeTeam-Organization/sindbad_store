"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const PriceRange = ({onChangeRange}:{onChangeRange:(s:{ from: number; to: number })=>void}) => {
  
  const [priecRange, setPriecRange] = useState<{ from: number; to: number }>({
    from: 0,
    to: 10000,
  });

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
         value={priecRange.from}
         onChange={(e)=>{
          if (+e.target.value > priecRange.to) return;
          setPriecRange(p=>({...p,from:+e.target.value}))
         }}
         className=" text-center  hover:outline-none min-h-[40px] border border-gray-300  rounded"
        />
        <Input
         placeholder="اعلى سعر"
         type="number"
         value={priecRange.to}
         onChange={(e)=>{
          // if (+e.target.value < priecRange.to) return;
          setPriecRange(p=>({...p,to:+e.target.value}))
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
