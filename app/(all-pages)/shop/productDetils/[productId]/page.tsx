import React from "react";
import { getApi, postApi } from "@/lib/http";
import { notFound } from "next/navigation";
import ProductDetails from "./components/product-details";
import { Product } from "./types";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import TabsComponent from "./components/taps";
import { NormalizedProductType } from "@/Data/normalizTypes";
import ProductCarsoule from "@/components/ProductCarsoule"; 

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const fetchProductDetails = async (id: string): Promise<Product | null> => {
  try {
    const response = await getApi<any>(`Products/GetProductDetails/${id}`);
    if (response?.success && response?.data) {
      return response.data;
    } else {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    notFound();
  }
  return null;
};
const fetchSimilerProducts = async (
  product: NormalizedProductType
): Promise<{ items: NormalizedProductType[] } | null> => {
  try {
    const response = await postApi<any>(
      `Products/GetProductsWitheFilter?returnDtoName=2`,
      {
        body: {
          pageNumber: 1,
          pageSize: 15,
          categories: [
            ...product.mainCategoriesIds,
            ...product.subCategoriesIds,
          ],
          storeId: product?.storeId,
          // hasOffer: filters.hasOffer == "t",
          // todayOffers: filters.todayOffer == "t",
          // productName: filters.productName || null,
          // minPrice: filters.price[0],
          // maxPrice: filters.price[1],
          // categories: [
          //   ...filters.cats.map((id) => +id),
          //   ...filters.subCats.map((id) => +id),
          // ],
          // mainCategories: [...filters.cats.map((id) => +id)],
          // subCategories: [...filters.subCats.map((id) => +id)],
          // brandId: filters.brandId || null,
          // tags: filters.tagId ? [filters.tagId] : null,
          // orderBy: filters.orderBy || 0,
        },
      }
    );
    if (response?.success && response?.data) {
      return response.data;
    } else {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    notFound();
  }
  return null;
};

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { productId } = params;

  if (!productId) {
    notFound();
  }

  const productData = await fetchProductDetails(productId);
  if (!productData) {
    notFound();
  }

  const product = normalizeProduct(productData); // تحول شكل البينات الى الشكل الموحد NormlizedProductType

  const similerproducts = await fetchSimilerProducts(product); 

  if (!similerproducts) {
    notFound();
  }

  // const storeData = await fetchStoreDetails(product?.storeId ?? "");

  return (
    <div className="bg-bg-100">
      <div className="xl:container mx-auto  pt-10 ">
        <ProductDetails product={product} />
        <div className="mdHalf:px-12 px-4 ">
          {/* <ProductDetailsAccordingmenus product={product} productId={productId} /> */}
          <TabsComponent product={product} productId={productId} />
        </div>
        <div className="bg-white mdHalf:mx-12 rounded shadow-sm px-4">
          <ProductCarsoule
            products={(similerproducts.items).map(normalizeProduct)}
            sectionTitle="منتجات مشابهة"
            sectionHref={`/shop?cats=${[
              ...product?.subCategoriesIds,
              product.mainCategoriesIds,
            ].join(",")}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
