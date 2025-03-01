"use client";

import React from "react";

import PriceRange from "./price-range";

import PopularTags from "./popular-tags";
import Brands from "./Brands";

import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import CategoriesShopFilter from "./CategoriesShopFilter";
import StoresSearchSelector from "./StoresSearchSelector";
import { useShopFiltersStore } from "@/app/stores/shopFiltersStore";
import { MainCategory } from "@/types/storeTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { GrPowerReset } from "react-icons/gr";

const Sidebar = () => {
  const {
    setPriceRange,
    setStoreId,
    setHasOffer,
    setNewProduct,
    filters,
    setBrandId,
    resetFilters,
    setTagId
  } = useShopFiltersStore();
  const { categories:all_categories } = useCategoriesDataStore();
  const categories = all_categories.filter((i) => i.categoryTypeNumber == 1);


  return (
    <aside className=" h-full  tajawal">

        <div className="mb-8 flex gap-x-2 items-center cursor-pointer" onClick={resetFilters}  >
            <GrPowerReset size={18}  />
            <p className="text-sm" > إعادة ضبط الفلاتر </p> 
         </div>

         {/* today offers and new products filter */}
      <div className=" mb-3 flex-row flex items-center justify-start mt-10 mdHalf:mt-0 ">
       
         <div className="flex items-center space-x-2  ">
          <Checkbox
            id="hasOffer"
            checked={filters.hasOffer == "t"}
            onCheckedChange={(checked) => setHasOffer(checked ? "t" : "f")}
          />
          <label
            htmlFor="hasOffer"
            className="text-[13px] px-2 cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            العروض
          </label>
         </div>

        <div className="flex items-center space-x-2 ">
          <Checkbox
            id="newProducts"
            checked={filters.newProduct == "t"}
            onCheckedChange={(checked) => setNewProduct(checked ? "t" : "f")}
          />
          <label
            htmlFor="newProducts"
            className="text-[13px] px-2 cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            وصل حديثاً
          </label>
        </div>
      </div>

      {/* store Filter */}
      <div className="">
        <h3 className="mb-2 text-base mt-4">المحل</h3>
        <StoresSearchSelector
          onSelected={(store) => {
            setStoreId(store.id + "");
          }}
        />
      </div>

      {/* price Filter */}
      <PriceRange
        onChangeRange={(range) => {
          setPriceRange(range);
        }}
      />
      {/* Categories Filter */}
      <div className="border-b mb-4">
        <h3 className="mb-2">الفئات</h3>
        <div className="max-h-[50vh] overflow-auto ">
          {categories.map((ele: MainCategory) => {
            return <CategoriesShopFilter 
            key={ele.id} 
            data={ele}
            />;
          })}
        </div>
      </div>

      <Brands
        brand={filters.brandId || 0}
        onSelectBrand={(id) => {
          if (id == filters.brandId) {
            setBrandId(0)
          } else {
            setBrandId(id);
          }
        }}
      />
      <PopularTags onSelectTag={setTagId}  activeTagId={filters.tagId} />
    </aside>
  );
};

export default Sidebar;
