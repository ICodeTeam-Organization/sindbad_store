import React from "react";
import Image from "next/image";
// import { LiaShoppingCartSolid } from "react-icons/lia";
import { IoMdHeartEmpty } from "react-icons/io";

interface StoreCardProps {
  image: string;
  title: string;
  description: string;
}

const StoreCard = ({
  image,
  title,
  description,
}: StoreCardProps) => {
  return (
    <div className="border rounded-lg shadow-sm relative w-[380px] h-[500px] mx-auto sm:mx-0 text-center">
      <Image
        src={image}
        alt={title}
        className="w-full h-[250] object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className=" font-bold mt-2 text-center">{title}</h2>
        <p className="text-gray-extr-light mt-2">{description}</p>
        <div className="flex justify-evenly w-full mt-6 px-6 hover:text-white ">
          <button className="w-[90px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center">
             المتجر
          </button>
          <button className="w-[90px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center">
             الصور
          </button>
          <button className="w-[90px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center">
             متجر المحل
          </button>
          <button className="w-[40px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center">
            <IoMdHeartEmpty className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;