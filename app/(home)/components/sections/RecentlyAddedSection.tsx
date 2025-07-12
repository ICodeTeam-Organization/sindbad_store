// app/components/sections/RecentlyAddedCarouselSection.tsx

import { getApi } from "@/lib/http";
import { Product } from "@/types/storeTypes";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import ProductCarsoule from "@/components/ProductCarsoule";

export default async function RecentlyAddedSection() {
  try {
    const res = await getApi<{ data: Product[] }>(
      "Products/HomePage/GetLastProductsAddedToMarketForViewInMarketHomePage/20"
    );

    const products = res?.data?.map(normalizeProduct);

    if (!products || products.length === 0) return null;

    return (
      <ProductCarsoule
        products={products}
        sectionHref="/shop?newProduct=t"
        sectionTitle="أضيفت مؤخرًا"
      />
    );
  } catch (err) {
    console.error("فشل تحميل المنتجات الجديدة 🥲", err);
    return null;
  }
}
