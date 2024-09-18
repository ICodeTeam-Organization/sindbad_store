'use client'

import React, { useState, useEffect } from 'react';
import { getApi } from '@/lib/http';
import { notFound } from 'next/navigation';
import ProductTitle from './ProductTitle';
import ProductInfoRow from './ProductInfoRow';
import PriceSection from './PriceSection';
import { LiaShoppingCartSolid } from "react-icons/lia";

type ProductDetailsProps = {
  params: {
    productId: string; // Access productId from dynamic route params
  };
};

const ProductDetails = ({ params }: ProductDetailsProps) => {
  const { productId } = params; // Extract productId from dynamic route
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id: string) => {
    try {
      const response = await getApi<any>(`products/ProductDetailsPage/GetProductDetailsForViewInProductDetailsPage/${id}`);

      // Check if the API call was successful and product data exists
      if (response?.success && response?.data) {
        setProduct(response.data);
      } else {
        notFound(); // Redirect to 404 if no product found or API response is not successful
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      notFound(); // Redirect to 404 in case of error
    }
  };

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <ProductTitle 
        description={product.description} 
        rating={5} // Adjust rating based on your API response if available
      />

      <ProductInfoRow 
        label1="التوفر" value1="In Stock" // You can add availability based on API response
        label2="رقم المنتج" value2={product.number}
      />
      
      <ProductInfoRow 
        label1="الفئة" value1={product.categoryName} 
        label2="الماركة" value2={product.brandName || 'N/A'}
      />

      <PriceSection 
        discountedPrice={`${product.priceAfterOffer} ر.س`} 
        originalPrice={`${product.priceBeforOffer} ر.س`} 
        discount={Math.round(((product.priceBeforOffer - product.priceAfterOffer) / product.priceBeforOffer) * 100)}
      />

      <hr className="my-4 border-gray-300" />

      <ProductInfoRow 
        label1="الألوان" value1={product.attributesWithValues.find(attr => attr.attributeName === "Color")?.values.join(', ') || "N/A"} 
        label2="الحجم" value2={product.attributesWithValues.find(attr => attr.attributeName === "Size")?.values.join(', ') || "N/A"}
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <button className="bg-gray-200 py-2 px-4 text-lg" onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button className="bg-gray-200 py-2 px-4 text-lg" onClick={handleIncrement}>+</button>
        </div>
        <button className="min-w-[200px] h-[50px] bg-orange-500 text-white text-xl rounded-md flex justify-center items-center mb-2 md:mb-0">
            <LiaShoppingCartSolid className="w-8 h-8 mr-2" />
            <p>اضف للسلة</p>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
