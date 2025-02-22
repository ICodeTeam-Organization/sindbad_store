"use client";

import { useCategoriesDataStore } from "@/app/stores/categoriesStore";

function CategoryName({ id }: { id: number }) {
  const { categories } = useCategoriesDataStore();
  const name = categories.find((ele) => ele.id == id)?.name;
  return <span>{name}</span>;
}

export default CategoryName;
