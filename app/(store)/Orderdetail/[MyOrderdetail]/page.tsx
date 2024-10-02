import React from "react";
import Orderdetails from "../Components/Orderdetails";
import PrintOrderBill from "../Components/PrintOrderBill";
import BreadCrumb from "@/components/BreadCrumb";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";

interface Detail {
  params: { MyOrderdetail: string, orderNumber:string};
}
const OrderDetail = async ({params}: Detail) => {
  const OrderDetails = await getApi<any>(
    `Orders/Market/OrdersPage/TrackOrder?orderId=${params.MyOrderdetail}`
  );
  if (!OrderDetails) return notFound();
  const data = OrderDetails.data;
  console.log(params);
  return (
    <>
      <BreadCrumb
        SecondName="طلباتي"
        SecondDir="/Orders"
        ThirdName="تفاصيل الطلب"
        ThirdDir=""
      />
      <div className="m-auto my-16">
        <div className="mx-8 m-auto rounded-sm py-3 mt-6">
          <div className="flex justify-between items-center border-2 p-3 max-md:text-xs text-lg">
            <div className="flex max-sm:flex-wrap justify-center m-auto">
              <p className="text-gray-600">رقم الطلب :</p>
              <p className="pr-3 font-bold text-gray-700">{params.orderNumber}</p>
            </div>
            <div className="flex max-sm:flex-wrap  justify-between items-center m-auto">
              <p className="text-gray-600">تاريخ الطلب :</p>
              <p className="pr-3 font-bold text-gray-700">15/10/2024</p>
            </div>
            <div className="flex max-sm:flex-wrap  justify-start items-center m-auto">
              <p className="text-gray-600">حالة الطلب :</p>
              <p className="pr-3 font-bold text-gray-700">في الطريق</p>
            </div>
          </div>
          <Orderdetails />
        </div>
      </div>
      <PrintOrderBill />
    </>
  );
};

export default OrderDetail;
