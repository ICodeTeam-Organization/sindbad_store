
import { cn } from "@/lib/utils";

import {
    SpecialWholesalesOrderFormValues,

} from "../utils/zod-schema";
import { IoClose } from "react-icons/io5";


import { useState } from "react";
import SpecialWholesalesOrderForms from "./SpecialWholesalesOrderForms";

interface Props {
  index: number;
  initCategory?: number;
  ordersNumber?: number;
  onChangeValues: (
    values: | SpecialWholesalesOrderFormValues,
    isValid: boolean
  ) => void;
  onDeleteOrderForm: (
  ) => void;
  orderKey:string,
  orderFrom:number; 
}

function SpecialWholesalesOrderFormCard({index, orderFrom = 200,ordersNumber,onDeleteOrderForm,orderKey ,onChangeValues}: Props) {
  const orderFromTabs = [
    { id: 200, label: "من السعودية" },
    { id: 100, label: "من خارج السعودية" },
  ];
  const [curentTab, setCurentTab] = useState(orderFrom);

  return (
    <div className="shadow-lg p-4 rounded-md border tajawal my-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {orderFromTabs.map((tab) => (
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
         {ordersNumber && ordersNumber > 1 && <div onClick={onDeleteOrderForm} className="text-lg hover:bg-gray-200 rounded-full duration-200 cursor-pointer p-1">
            <IoClose />
          </div>}
        </div>
      </div>
      <div>
          <SpecialWholesalesOrderForms
            orderFrom={curentTab}
            orderKey={orderKey}
            onChange={(e, isValid) => {
              onChangeValues(e, isValid);
            }}
          />
      </div>
    </div>
  );
}

export default SpecialWholesalesOrderFormCard;
