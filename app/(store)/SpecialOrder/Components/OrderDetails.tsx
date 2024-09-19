import { Textarea } from "@/components/ui/textarea";
import React from "react";
import DropZone from "./DropZone";
import Quantity from "./Quantity";

type props = {
  classname?: string;
};
const OrderDetails = ({ classname }: props) => {
  return (
    <div
      className={
        classname +
        " border-2 w-1/2 max-md:w-full max-md:m-4 py-2 px-4 grid grid-cols-4 text-end"
      }
    >
      <p className="text-nowrap ml-2 my-1 max-lg:text-[10px] max-md:text-nowrap">
        المنتج المطلوب :
      </p>
      <input
        className="border w-full rounded-sm col-span-3 my-1 p-2"
        type="text"
      />

      <p className="text-nowrap ml-2 my-1 max-lg:text-xs max-md:text-nowrap">
        تفاصيل أكثر :
      </p>
      <Textarea className="col-span-3 my-1" />
      {classname ? 
      <div className="col-span-4 flex justify-start items-center mr-24 my-2">
        <p className=" ml-2">الكمية المطلوبة</p>

        <Quantity classname="" />
      </div> : null}
      <p className="text-nowrap ml-2 my-3 max-lg:text-xs max-md:text-nowrap">
        رابط :
      </p>
      <input
        className="border w-full rounded-sm col-span-3 my-3 p-2"
        type="text"
      />
      <p className="text-nowrap ml-2 my-3 max-lg:text-xs max-md:text-nowrap">
        الصور
      </p>
      <DropZone />
    </div>
  );
};

export default OrderDetails;
