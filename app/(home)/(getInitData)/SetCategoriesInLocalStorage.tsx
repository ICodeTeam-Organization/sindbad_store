"use client";

import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import { MainCategory } from "@/types/storeTypes";
import { useEffect } from "react";

export default function SetCategoriesInLocalStorage({
  AllCategoriesWihtSubcategories,
}: {
    AllCategoriesWihtSubcategories: MainCategory[];
}) {

const setCategories = useCategoriesDataStore((state) => state.setCategories);

  useEffect(() => {
    const cats = JSON.parse(localStorage.getItem("categories") || '[]')
    if (cats && cats?.length > 0) {
        setCategories(cats)
    }else{
        setCategories(AllCategoriesWihtSubcategories || [])
    }
  }, []);

  return null; // No UI needed
}
