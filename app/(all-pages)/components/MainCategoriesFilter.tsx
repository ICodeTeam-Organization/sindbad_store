"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { MainCategory } from "@/types/storeTypes";
import React from "react";

interface ParentChildCheckboxProps {
  data: MainCategory[]; 
  checkedId:number;
  onCheckedChange:(id:number) => void
}

const MainCategoriesFilter: React.FC<ParentChildCheckboxProps> = ({ data , checkedId , onCheckedChange}) => {
  return (<>
     <h2 className="text-sm mb-4 pb-4 border-b mt-10 lg:mt-0" > الفئـــات </h2>
     <div className=" h-[70vh] overflow-y-auto overflow-x-hidden border-b">
     {
      data.map((ele)=>{
        return (
          <div className="mb-1" key={ele.id} >
            <div className="flex items-center space-x-3">
              
               <Checkbox
                id={ele.id+""}
                checked={checkedId == ele.id}
                onCheckedChange={()=>{
                  onCheckedChange(ele.id)
                }}
               />
              <div className="flex items-center ">
                <div>
                  <label htmlFor={ele?.id+""} className="text-xs tajawa mx-2">{ele?.name}</label>
                </div>
              </div>
            </div>
      
          </div>
        );
      })
     }
     </div>
  </>)
};

export default MainCategoriesFilter;
