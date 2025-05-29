"use client";
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";
import { Checkbox } from "@/components/ui/checkbox";
import { MainCategory } from "@/types/storeTypes";
import { Dot } from "lucide-react";
import React, { useState } from "react";
import { MdOutlineChevronLeft } from "react-icons/md";

// interface SubCategory {
//   id: number; // Unique ID for the subcategory
//   name: string; // Name of the subcategory
//   checked: boolean; // Whether the subcategory is checked
// }

// interface ParentCategory {
//   id: number; // Unique ID for the parent category
//   name: string; // Name of the parent category
//   subCategories: SubCategory[]; // Array of subcategories
// }

interface ParentChildCheckboxProps {
  data: MainCategory; // Represents the parent and its children
}

const CategoriesShopFilter: React.FC<ParentChildCheckboxProps> = ({ data }) => {

  const {toggleCat,toggleSubCat,filters,setSubCats} = useShopFiltersStore();

  const [isExpanded, setIsExpanded] = useState(false);
  
  const isAllSubCatsChecked = data?.subCategories ? data?.subCategories.every((ele)=>{
    return filters.subCats.includes(ele.id+"")
  }) : false; 
 
  
  const isIndeterminate = Boolean(!isAllSubCatsChecked && data?.subCategories?.some((e)=>filters.subCats.includes(e.id+"")));

  return (
    <div className="mb-1">
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-gray-600 focus:outline-none flex items-center justify-center"
        >
          {data.subCategories && data.subCategories?.length > 0 && (
            <span
              className={`transition-transform ${
                isExpanded ? "-rotate-90" : ""
              } inline-block mx-2 mr-0`}
            >
              <MdOutlineChevronLeft />
            </span>
          )}
        </button>
         <Checkbox
          id={data.id+""}
          checked={isIndeterminate?"indeterminate":filters.cats.includes(data.id+'')}
          onCheckedChange={(e)=>{
            const subCategories = data?.subCategories?.map((ele)=>(ele.id+'').trim()) || []
            if (e) {
              setSubCats([...filters.subCats,...subCategories])
            } else {
              setSubCats(filters.subCats.filter((currentItem) => !subCategories.find((e:string)=> e == currentItem) ))
            }
            toggleCat(data.id+'')
          }}
         />
        {/* <input
          type="checkbox"
          id={data.id+""}
          checked={filters.cats.includes(data.id+'')}
          ref={(input) => {
            if (input)
              input.indeterminate = isIndeterminate
          }}
          onChange={(e) => {
            const subCategories = data?.subCategories?.map((ele)=>(ele.id+'').trim()) || []
            if (e.target.checked) {
              setSubCats([...filters.subCats,...subCategories])
            } else {
              setSubCats(filters.subCats.filter((currentItem) => !subCategories.find((e:string)=> e == currentItem) ))
            }
            toggleCat(data.id+'')
          }}
          className="mr-0"
        /> */}
        <div className="flex items-center">
          <div>
            <label htmlFor={data.id+""} className="text-xs tajawa">{data.name}</label>
          </div>
        </div>
      </div>

      {/* Child Checkboxes (Collapsible) */}
      {isExpanded &&
        data.subCategories &&
          <div className="border-r mr-2 pr-1" >
              {
                data.subCategories.map((i:any) => (
                  <div key={i.id} className="flex items-center space-x-3">
                    <div className="text-gray-600 focus:outline-none flex items-center justify-center">
                      <span
                        className={`transition-transform ${
                          isExpanded ? "-rotate-90" : ""
                        } inline-block  mr-0`}
                      >
                        <Dot />
                      </span>
                    </div>
                    <Checkbox
                      id={data.id+""}
                      checked={filters.subCats.includes(i.id+"")}
                      onCheckedChange={(e)=>{
                         
                        toggleSubCat(i.id+"")

                         if (e) {
                          const isAllChecked = data?.subCategories?.every((ele)=>{
                            return [...filters.subCats,i.id+""].includes(ele.id+"")
                         });
                         if (isAllChecked && !filters.cats.includes(data.id+'')) {
                            toggleCat(data.id+'')
                          }
                         } else {
                        //   let subcat = filters.subCats.filter((ele)=>ele !== i.id+"")
                        //   const isAllChecked = data?.subCategories?.every((ele)=>{
                        //     return [...subcat].includes(ele.id+"")
                        //  });
                        if (filters.cats.includes(data.id+'')) {
                          toggleCat(data.id+'')
                        }
                        //  if (isAllChecked && !filters.cats.includes(data.id+'')) {
                        //     toggleCat(data.id+'')
                        //   }
                         }

                       
                        // if (isAllSubCatsChecked && !filters.cats.includes(data.id+'')) {
                        //   toggleCat(data.id+'')
                        // } 
                        
                        
                      }}
                    />
                    {/* <input
                      type="checkbox"
                      id={i.id}
                      checked={filters.subCats.includes(i.id+"")}
                      onChange={(e) => {
                        toggleSubCat(i.id+"")
                        const isAllChecked = data?.subCategories?.every((ele)=>{
                           return [...filters.subCats,i.id+""].includes(ele.id+"")
                        });
                        if (isAllChecked && !filters.cats.includes(data.id+'')) {
                          toggleCat(data.id+'')
                        }
                        
                      }}
                      className="mr-0"
                    /> */}
                    <div className="flex items-center">
                      <div>
                        <label htmlFor={i.id} className="text-xs tajawa">{i.name}</label>
                      </div>
                    </div>
                  </div>
                ))
              }
          </div>
        }
    </div>
  );
};

export default CategoriesShopFilter;
