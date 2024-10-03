import Link from "next/link";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
import React from "react";

const MyOrders = async () => {
  const Orders = await getApi<any>(
    "Orders/Market/OrdersPage/GetAllCustomerOrdersForViewInOrdersPage"
  );
  if (!Orders) return notFound();
  return (
    <>
      <div className="grid grid-cols-5 text-center items-center font-bold w-full text-gray-600">
        <h1 className="bg-gray-200 py-1 border-t-2 border-b-2 w-full">
          المنتجات
        </h1>
        <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">قيمة الطلب</h1>
        <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">التاريخ</h1>
        <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">حالته</h1>
        <h1 className="bg-gray-200 py-1 border-t-2 border-b-2">تتبع</h1>
      </div>
      {/* fetch api from here */}
      {Orders.data.map((itm: any) => (
        <div
          key={itm.id}
          className="grid grid-cols-5 text-center items-center font-bold w-full"
        >
          <h1 className="text-center line-clamp-3 px-3 max-md:text-[10px] max-md:line-clamp-4 mt-9">
            <Link href={`/Orderdetail/${itm.id}`}>{itm.orderNumber}</Link>
          </h1>
          <h1 className="m-auto text-gray-500 px-3 line-clamp-3 text-right max-md:text-xs max-md:line-clamp-4 mt-9">
            {itm.totalPrice}
          </h1>
          <h1 className="m-auto px-3 line-clamp-3 max-sm:text-[9px] mt-9">
            {new Date(itm.orderDate).toLocaleDateString("ar")}
          </h1>
          <h1 className="m-auto mt-9 line-clamp-3 text-blue-400 max-sm:text-xs">
            {itm.orderStatus}
          </h1>
          <h1 className="m-auto mt-9 line-clamp-3 text-blue-400 max-sm:text-xs">
            <Link href={`/OrderTrack/${itm.id}`}>تتبع الطلب</Link>
          </h1>
        </div>
      ))}
    </>
  );
};

export default MyOrders;
