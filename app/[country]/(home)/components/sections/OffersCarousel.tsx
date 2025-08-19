// app/components/sections/OffersCarousel.tsx
import { getApi } from "@/lib/http";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import ProductCarsoule from "@/components/ProductCarsoule";
import { NormalizedProductType } from "@/Data/normalizTypes";

export default async function OffersCarousel() {
  const response = await getApi<{ data: NormalizedProductType[] }>(
    "Products/HomePage/GetNumberOfProductsThatHasOfferTodayForViewInMarketHomePage/20"
  );

  const products = response.data.map(normalizeProduct);

  if (!products.length) return null;

  return (
    <ProductCarsoule
      products={products}
      sectionHref="/shop?todayOffer=t"
      sectionTitle="عروض اليوم"
    />
  );
}
