"use client";

import React from "react";

import PriceRange from "./price-range";

import PopularTags from "./popular-tags";
import Brands from "./Brands";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import CategoriesShopFilter from "./CategoriesShopFilter";
import StoresSearchSelector from "./StoresSearchSelector";
import { Checkbox } from "@/components/ui/checkbox";
import { GrPowerReset } from "react-icons/gr";
import { NormalizedCategoryType } from "@/Data/normalizTypes";
import { useCategoriesDataStore } from "@/app/stores_mangament/categoriesStore";
import { useShopFiltersStore } from "@/app/stores_mangament/shopFiltersStore";

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
  const { categories: all_categories } = useCategoriesDataStore();
  const categories = all_categories.filter((i) => i.categoryTypeNumber == 1);


  return (
    <aside className=" h-full  tajawal">
      <Accordion
        type={"multiple" as any}
        // collapsible
        className="w-full" 
      >
        <div className="mb-8 flex gap-x-2 items-center cursor-pointer bg-bg-50 py-2 rounded-md  justify-center" onClick={resetFilters}  >
          <GrPowerReset size={18} />
          <p className="text-sm" > إعادة ضبط الفلاتر </p>
        </div>

        {/* today offers and new products filter */}
        <div className=" mb-3 flex-row flex items-center justify-around mt-10 mdHalf:mt-0 ">

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
        <div className="mt-4">
          {/* <h3 className="mb-2 text-base mt-4">المحل</h3> */}
          <StoresSearchSelector
            onSelected={(store) => {
              setStoreId(store.id + "");
            }}
          />
        </div>

        {/* price Filter */}
        <AccordionItem value="item-1">
          <AccordionTrigger>السعر</AccordionTrigger>
          <AccordionContent className=" ">
            <PriceRange
              onChangeRange={(range) => {
                setPriceRange(range);
              }}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Categories Filter */}
        <AccordionItem value="item-2">
          <AccordionTrigger>الفئات</AccordionTrigger>
          <AccordionContent className=" ">
            <div className="border-b mb-4">
              <div className=" ">
                {categories.map((ele: NormalizedCategoryType) => {
                  return <CategoriesShopFilter
                    key={ele.id}
                    data={ele}
                  />;
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>الماركات</AccordionTrigger>
          <AccordionContent className=" ">
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>التاقات</AccordionTrigger>
          <AccordionContent className=" ">
            <PopularTags onSelectTag={setTagId} activeTagId={filters.tagId} />
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </aside>
  );
};

export default Sidebar;
