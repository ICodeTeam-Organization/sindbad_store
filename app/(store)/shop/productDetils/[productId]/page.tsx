"use client";

import React, { useState, useEffect } from "react";
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

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { productId } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id: string) => {
    setLoading(true); 
    try {
      const response = await getApi<any>(
        `ProductsProductDetailsPage/GetProductDetailsForViewInProductDetailsPage/${id}`
      );
      if (response?.success && response?.data) {
        setProduct(response.data);
        setLoading(false); 
      } else {
        notFound();
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      notFound();
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      <ProductDetails product={product} />
      <TabsComponent product={product} productId={productId} />
    </>
  );
};

export default ProductPage;