
import { cn } from "@/lib/utils";

import {
    SpecialBulkOrderFormValues,
  SpecialOrderFromEcommerce_FormValue,
  SpecialProductAndServiceOrderForm_FormValue,
} from "../utils/zod-schema";
import { IoClose } from "react-icons/io5";

import SpecialProductOrderForm from "./SpecialOrderFormsTypes/SpecialProductOrderForm";
import SpecialServiceOrderForm from "./SpecialOrderFormsTypes/SpecialServiceOrderForm";
import SpecialOrderFromShopForm from "./SpecialOrderFormsTypes/SpecialOrderFromShopForm";
import { useState } from "react";

interface Props {
  index: number;
  initCategory?: number;
  ordersNumber?: number;
  onChangeValues: (
    values: | SpecialBulkOrderFormValues,
    isValid: boolean
  ) => void;
  onDeleteOrderForm: (
  ) => void;
}

function SpecialBulkOrderForms({index, onChangeValues,ordersNumber,onDeleteOrderForm }: Props) {
  const tabs = [
    { id: 4, label: "من السعودية" },
    { id: 5, label: "من خارج السعودية" },
  ];
  const [curentTab, setCurentTab] = useState(4);

  return (
    <div className="shadow-lg p-4 rounded-md border tajawal my-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                " tajawal font-bold px-4 py-1 border cursor-pointer text-gray-700 duration-200 rounded-full text-[12px]",
                curentTab === tab.id && "bg-[#FFF6EB] text-black border-black"
              )}
              onClick={() => {
                setCurentTab(tab.id);
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div className="flex text-sm items-center  gap-x-4">
          <p className="text-xs bg-gray-200 rounded p-1 px-4"> الرقم {index+1} من {ordersNumber} </p>
          <div onClick={()=>{
            console.log("ggggggggggggggggggggggggggggggggg");
            
          }} className="text-lg hover:bg-gray-200 rounded-full duration-200 cursor-pointer p-1">
            <IoClose />
          </div>
        </div>
      </div>
      <div>
          <SpecialProductOrderForm
            index={index}
            onChange={(e, isValid) => {
              // لانه طلب خاصه جملة
              e.type = 4;
              onChangeValues(e, isValid);
            }}
          />
      </div>
    </div>
  );
}

export default SpecialBulkOrderForms;
