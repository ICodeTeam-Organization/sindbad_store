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
    if (localStorage.getItem("categories")) {
        setCategories(JSON.parse(localStorage.getItem("categories") || '[]') || [])
    }else{
        localStorage.setItem("categories", JSON.stringify(AllCategoriesWihtSubcategories));
        setCategories(AllCategoriesWihtSubcategories || [])
    }
  }, [AllCategoriesWihtSubcategories]);

  return null; // No UI needed
}
