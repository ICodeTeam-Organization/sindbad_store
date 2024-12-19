"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { getApi } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

// Define the type for the props
interface BrandsProps {
  brand: number;
  onSelectBrand: (id: number) => void;
}

const Brands: React.FC<BrandsProps> = ({ brand, onSelectBrand }) => {
  const { data, isLoading } = useQuery<{
    data: { id: number; name: string }[];
  }>({
    queryKey: ["brands-filter"],
    queryFn: () => getApi("Brands/GetBrands"),
  });

  return (
    <div className="mb-6">
      <h3 className=" mb-2">الماركات</h3>
      <div className="grid grid-cols-2 gap-2 gap-x-6">
        {isLoading
          ? [1, 2, 3, 3, 3, 3, 4, 2, 5, 4].map(() => (
              <div className="p-1 px-2 rounded animate-pulse flex gap-x-2 items-center ">
                <div className="h-[16px] w-[16px] rounded-full bg-zinc-200 "></div>
                <div className="h-[13px] w-[80%] rounded-full bg-zinc-200 "></div>
              </div>
            ))
          : data?.data.map((ele, index) => (
              <label
                key={index}
                className="flex text-xs items-center"
              >
                <Checkbox
                  name="brand"
                  checked={brand == ele.id}
                  defaultChecked={false}
                  onCheckedChange={()=>{onSelectBrand(ele.id);}}
                  className="form-checkbox text-orange-500 ml-2"
                />
                {ele.name}
              </label>
            ))}
      </div>
    </div>
  );
};

export default Brands;
