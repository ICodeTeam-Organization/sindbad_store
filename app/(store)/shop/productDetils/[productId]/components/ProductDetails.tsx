"use client";

import React, { useState, useEffect } from "react";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
import ProductTitle from "./ProductTitle";
import ProductInfoRow from "./ProductInfoRow";
import PriceSection from "./PriceSection";
import { LiaShoppingCartSolid } from "react-icons/lia";
import ImageGallery from "./ImageGallery";

type ProductDetailsProps = {
  params: {
    productId: string;
  };
};

const ProductDetails = ({ params }: ProductDetailsProps) => {
  const { productId } = params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
      console.log("Product ID:", productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id: string) => {
    try {
      const response = await getApi<any>(
        `ProductsProductDetailsPage/GetProductDetailsForViewInProductDetailsPage/${id}`
      );
      console.log("Product Data:", response?.data); // Log to check the data

      if (response?.success && response?.data) {
        setProduct(response.data);
      } else {
        notFound();
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      notFound();
    }
  };

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-12 px-12">
      <div className="lg:w-1/3 ml-8">
        <ImageGallery image={`/${product.mainImageUrl}`} />
      </div>
      <div className="lg:w-1/2">
        <ProductTitle description={product.description} rating={5} />

        <ProductInfoRow
          label1="التوفر"
          value1="In Stock"
          label2="رقم المنتج"
          value2={product.number}
        />

        <ProductInfoRow
          label1="الفئة"
          value1={product.categoryName}
          label2="الماركة"
          value2={product.brandName || "N/A"}
        />

        <PriceSection
          discountedPrice={`${product.priceAfterOffer} ر.س`}
          originalPrice={`${product.priceBeforOffer} ر.س`}
          discount={Math.round(
            ((product.priceBeforOffer - product.priceAfterOffer) /
              product.priceBeforOffer) *
              100
          )}
        />

        <hr className="my-4 border-gray-300" />

        <ProductInfoRow
          label1="الألوان"
          value1={
            <select className="border border-gray-300 rounded-md p-2">
              {product.attributesWithValues
                .find((attr) => attr.attributeName === "Color")
                ?.values.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                )) || <option>N/A</option>}
            </select>
          }
          label2="الحجم"
          value2={
            <select className="border border-gray-300 rounded-md p-2">
              {product.attributesWithValues
                .find((attr) => attr.attributeName === "Size")
                ?.values.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                )) || <option>N/A</option>}
            </select>
          }
        />

        <div className="flex items-center gap-4 mt-8">
          <div className="flex items-center gap-4">
            <button
              className="bg-gray-200 py-2 px-4 text-lg"
              onClick={handleDecrement}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="bg-gray-200 py-2 px-4 text-lg"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <button className="min-w-[200px] h-[50px] bg-orange-500 text-white text-xl rounded-md flex justify-center items-center mb-2 md:mb-0">
            <LiaShoppingCartSolid className="w-8 h-8 mr-2" />
            <p>اضف للسلة</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
