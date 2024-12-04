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
import { useRouter, useSearchParams } from "next/navigation";
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";


interface searchParams {
    skw?:string;//search keyword
    cats?:string[];
    subCats?:string[];
    store?:string | "";
    brands?:string[];
    tags?:string[];
    newProducts?:string;
    todayOffers?:string;
  }

  


const Sidebar = () => {

  const {
    setPriceRange,
    setStoreId,
    filters,
  } = useShopFiltersStore();

  const brandList = ['Google', 'Apple', 'Samsung', 'Microsoft','HP', 'Dell', 'Xiaomi','Symphony','Panasonic','Sony','Intel','LG','One Plus'];
  const tags = ['Graphics Cards', 'TV', 'iPhone', 'Game',  'Asus Laptops', 'SSD', 'Mackbook','Speakers','Smart TV','Power Bank','Samsung','Microsoft','Tablet'];
  const router = useRouter();
  const searchParams = useSearchParams();

  // to set init values if there in params
  // const params: searchParams = {
  //   skw: searchParams.get("skw") || "",
  //   store: searchParams.get("store") || "",
  //   newProducts: searchParams.get("newProducts") || "f",
  //   todayOffers: searchParams.get("todayOffers") || "f",
  //   cats: searchParams.get("cats")?.split(',') || [],
  //   subCats: searchParams.get("subCats")?.split(',')  || [],
  //   brands: searchParams.get("brands")?.split(',')  || [],
  //   tags: searchParams.get("tags")?.split(',')  || [],
  // };

  // const updateQueryParams = (params: Record<string, string | number>) => {
  
  //   const newParams = new URLSearchParams(searchParams.toString());
  
  //   for (const [key, value] of Object.entries(params)) {
  //     newParams.set(key, value.toString());
  //   }
  
  //   const currentPath = window.location.pathname;
  
  //   const hasQueryParams = window.location.search.length > 0;
  
  //   const newUrl = `${currentPath}${hasQueryParams ? '&' : '?'}${newParams.toString()}`;
  
  //   router.push(newUrl);
  // };

  return (
    <aside className=" h-full ">
      <div className="mb-4" >
         <StoresSearchSelector
            onSelected={(store) => {
              setStoreId(store.id+""); 
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
