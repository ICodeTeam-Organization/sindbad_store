"use client";

import React from "react";
import Image from "next/image";
import productImg from "../../../../public/images/productImg.svg";
import { ProductCardProps } from "../types";
import AddToBasket from "@/app/(home)/components/add-to-basket";

const ShopProductsCard = ({ product }: { product: ProductCardProps }) => {

  return (
    <div className="border rounded-lg shadow-sm relative max-w-[230px] mx-auto text-center cursor-pointer">
      <a href={`/shop/product/${product.id}`}>
        <Image
          src={product?.mainImageUrl || productImg}
          alt={product?.name}
          className="w-full h-[210px] object-cover rounded-t-lg"
          width={500}
          height={500}
        />
        <h2 className="font-bold mt-2 text-center truncate">{product?.name}</h2>
      </a>

      <div className="m-4">
        <div className="my-3">
          {product.price ? (
            <div className="flex items-center justify-center mt-1">
              <span className="text-red-500 font-bold text-lg">
                {product.price} ر.س
              </span>
              <span className="text-gray-400 line-through text-sm mx-2">
                {product.price - 20} ر.س
              </span>
            </div>
          ) : (
            <div className="mt-1 text-lg font-bold text-red-500">
              {product.price} ر.س
            </div>
          )}
        </div>

        <AddToBasket id={product.id} productInfo={
          {
            image: product.image,
            productName: product.name,
            price: product.price,
            oldPrice:  product.oldPrice
        }
        } />

      </div>
    </div>
  );
};

export default ShopProductsCard;
