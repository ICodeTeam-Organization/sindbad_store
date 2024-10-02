import Image from "next/image";
import Notebook from "@/public/images/Notebook.svg";
import Package from "@/public/images/Package.svg";
import Handshake from "@/public/images/Handshake.svg";
import Truck from "@/public/images/Truck.svg";
import doubletrue from "@/public/images/doubletrue.svg";
import profile from "@/public/images/profile.svg";
import location from "@/public/images/location.svg";
import requestAvailable from "@/public/images/requestAvailable.svg";
import isTrue from "@/public/images/isTrue.svg";
import date from "@/public/images/date.svg";
import Progresses from "../components/Progresses";
import { getApi } from "@/lib/http";
import { notFound } from "next/navigation";
import BreadCrumb from "@/components/BreadCrumb";
import React from "react";
interface OrderTrack {
  params: { MyOrderTrack: string };
}
const page = async ({ params }: OrderTrack) => {
  const OrderTrack = await getApi<any>(
    `Orders/Market/OrdersPage/TrackOrder?orderId=${params.MyOrderTrack}`
  );
  if (!OrderTrack) return notFound();
  const data = OrderTrack.data;
  console.log(OrderTrack);

  return (
    <>
      <BreadCrumb
        SecondName="طلباتي"
        SecondDir=""
        ThirdName="تفاصيل الطلب"
        ThirdDir=""
      />
      <div className="m-auto border-2 w-10/12 p-4 my-6 rounded-sm">
        {/* Order info */}
        <div className="bg-yellow-50 border-yellow-100 border-2 flex justify-between items-center m-auto p-4">
          <div>
            <h1 className="font-bold">#{data.id}</h1>
            <div className="flex justify-end text-gray-500 text-center">
              <p>
                منتجات <span>{data.numOfOrderDetails}</span>
              </p>
              <span className="mx-2">•</span>
              <p>
                تاريخ الطلب : <span>{data.orderDate}</span>
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-blue-400 max-md:text-lg max-md:mb-14">
            {data.totalPrice}ر.س
          </h1>
        </div>

        <div className="mt-3">
          <h1>Order expected arrival 23 Jan, 2021</h1>
          <Progresses progress={data.orderStatus} />

          {/* Progress details */}
          <div className="grid grid-cols-4 justify-items-center mt-3">
            <div className="m-auto grid justify-items-center">
              <Image src={Notebook} alt="Notebook" />
              <h1>استلام الطلب</h1>
            </div>
            <div className="m-auto grid justify-items-center">
              <Image src={Package} alt="Notebook" />
              <h1>تم الشحن</h1>
            </div>
            <div className="m-auto grid justify-items-center">
              <Image src={Truck} alt="Notebook" />
              <h1>وصول الطلب</h1>
            </div>
            <div className="m-auto grid justify-items-center">
              <Image src={Handshake} alt="Notebook" />
              <h1>تم تسليمه</h1>
            </div>
          </div>
        </div>
        <br />
        <hr />
        {/* مراحل طلبك  */}
        <div className="py-4">
          <h1 className="text-xl">مراحل تنفيذ طلبك</h1>
          <div className="flex mt-4">
            <Image src={doubletrue} alt={""} />
            <div className="mr-4">
              <p className="text-lg">تم تسليم طلبك</p>
              <p className="text-xs text-gray-500 mt-0.5">{data.approvedAt}</p>
            </div>
          </div>
          <div className="flex mt-4">
            <Image src={profile} alt={""} />
            <div className="mr-4">
              <p className="text-lg">وصول طلبك الى منطقة التوزيع</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {data.arrivedAtDistributionArea}
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <Image src={location} alt={""} />
            <div className="mr-4">
              <p className="text-lg">تم شحن طلبك</p>
              <p className="text-xs text-gray-500 mt-0.5">{data.deliveredAt}</p>
            </div>
          </div>
          <div className="flex mt-4">
            <Image src={requestAvailable} alt={""} />
            <div className="mr-4">
              <p className="text-lg">تم توفير طلبك للشحن</p>
              <p className="text-xs text-gray-500 mt-0.5">{data.deliveredAt}</p>
            </div>
          </div>
          <div className="flex mt-4">
            <Image src={isTrue} alt={""} />
            <div className="mr-4">
              <p className="text-lg">تم تأكيد سند الاستلام</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {data.bondConfirmedAt}
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <Image src={date} alt={""} />
            <div className="mr-4">
              <p className="text-lg">تم استلام طلبك</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {data.arrivedToCustomerAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
