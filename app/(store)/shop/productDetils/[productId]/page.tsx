
import React from "react";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
import ProductDetails from "./components/product-details";
import TabsComponent from "./components/taps";
import { Product } from "./types";

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

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { productId } = params;

  if (!productId) {
    notFound();
  }

  const product = await fetchProductDetails(productId);

  if (!product) {
    notFound();
  }

  console.log(product);
  

  return (
    <div className="xl:container mx-auto">
      <ProductDetails product={product} />
      <TabsComponent product={product} productId={productId} />
    </div>
  );
};

export default ProductPage;
