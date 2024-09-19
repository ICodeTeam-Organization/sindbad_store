import { Card } from "@/components/ui/card";
import Dropdown from "./Dropdown";
import { HiMinusSm } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import OrderDetails from "./OrderDetails";
import Quantity from "./Quantity";

const MyNewOrder = () => {
  

  return (
    <Card className="rounded-none border-black p-6">
      <div className="flex justify-around items-center border m-auto border-black  py-2">
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">نوع الطلب</h1>
          <Dropdown name="منتج" />
        </div>
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">الفئة الرئيسية :</h1>
          <Dropdown name="" />
        </div>
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">الفئة الفرعية :</h1>
          <Dropdown />
        </div>
      </div>
      <div className="flex justify-around items-center max-md:flex-col mt-3">
        <div>
          <div className="flex items-center justify-around mb-3">
            <p>الكمية المطلوبة</p>
            <Quantity/>
          </div>
          <div className="bg-[#C0C0C0] p-4 m-auto my-4">
            <div className="flex justify-end items-center m-auto my-2">
              <h1 className="max-sm:text-[10px]">رقم الطلب :</h1>
              <div className="bg-[#C8C8C8] rounded-sm text-center w-32 mr-2">
                <strong>555</strong>
              </div>
            </div>
            <div className="flex justify-end items-center m-auto my-2">
              <h1 className="max-sm:text-[10px]">تاريخ الطلب :</h1>
              <div className="bg-[#C8C8C8] rounded-sm text-center w-32 mr-2 ">
                <strong>555</strong>
              </div>
            </div>
            <div className="flex justify-end items-center m-auto my-2">
              <h1 className="max-sm:text-[10px]">السعر :</h1>
              <div className="bg-white rounded-sm text-center w-32 mr-2 ">
                <strong>555</strong>
              </div>
            </div>
            <div className="flex justify-end items-center m-auto my-2">
              <h1 className="max-sm:text-[10px]">الإجمالي :</h1>
              <div className="bg-white rounded-sm text-center w-32 mr-2 ">
                <strong>555</strong>
              </div>
            </div>
            <div className="flex justify-end items-center m-auto my-2">
              <h1 className="max-sm:text-[10px]">حالة الطلب :</h1>
              <div className="bg-[#C8C8C8] rounded-sm text-center w-32 mr-2 ">
                <strong>555</strong>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button className="w-24-ctext-center w-32 m-auto h-8 mt-4 bg-green-700">
                قبول
              </Button>
              <Button className="w-24-ctext-center w-32 m-auto h-8 mt-4 bg-red-700">
                رفض
              </Button>
            </div>
          </div>
        </div>
        <OrderDetails/>
      </div>
    </Card>
  );
};

export default MyNewOrder;
