'use client'

import React, { useState } from 'react';
import ProductTitle from './ProductTitle';
import ProductInfoRow from './ProductInfoRow';
import PriceSection from './PriceSection';
import { LiaShoppingCartSolid } from "react-icons/lia";
import { ProductDetailsProps } from '../types';
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const product:ProductDetailsProps = {
    description: "2020 MacBook pro من Apple مع شريحة M1( مقاس 13 بوصة,8 جيجا بايت رام, تخزين 256  SSD)",
    rating: 5,
    availability: "In Stock",
    productNumber: "A2338M1",
    category: "Laptops",
    brand: "Apple",
    discountedPrice: "1699 ر.س",
    originalPrice: "1999 ر.س",
    discount: 21,
    colors: "Space Gray",
    size: "13 inches",
    memory: "8 GB",
    storage: "256 GB",
  };

  return (
    <div className="flex flex-col gap-8 p-8">

<ProductTitle 
        description={product.description} 
        rating={product.rating} 
      />
      <ProductInfoRow 
        label1="التوفر" value1={product.availability} 
        label2="رقم المنتج" value2={product.productNumber}
      />
      <ProductInfoRow 
        label1="الفئة" value1={product.category} 
        label2="الماركة" value2={product.brand}
      />

      <PriceSection 
        discountedPrice={product.discountedPrice} 
        originalPrice={product.originalPrice} 
        discount={product.discount}
      />

      <hr className="my-4 border-gray-300" />

      <ProductInfoRow 
        label1="الألوان" value1={product.colors} 
        label2="الحجم" value2={product.size}
      />

      <ProductInfoRow 
        label1="الذاكرة" value1={product.memory} 
        label2="التخزين" value2={product.storage}
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
