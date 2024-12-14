"use client";

import React, { useState, useEffect } from "react";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
import ProductDetails from "./components/product-details";
import TabsComponent from "./components/taps";
import DetailsTap from "./components/details-tap";
import ProductFeaturesTap from "./components/features-table";
import ProductReviewsTap from "./components/reviews-tap";

type ProductPageProps = {
  params: {
    productId: string;
  };
};

interface ProductImage {
  imageUrl: string;
}
interface AttributeWithValues {
  attributeName: string;
  values: string[];
}
interface Product {
  id: number;
  name: string;
  description: string;
  priceBeforOffer: number;
  priceAfterOffer: number;
  percentageOfDiscount: number;
  amountYouShouldToBuyForGetOffer: number;
  amountYouWillGetFromOffer: number;
  offerSentence: string;
  offerStartDate: string; 
  offerEndDate: string; 
  mainImageUrl: string;
  number: string;
  brandName: string;
  categoryName: string;
  oneStarCount: number;
  twoStarCount: number;
  threeStarCount: number;
  fourStarCount: number;
  fiveStarCount: number;
  productImages: ProductImage[];
  attributesWithValues: AttributeWithValues[];
}
const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { productId } = params;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id: string) => {
    try {
      const response = await getApi<any>(
        `ProductsProductDetailsPage/GetProductDetailsForViewInProductDetailsPage/${id}`
      );
      // console.log("Fetched Response:", response);
      if (response?.success && response?.data) {
        // console.log("Product Data:", response.data);
        setProduct(response.data);
      } else {
        notFound();
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      notFound();
    }
  };

  const productFeatures = [
    { label: "Material", value: "High Quality Leather" },
    { label: "Warranty", value: "1-Year" },
    { label: "Environmentally Friendly", value: "Yes" },
  ];

  if (!product) {
    return <div>Loading...</div>; // يمكنك إضافة شاشة تحميل أو رسالة
  }
  return (
    <>
      <ProductDetails product={product} />
      <TabsComponent
       product={product}
       productId={productId}
      />
    </>
  );
};

export default ProductPage;
