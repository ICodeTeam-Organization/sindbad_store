import React from "react";
import Image from "next/image";
import { StoreCardProps } from "../typest";
import { IoMdHeartEmpty } from "react-icons/io";

const StoreCard = ({ id, name, imagesUrl }: StoreCardProps) => {
  const storeImage = imagesUrl.length > 0 ? imagesUrl[0] : '';
  // const storeImage = imagesUrl[0] ;

  return (
    <a
      href={`/stores/storeDetails/${id}`}
      className="border rounded-lg shadow-sm relative w-full max-w-[380px] mx-auto text-center"
    >
      <Image
        src={storeImage}
        alt={name}
        className="w-full h-[250px] object-cover rounded-lg"
        width={380}
        height={250}
      />
      <div className="m-4">
        <h2 className="font-bold mt-2 text-center">{name}</h2>
        <div className="flex flex-wrap justify-evenly items-center w-full mt-6 px-4">
          <button className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            المتجر
          </button>
          <button className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            الصور
          </button>
          <button className="flex-1 min-w-[80px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            متجر المحل
          </button>
          <button className="flex-1 min-w-[40px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            <IoMdHeartEmpty className="w-4 h-4" />
          </button>
        </div>
      </div>
    </a>
  );
};

export default StoreCard;
