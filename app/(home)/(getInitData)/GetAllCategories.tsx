"use client";

import { useCategoriesDataStore } from "@/app/stores_mangament/categoriesStore";
import { db } from "@/Data/database/db";
import { normalizeCategory } from "@/Data/mappers/categoryNormlizeMapper";
import { NormalizedCategoryType } from "@/Data/normalizTypes";
import { getCookie } from "@/lib/coockie-utls";
import { getApi } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function GetAllCategories({ date }: { date: Date }) {
  const { setCategories } = useCategoriesDataStore();
  const lastupdateOfCategories =
    typeof window !== "undefined"
      ? localStorage.getItem("CATS_LAST_UPDATE_" + getCookie("country"))
      : null;
  const { data, isSuccess } = useQuery<NormalizedCategoryType[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getApi<{ data: { items: any[] } }>(
        "Category/GetAllMainCategoriesWithSubCategories/1/10000?updatedAt=" +
          (lastupdateOfCategories || "2001-8-20")
      ); // ✅ API endpoint
      return response.data.items.map(normalizeCategory);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });

  useEffect(() => {
    if (isSuccess && data) {
      const updateLocalDatabase = async () => {
        const localCats = await db.categories.toArray();
        const localCatKeys = new Set(
          localCats.map((cat) => JSON.stringify([cat.country, cat.id]))
        );
        const newCategories = [];
        const updatedCategories = [];
        for (const cat of data) {
          const compoundKey = JSON.stringify([cat.country, cat.id]);
          if (localCatKeys.has(compoundKey)) {
            updatedCategories.push(cat); // موجود، تحديث
          } else {
            newCategories.push(cat); // جديد
          }
        }
        if (updatedCategories.length > 0) {
          await Promise.all(
            updatedCategories.map((cat) => db.categories.put(cat))
          );
        }
        if (newCategories.length > 0) {
          await db.categories.bulkAdd(newCategories);
        }
        // تحديث وقت آخر تحديث
        if (newCategories.length > 0 || updatedCategories.length > 0) {
          const now = date || new Date();
          now.setHours(now.getHours() + 2);
          localStorage.setItem(
            "CATS_LAST_UPDATE_" + getCookie("country"),
            now.toISOString()
          );
        }
        const finalCats = await db.categories.toArray();
        setCategories(finalCats);
      };

      updateLocalDatabase();
    }
  }, [isSuccess, data]);

  return null;
}
