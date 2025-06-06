import React from "react";
import { Button } from "@/components/ui/button";
interface SpecialProduct {
  id?: number;
  requiredProductName?: string;
  moreDetailsAboutProduct?: string;
  linkUrl?: string;
  specialProductImageForViews?: Array<{
    imageUrl: string;
    id: number;
  }>;
  specialProductType?: string;
  shippingCost?: number;
  price?: number;
  totalPrice?: number;
  quantity?: number;
  specialProductStatus?: string;
  createdate?: string; 
}

interface OrderDetailsProps {
  OrderDetails: SpecialProduct;
  DisplayPrice?: string; 
  DisplayButton?: string; 
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ OrderDetails, DisplayPrice, DisplayButton }) => {
  
  return (
    <div className="block lg:flex gap-2  border-2  my-2">
      {<div className={DisplayPrice}>
        {/* <div className="flex items-center justify-around mb-3">
          <p>الكمية المطلوبة</p>
          <Quantity />
        </div> */}
        <div className="p-4 m-auto ">
          <div className="flex  items-center m-auto my-2">
            <h1 className="max-sm:text-[10px]">رقم الطلب :</h1>
            <div className=" rounded-sm text-center w-32 mr-2">
              <strong>{OrderDetails?.id}</strong>
            </div>
          </div>
          {/* <div className="flex  items-center m-auto my-2">
            <h1 className="max-sm:text-[10px]">تاريخ الطلب :</h1>
            <div className=" rounded-sm text-center w-32 mr-2 ">
              <strong>555</strong>
            </div>
          </div> */}
          <div className="flex  items-center m-auto my-2">
            <h1 className="max-sm:text-[10px]">السعر :</h1>
            <div className="bg-white rounded-sm text-center w-32 mr-2 ">
              <strong>{OrderDetails?.price}</strong>
            </div>
          </div>
          <div className="flex  items-center m-auto my-2">
            <h1 className="max-sm:text-[10px]">الإجمالي :</h1>
            <div className="bg-white rounded-sm text-center w-32 mr-2 ">
              <strong>{OrderDetails?.totalPrice}</strong>
            </div>
          </div>
          {/* <div className="flex  items-center m-auto my-2">
            <h1 className="max-sm:text-[10px]">حالة الطلب :</h1>
            <div className=" rounded-sm text-center w-32 mr-2 ">
              <strong>555</strong>
            </div>
          </div> */}
          <div className={DisplayButton + " flex justify-between items-center"}>
            <Button className="w-24-ctext-center w-32 m-auto h-8 mt-4 bg-green-700">
              قبول
            </Button>
            <Button className="w-24-ctext-center w-32 m-auto h-8 mt-4 bg-red-700">
              رفض
            </Button>
          </div>
        </div>
      </div>
      }

      <div
        className={

          " max-md:w-full max-md:m-4 py-2 px-4 grid grid-cols-4 "
        }
      >
        <p className="text-nowrap ml-2 my-1 max-lg:text-[14px] max-md:text-nowrap">
          المنتج المطلوب :
        </p>
        {/* <input
        className="border w-full rounded-sm col-span-3 my-1 p-2"
        type="text"
      /> */}
        <span className="border w-full rounded-sm col-span-3 my-1 p-2">
          {OrderDetails?.requiredProductName}
        </span>

        <p className="text-nowrap ml-2 my-1 max-lg:text-[14px] max-md:text-nowrap">
          نوع المنتج :
        </p>

        <span className="border w-full rounded-sm col-span-3 my-1 p-2">
          {OrderDetails?.specialProductType}
        </span>

        <p className="text-nowrap ml-2 my-1  max-md:text-nowrap">
          تفاصيل أكثر :
        </p>
        <span className="border w-full rounded-sm col-span-3 my-1 p-2">
          {OrderDetails?.moreDetailsAboutProduct}
        </span>

        {/* {classname ? 
      <div className="col-span-4 flex justify-start items-center mr-24 my-2">
        <p className=" ml-2">الكمية المطلوبة</p>

        <Quantity classname="" />
      </div> : null} */}
        <p className="text-nowrap ml-2 my-3  max-md:text-nowrap">
          الكمية :
        </p>
        <span className="border w-full rounded-sm col-span-3 my-1 p-2">
          {OrderDetails?.quantity}
        </span>

        <p className="text-nowrap ml-2 my-3  max-md:text-nowrap">
          رابط :
        </p>
        <span className="border w-full rounded-sm col-span-3 my-1 p-2">
          {OrderDetails?.linkUrl}
        </span>

        <p className="text-nowrap ml-2 my-3  max-md:text-nowrap">
          تاريخ الطلب :
        </p>
        <span className="border w-full rounded-sm col-span-3 my-1 p-2">
          {OrderDetails?.createdate}
        </span>

        <p className="text-nowrap ml-2 my-3  max-md:text-nowrap">
          حالة الطلب :
        </p>
        <span className="border w-full rounded-sm col-span-3 my-1 p-2">
          {OrderDetails?.specialProductStatus}
        </span>

        <p className="text-nowrap ml-2 my-3  max-md:text-nowrap">
          الصور
        </p>
        <div className="flex w-max">
          {
            OrderDetails?.specialProductImageForViews?.map((image, index) => (
              <div key={index} className="w-[150px] h-[150px] m-2">
                <img
                  src={image.imageUrl}
                  alt={image.imageUrl}
                  className="w-full  h-full object-cover rounded-lg border"
                  width={50}
                  height={50}
                />
              </div>
            ))
          }

        </div>
        {/* <DropZone /> */}
      </div>

    </div>

  );
};

export default OrderDetails;
