import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SpecialOrderFormValue,
  SpecialOrderFromEcommerce_FormValue,
  specialOrderSchema,
  SpecialProductAndServiceOrderForm_FormValue,
} from "../utils/zod-schema";

import { IoClose } from "react-icons/io5";

import SpecialProductOrderForm from "./SpecialOrderFormsTypes/SpecialProductOrderForm";
import SpecialServiceOrderForm from "./SpecialOrderFormsTypes/SpecialServiceOrderForm";
import SpecialOrderFromShopForm from "./SpecialOrderFormsTypes/SpecialOrderFromShopForm";

interface Props {
  index: number;
  initOrderType?: number;
  initCategory?: number;
  ordersNumber?: number;
  
  onChangeValues: (
    values:
      | SpecialOrderFromEcommerce_FormValue
      | SpecialProductAndServiceOrderForm_FormValue,
    isValid: boolean
  ) => void;
}

function SpecialOrderFormCard({ initOrderType,index, onChangeValues,ordersNumber }: Props) {
  const tabs = [
    { id: 1, label: "منتج" },
    { id: 2, label: "خدمة" },
    { id: 3, label: "رابط متجر" },
  ];
  const [curentTab, setCurentTab] = useState(initOrderType || 1);

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
          <div className="text-lg hover:bg-gray-200 rounded-full duration-200 cursor-pointer p-1">
            <IoClose />
          </div>
        </div>
      </div>
      {/* one of this Forms will be change حسب النوع */}
      <div>
        {curentTab == 1 && (
          <SpecialProductOrderForm
            index={index}
            onChange={(e, isValid) => {
              onChangeValues(e, isValid);
            }}
          />
        )}
        {curentTab == 2 && (
          <SpecialServiceOrderForm
          index={index}
            onChange={(e, isValid) => {
              onChangeValues(e, isValid);
            }}
          />
        )}
        {curentTab == 3 && (
          <SpecialOrderFromShopForm
          index={index}
            onChange={(e, isValid) => {
              console.log(e);
              
              onChangeValues(e, isValid);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SpecialOrderFormCard;
