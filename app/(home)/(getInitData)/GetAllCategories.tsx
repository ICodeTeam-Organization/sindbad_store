"use client";

import { useCategoriesDataStore } from "@/app/stores_mangament/categoriesStore";
import { db } from "@/Data/database/db";
import { normalizeCategory } from "@/Data/mappers/categoryNormlizeMapper";
import { NormalizedCategoryType } from "@/Data/normalizTypes";
import { getApi } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function GetAllCategories() {
  const { setCategories } = useCategoriesDataStore();

  const { data, isSuccess } = useQuery<NormalizedCategoryType[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getApi<{ data: { items: any[] } }>(
        "Category/GetAllMainCategoriesWithSubCategories/1/10000"
      ); // ✅ API endpoint
      return response.data.items.map(normalizeCategory);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });

  useEffect(() => {
    if (isSuccess && data) {
      const updateLocalDatabase = async () => {
        const localCats = await db.categories.toArray();
        if (!localCats || localCats.length === 0) {
          await db.categories.bulkAdd(data);
          localStorage.setItem("CATS_LAST_UPDATE", new Date().toISOString());
          setCategories(data);
        } else {
          setCategories(localCats);
        }
      };

      updateLocalDatabase();
    }
  }, [isSuccess, data]);

  return null;
}
