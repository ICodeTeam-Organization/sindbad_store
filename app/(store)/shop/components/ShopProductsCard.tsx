import React from "react";
import Image from "next/image";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { IoMdHeartEmpty } from "react-icons/io";
import productImg from "../../../../public/images/productImg.svg";

import { ProductCardProps } from "../types";

const ShopProductsCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <a
      href={`/shop/productDetils/${product.id}`}
      className="border rounded-lg shadow-sm relative max-w-[230px] mx-auto text-center cursor-pointer"
    >
      <Image
        src={product?.mainImageUrl || productImg}
        alt={product?.name}
        className="w-full h-[210px] object-cover rounded-t-lg"
        width={500}
        height={500}
      />
      <div className="m-4">
        <h2 className="font-bold mt-2 text-center truncate">{product?.name}</h2>
        <div className="mt-2">
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
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 ">
          <button className="min-w-[160px] h-[40px] border border-gray text-black text-base rounded-md flex justify-center items-center mb-2 md:mb-0">
            <LiaShoppingCartSolid className="w-4 h-4 mr-2" />
            <p>اضف للسلة</p>
          </button>
          <button className="min-w-[40px] h-[40px] border border-gray text-black text-base rounded-md flex justify-center items-center">
            <IoMdHeartEmpty className="w-4 h-4" />
          </button>
        </div>
      </div>
    </a>
  );
};

export default ShopProductsCard;
