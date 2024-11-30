"use client";

import React from "react";

import PriceRange from "./price-range";

import PopularTags from "./popular-tags";
import Categories from "./Categories";
import Brands from "./Brands";
import CategorySelector from "./CategorySelector";

import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import CategoriesAndSubCheckBox from "./CategoriesAndSubCheckBox";

const Sidebar = () => {
  const categoryList = [
    "أجهزة إلكترونية",
    "كمبيوتر & لابتوب",
    "إكسسوارات الكمبيوتر",
    "جوالات ذكية",
    "سماعات",
    "إكسسوارات الجوال",
    "Gaming Console",
    "Camera & Photo",
    "TV & Homes Appliances",
    "Watchs & Accessories",
    "GPS & Navigation",
    "Warable Technology",
  ];

  const brandList = ['Google', 'Apple', 'Samsung', 'Microsoft','HP', 'Dell', 'Xiaomi','Symphony','Panasonic','Sony','Intel','LG','One Plus'];
  const tags = ['Graphics Cards', 'TV', 'iPhone', 'Game',  'Asus Laptops', 'SSD', 'Mackbook','Speakers','Smart TV','Power Bank','Samsung','Microsoft','Tablet'];

  const { categories } = useCategoriesDataStore()

  return (
    <aside className="hidden md:block w-[20%] p-4">
      {/* <Categories categories={categoryList} /> */}
      <div className="max-h-[50vh] overflow-auto " >
      {categories.map((i)=>(
        <CategoriesAndSubCheckBox 
          key={i.id}  
          data={i} 
          parent  
          onChecked={(ids,parent)=>{
              console.log(ids,parent);
          }} 
          />
      ))}
      </div>
      {/* <CategorySelector/> */}
      <PriceRange />
      <Brands brands={brandList} />
      <PopularTags tags={tags} />
    </aside>
  );
};

export default Sidebar;
