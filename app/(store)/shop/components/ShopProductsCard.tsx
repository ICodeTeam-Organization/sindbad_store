import React from "react";
import Image from "next/image";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { IoMdHeartEmpty } from "react-icons/io";
import { ProductCardProps } from "../types";

const ShopProductsCard = ({ image, title, price, oldPrice }: ProductCardProps) => {
  return (
    <div className="border rounded-lg shadow-sm relative max-w-[230px] mx-auto text-center">
      <Image
        src={image}
        alt={title}
        className="w-full h-[210px] object-cover rounded-t-lg"
      />
      <div className="m-4">
        <h2 className="font-bold mt-2 text-center truncate">{title}</h2>
        <div className="mt-2">
          {oldPrice ? (
            <div className="flex items-center justify-center mt-1">
              <span className="text-red-500 font-bold text-lg">{price} ر.س</span>
              <span className="text-gray-400 line-through text-sm mx-2">
                {oldPrice} ر.س
              </span>
            </div>
          ) : (
            <div className="mt-1 text-lg font-bold text-red-500">{price} ر.س</div>
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
    </div>
  );
};

export default ShopProductsCard;
