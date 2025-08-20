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
          // storeId: product?.storeId, 
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


export async function generateMetadata({ params }: ProductPageProps) {
  const productId = params.productId.split("_")[0];
  const productData = await fetchProductDetails(productId);
  const product: NormalizedProductType = normalizeProduct(productData);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sindbad-store.vercel.app";
  const imageUrl = product.image     ;
  const pageUrl = `${baseUrl}/product/${params.productId}`;

  const description =
    (product.isOfferStillOn && product.offerSentence) ||
    product.shortDecription ||
    product.description ||
    "اكتشف هذا المنتج الرائع الآن في متجرنا.";

  return {
    title: product?.name,
    description: description,
    openGraph: {
      title: product?.name,
      description: description,
      url: pageUrl,
      images: [imageUrl],
      type: "website",
    },
    twitter: {
      title: product?.name,
      description: description,
      images: [imageUrl],
      card: "summary_large_image",
    },
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  let { productId } = params;
  productId = productId.split("_")[0]

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
