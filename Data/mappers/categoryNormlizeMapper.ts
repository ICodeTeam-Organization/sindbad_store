import { getCookie } from "@/lib/coockie-utls";
import { NormalizedCategoryType } from "../normalizTypes";

export function normalizeCategory(input: any): NormalizedCategoryType {
  const country = getCookie("country")

  return {
    id: input.id,
    name: input.name,
    image: input.imageUrl ?? input.image,
    categoryTypeName: input.categoryTypeName,
    categoryTypeNumber: input.categoryTypeNumber,
    parentCategoryId: input.parentCategoryId,
    subCategories:(Array.isArray(input.subCategories) ? input.subCategories.map(normalizeCategory) : []),
      code:"",
      path:"",
      country:country ?? "1"
  };
}