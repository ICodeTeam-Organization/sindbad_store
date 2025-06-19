"use client";

import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import { NormalizedCategoryType } from "@/Data/normalizTypes"; 
import { useEffect } from "react";

export default function SetCategoriesInLocalStorage({
  AllCategoriesWihtSubcategories,
}: {
    AllCategoriesWihtSubcategories: NormalizedCategoryType[];
}) {

const setCategories = useCategoriesDataStore((state) => state.setCategories);

  useEffect(() => {
    const cats = JSON.parse(localStorage.getItem("categories") || '[]')
    if (cats && cats?.length > 0) {
        // setCategories(cats)
        setCategories(AllCategoriesWihtSubcategories || cats || [])
    }else{
        setCategories(AllCategoriesWihtSubcategories || [])
    }
  }, []);

  return null; // No UI needed
}
