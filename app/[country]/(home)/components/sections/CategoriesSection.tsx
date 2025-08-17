// app/components/sections/CategoriesSection.tsx

import { getApi } from "@/lib/http";
import { normalizeCategory } from "@/Data/mappers/categoryNormlizeMapper";
import Categories from "./Categories";

export default async function CategoriesSection() {
  try {
    const res = await getApi<{ data: any[] }>(
      "Market/categories/GetAllMainCategoriesWithPaginationForViewInCategoriesPage/1/100000"
    );

    const categories = res?.data?.map(normalizeCategory);

    if (!categories || categories.length === 0) return null;

    return <Categories categories={categories} />;
  } catch (err) {
    console.error("فشل تحميل الأقسام 😵", err);
    return null;
  }
}
