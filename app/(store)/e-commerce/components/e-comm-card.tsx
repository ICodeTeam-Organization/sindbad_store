import React from "react";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { E_commerceCardProps } from "../types";
import alibaba from '../../../../public/images/alibaba.svg';

const E_commerceCard = ({ eCommerce}:{eCommerce : E_commerceCardProps}) => {
  return (
    <div className="border rounded-lg shadow-sm relative w-full max-w-[380px] mx-auto text-center">
      <Image
        src={eCommerce?.imagesUrl[0] || alibaba}
        alt={eCommerce?.name}
        className="w-full h-[250px] object-cover rounded-lg"
        width={500}
        height={500}
      />
      <div className="m-4">
        <h2 className="font-bold mt-2 text-center">{eCommerce?.name}</h2>
        <p className="text-gray-extr-light mt-2">{
          eCommerce?.storeCategories?.map((category:any ) =>{
            return `${category} - ` 
          })
          }</p>
        <div className="flex flex-wrap justify-evenly items-center w-full mt-6 px-4">
          <button className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            الانتقال للمتجر
          </button>
          <button className="flex-1 min-w-[70px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            كوبون الخصم
          </button>
          <button className="flex-1 min-w-[40px] h-[30px] border border-gray text-black text-base rounded-md flex justify-center items-center mx-1">
            <IoMdHeartEmpty className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default E_commerceCard;
