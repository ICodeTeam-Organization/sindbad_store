import Image from "next/image";
import Stores from "@/public/images/Stores.svg";
import React from "react";
import { number, string } from "zod";

type Detail = {
  detail: {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
};

const Orderdetails = ({ detail }: Detail) => {
  return (
    <>
      <div className="grid grid-cols-6 text-center items-center font-bold w-full text-gray-600">
        <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 w-full col-span-3 text-xl max-sm:text-sm text-right pr-5">
          المنتجات
        </h1>
        <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 text-xl max-sm:text-sm">
          السعر
        </h1>
        <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 text-xl max-sm:text-sm">
          الكمية
        </h1>
        <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 text-xl max-sm:text-sm">
          الاجمالي
        </h1>
      </div>
      <div>
        {/* fetch api from here */}
        {detail.map((details: any) => (
          <div
            key={details.productId}
            className="grid grid-cols-6 text-center items-center font-bold w-full text-gray-600"
          >
            <div className="flex items-center text-right px-3 max-md:text-xs  mt-9 col-span-3">
              <Image
                src={details.imageUrl}
                alt={details.productName}
                width={50}
                height={0}
              />
              <h1 className=" pr-3 line-clamp-3 mr-3">{details.productName}</h1>
            </div>
            <h1 className="m-auto px-3 line-clamp-3 max-sm:text-xs mt-9">
              {details.price}$
            </h1>
            <h1 className="m-auto mt-9 line-clamp-3 max-sm:text-xs">
              {details.quantity}
            </h1>
            <h1 className="m-auto mt-9 line-clamp-3 max-sm:text-xs">
              {details.price * details.quantity}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orderdetails;
