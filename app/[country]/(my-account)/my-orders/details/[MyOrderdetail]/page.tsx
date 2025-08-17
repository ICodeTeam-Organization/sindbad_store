import React, { Suspense } from "react";
import PrintOrderBill from "../components/print-order-bill";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
import OrderDetailProductsTable from "../components/order-details-products-table";
import { FcPackage } from "react-icons/fc";
import { ApiResponseTypeForOrderDetails } from "../type";
import ReceiptCode from "../components/ReceiptCode";
import { convertToArabicDate } from "@/lib/timeFuns";
import { normalizeProduct } from "@/Data/mappers/productNormlizeMapper";
import BtnUpdateBond from "../components/BtnUpdateBond";

interface Detail {
  params: { MyOrderdetail: string };
}
const OrderDetail = async ({ params }: Detail) => {


  const OrderDetails = await getApi<ApiResponseTypeForOrderDetails>(
    `OrderDetails/Market/OrdersPage/GetOrderDetailsForViewInOrderDetailsPage?orderId=${params.MyOrderdetail}&pageNumber=1&pageSize=10`
  );
  if (!OrderDetails) return notFound();
  const data = OrderDetails.data;
 

  return (
    <Suspense 
      fallback={<div className="h-[50vh] items-center justify-center flex">
        <h1>جاري تحديث معلومات الطلب</h1>
      </div>}
    >
      <div className="xl:container mx-auto">
        {/* <BreadCrumb
        SecondName="طلباتي"
        SecondDir="/Orders"
        ThirdName="تفاصيل الطلب"
        ThirdDir=""
      /> */}
        <div className="mdHalf:m-10 m-5">
          <div className="">
            <div>
              <div className="flex items-center gap-x-2" >
                <FcPackage className="text-2xl" />
                <h1 className="font-bold text-sm" > معلومات الطلب </h1>
              </div>
              <div className=" text-sm mdHalf:flex flex-wrap gap-x-4 my-6 space-y-3 mdHalf:space-y-0 ">
                <div className="flex justify-between mdHalf:justify-start">
                  <p className="text-gray-600 ">رقم الطلب </p>
                  <p className="pr-3 font-bold text-gray-700">
                    {data.orderNumber}
                  </p>
                </div>
                <div className="flex justify-between mdHalf:justify-start">
                  <p className="text-gray-600 ">تاريخ الطلب </p>
                  <p className="pr-3 font-bold text-gray-700">
                    {convertToArabicDate(data.orderDate)}
                  </p>
                </div>
                <div className="flex justify-between mdHalf:justify-start">
                  <p className="text-gray-600 ">حالة الطلب </p>
                  <p className="pr-3 font-bold text-gray-700">
                    {data.orderStatus}
                  </p>
                </div>
                {data?.orderStatusNumber == 6 && <div className="flex justify-between mdHalf:justify-start">
                  <BtnUpdateBond orderId={+data.orderNumber} />
                </div>}
                <ReceiptCode receiptCode={data.receiptCode} />
              </div>
            </div>
          </div>
          <div className="flex mdHalf:flex-row flex-col-reverse gap-4 w-full" >
            <div className="lg:w-3/4 mdHalf:w-[65%]" >
              <OrderDetailProductsTable detail={data.pagedOrderDetails.items.map(normalizeProduct)} />
            </div>
            <div className="lg:w-1/4 mdHalf:w-[35%] " >
              <PrintOrderBill Bill={data} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default OrderDetail;
