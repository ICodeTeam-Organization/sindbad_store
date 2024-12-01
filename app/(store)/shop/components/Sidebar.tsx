"use client";

import React, { useEffect, useRef, useState } from "react";

import PriceRange from "./price-range";

import PopularTags from "./popular-tags";
import Categories from "./Categories";
import Brands from "./Brands";
import CategorySelector from "./CategorySelector";

import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import CategoriesAndSubCheckBox from "./CategoriesAndSubCheckBox";
import StoresSearchSelector from "./StoresSearchSelector";
import { useRouter } from "next/navigation";
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";

const Sidebar = () => {

  const {
    setPriceRange,
    setStoreId,
  } = useShopFiltersStore();

  // const categoryList = [
  //   "أجهزة إلكترونية",
  //   "كمبيوتر & لابتوب",
  //   "إكسسوارات الكمبيوتر",
  //   "جوالات ذكية",
  //   "سماعات",
  //   "إكسسوارات الجوال",
  //   "Gaming Console",
  //   "Camera & Photo",
  //   "TV & Homes Appliances",
  //   "Watchs & Accessories",
  //   "GPS & Navigation",
  //   "Warable Technology",
  // ];
  const brandList = ['Google', 'Apple', 'Samsung', 'Microsoft','HP', 'Dell', 'Xiaomi','Symphony','Panasonic','Sony','Intel','LG','One Plus'];
  const tags = ['Graphics Cards', 'TV', 'iPhone', 'Game',  'Asus Laptops', 'SSD', 'Mackbook','Speakers','Smart TV','Power Bank','Samsung','Microsoft','Tablet'];

  // const { categories } = useCategoriesDataStore();

  return (
    <aside className=" h-full ">
      <div className="mb-4" >
         <StoresSearchSelector
            onSelected={(store) => {
              setStoreId(store.id); // Update store ID in the filter store
            }}
          />
      </div>
      {/* <Categories categories={categoryList} /> */}
      {/* <div className="max-h-[50vh] overflow-auto " >
      {categories.map((i)=>(
        <CategoriesAndSubCheckBox 
          key={i.id}  
          data={i} 
          parent  
          onChecked={(ids)=>{
              console.log(ids);
          }} 
          />
      ))}
      </div> */}
      {/* <CategorySelector/> */}
      <PriceRange 
        onChangeRange={(range)=>{
          setPriceRange(range);
        }}
       />
      <Brands brands={brandList} />
      <PopularTags tags={tags} />
    </aside>
  );
};

export default Sidebar;
