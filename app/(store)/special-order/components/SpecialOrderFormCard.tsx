import React, { useState } from "react";

import { cn } from "@/lib/utils";

import {
  SpecialOrderFromEcommerce_FormValue,
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
  orderKey: string;
  onChangeValues: (
    values:
      | SpecialOrderFromEcommerce_FormValue
      | SpecialProductAndServiceOrderForm_FormValue,
    isValid: boolean
  ) => void;
  onOrderDelete: (orderKey: string) => void;
  orderslength: number;
}

function SpecialOrderFormCard({
  initOrderType,
  index,
  onChangeValues,
  ordersNumber,
  onOrderDelete,
  orderKey,
  orderslength,
  initCategory,
}: Props) {
  const tabs = [
    { id: 1, label: "منتج" },
    { id: 2, label: "خدمة" },
    { id: 3, label: "رابط متجر" },
  ];
  const [curentTab, setCurentTab] = useState(initOrderType || 1);

  return (
    <div className="shadow-lg p-4 rounded-md border tajawal my-4">
      <div className="mb-4 mdHalf:flex flex-row-reverse flex-wrap mdHalf:justify-between justify-center items-center">
        <div className="flex text-sm items-center mdHalf:justify-center justify-between   gap-x-4">
          <p className="text-xs bg-gray-200 rounded p-1 px-4">
            {" "}
            الرقم {index + 1} من {ordersNumber}{" "}
          </p>
          {orderslength > 1 && (
            <div
              onClick={() => {
                onOrderDelete(orderKey);
              }}
              className="text-lg hover:bg-gray-200 rounded-full duration-200 cursor-pointer p-1"
            >
              <IoClose />
            </div>
          )}
        </div>
        <div className="flex  items-center gap-2 mdHalf:mt-0 mt-4">
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
      </div>
      {/* one of this Forms will be change حسب النوع */}
      <div>
        {curentTab == 1 && (
          <SpecialProductOrderForm
            category={initCategory}
            orderKey={orderKey}
            onChange={(e, isValid) => {
              console.log(e);
              
              onChangeValues(e, isValid);
            }}
          />
        )}
        {curentTab == 2 && (
          <SpecialServiceOrderForm
            category={initCategory}
            orderKey={orderKey}
            onChange={(e, isValid) => {
              onChangeValues(e, isValid);
            }}
          />
        )}
        {curentTab == 3 && (
          <SpecialOrderFromShopForm
            category={initCategory}
            orderKey={orderKey}
            onChange={(e, isValid) => {
              onChangeValues(e, isValid);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SpecialOrderFormCard;
