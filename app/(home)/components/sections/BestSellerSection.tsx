// app/components/sections/BestSellerCarouselSection.tsx

import ProductCarsoule from "@/components/ProductCarsoule";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import { NormalizedProductType } from "@/Data/normalizTypes";
import { getApi } from "@/lib/http";

 
export default async function BestSellerSection() {
  try {
    const res = await getApi<{ data: NormalizedProductType[] }>(
      "Products/HomePage/GetMostProductsSellingInWeekForViewInMarketHomePage/20"
    );

    const bestSellers = res?.data?.map(normalizeProduct);

    if (!bestSellers || bestSellers.length === 0) return null;

    return (
      <ProductCarsoule
        products={bestSellers}
        sectionHref="/shop?bestseller=true"
        sectionTitle="الأكثر مبيعاً هذا الأسبوع"
      />
    );
  } catch (err) {
    console.error("فشل تحميل المنتجات الأكثر مبيعاً 😅", err);
    return null;
  }
}
