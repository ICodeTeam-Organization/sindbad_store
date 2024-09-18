import { Card } from "@/components/ui/card";
import Dropdown from "./Dropdown";
import { HiMinusSm } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DropZone from "./DropZone";

const MyNewOrder = () => {
  const [Quantity, setQuantity] = useState(1);

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
            <div
              className={
                Quantity === 1
                  ? "flex items-center bg-gray-200 w-16"
                  : `flex items-center bg-gray-200 w-24`
              }
            >
              <IoMdAdd
                onClick={() => setQuantity(Quantity + 1)}
                className="cursor-pointer m-auto"
              />
              <span className="text-center w-8 bg-white  border-y">
                {Quantity}
              </span>
              {Quantity === 1 ? null : (
                <HiMinusSm
                  onClick={() => setQuantity(Quantity - 1)}
                  className="cursor-pointer m-auto "
                />
              )}
            </div>
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
        <div className="border-2 w-1/2 max-md:w-full max-md:m-4 py-2 px-4 grid grid-cols-4 text-end">
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
      </div>
    </Card>
  );
};

export default MyNewOrder;
