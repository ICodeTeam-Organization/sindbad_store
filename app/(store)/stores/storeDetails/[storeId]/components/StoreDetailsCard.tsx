import React from "react";
import Image from "next/image";
import { StoreCardProps } from "../../../typest";
import { IoMdHeartEmpty } from "react-icons/io";

const StoreDetailsCard = ({ image, title, description }: StoreCardProps) => {
  return (
    <div className="border px-12 py-6 rounded-lg shadow-sm relative w-full  m-auto text-center">
      <Image
        src={image}
        alt={title}
        className="w-full h-[400px] object-cover rounded-lg"
      />
      <div className="m-4">
        <h2 className="font-bold mt-2 text-center">{title}</h2>
        <p className="text-gray-extr-light mt-2">{description}</p>
        <div className="flex flex-wrap justify-evenly items-center w-full mt-6 px-4">
          <button className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            المتجر
          </button>
          <button className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            الصور
          </button>
          <button className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            متجر المحل
          </button>
          <button className="flex-1 min-w-[40px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            <IoMdHeartEmpty className="w-4 h-4 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsCard;