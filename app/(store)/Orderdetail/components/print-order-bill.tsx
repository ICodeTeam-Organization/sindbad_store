"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintOrderBill = ({ Bill }: any) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handlePrint = () => {
    reactToPrintFn();
  };
  return (
    <div
      ref={contentRef}
      className="text-center border-2 lg:w-1/3 max-md:w-full md:w-full m-auto mb-9 rounded-sm py-3 mt-6 text-xl max-md:text-lg pr-2 font-bold"
    >
      <h1>تفاصيل قيمة الطلب</h1>
      <div className="mt-4 mb-2">
        <div className="flex">
          <p className="text-gray-600">المجموع :</p>
          <p className="">{Bill.totalOrderDetailsPrice} ر.س</p>
        </div>
        <div className="flex">
          <p className="text-gray-600">الشحن :</p>
          <p className="mr-3">{Bill.totalShipCost} ر.س</p>
        </div>
        <div className="flex">
          <p className="text-gray-600">الخصم :</p>
          <p className="mr-3">{Bill.totalDiscount} ر.س</p>
        </div>
      </div>
      <hr className="w-1/2" />
      <div className="flex justify-around items-center mt-2">
        <div className="flex items-center justify-between">
          <p>الإجمالي:</p>
        <p className="mr-3">{Bill.totalPrice} ر.س</p>
        </div>
        <button
          onClick={handlePrint}
          className="bg-primary-background print:hidden text-white py-2 px-3 rounded-sm hover:bg-orange-600 transition-all duration-700"
        >
          تصدير PDF
        </button>
      </div>
    </div>
  );
};

export default PrintOrderBill;
