 
import React from "react";
import Progresses from "../components/Progresses";
import { getApi } from "@/lib/http";
import { OrderTrackResponseType } from "@/types/storeTypes";
import { notFound } from "next/navigation";
import Link from "next/link";
import { convertToArabicDate } from "@/lib/timeFuns";
import { get_currency_key } from "@/lib/cookie/cookie.clients";
import CircularProgress from "@/components/CircleSlider";
import OrderTrackSteps from "../components/OrderTrackSteps";


const OrderTrack = async ({ params }: { params: { MyOrderTrack: string } }) => {



  const orderId = +params?.MyOrderTrack;

  if (!orderId) {
    return notFound();
  }

  const OrderTrack = await getApi<OrderTrackResponseType>(
    `Orders/${orderId}/Track`
  );

  if (!OrderTrack?.success) {
    return notFound();
  }
  const orderData = OrderTrack.data; 
  return (
    <div className="bg-bg-50">

      <div className="m-auto  p-4  xl:container  mx-auto  rounded-sm">
        {/* Order info */}
        <div className="bg-white shadow-sm rounded-md  m-auto p-4">
          <div className=" flex flex-wrap justify-between items-center gap-x-4 " >
            <div className="flex items-center max-sm:justify-center max-sm:w-full gap-x-6 max-sm:flex-col">

              <div className="p-10 max-sm:hidden">
                <CircularProgress
                  max={5}
                  size={80}
                  value={orderData.orderStatusNumber}
                  color="#ffb700"
                  strokeWidth={4}
                >
                  <span className="text-xl font-bold  ">
                    
                    {(orderData.orderStatusNumber > 5 ? 5 : orderData.orderStatusNumber)*20}%
                  </span>
                </CircularProgress>
              </div>

              <div>
                <h1 className="font-bold text-2xl mb-4 mt-2">طلب #{orderData?.orderNumber}</h1>
                <div className="flex flex-wrap  text-gray-500 text-center">
                  <p>
                    منتجات <span>{orderData?.numOfOrderDetails}</span>
                  </p>
                  <span className="mx-2"> • </span>
                  <p>
                    تاريخ الطلب : <span>{convertToArabicDate(orderData?.orderDate)}</span>
                  </p>
                </div>
                <div className="flex flex-wrap text-gray-500 text-center">
                  <p>
                    المستلم  : <span>{orderData?.customerName}</span>
                  </p>
                  <span className="mx-2">•</span>
                  <p>
                    العنوان : <span>{orderData?.customerAdress || "------------"}</span>
                  </p>
                </div>
                {/* <h4 className="mt-5 bg-bg-50 rounded-md font-bold text-primary w-fit p-[6px] px-4">
                  تم تأكيد طلبك
                </h4> */}
              </div>

            </div>
            <div className="flex flex-col items-center justify-center pe-5 my-4 max-mdHalf:w-full">
              <h1 className="text-xl font-bold text-secondary max-md:text-lg  ">
                {(orderData?.totalPrice).toFixed(2) + " "} {get_currency_key(orderData?.country)}
              </h1>
              <div className=" " >
                <Link
                  className="flex items-center gap-x-2 bg-primary text-white w-fit   rounded text-sm mt-4 p-3 px-4 "
                  href={`/Orderdetail/${orderData?.orderNumber}`}
                >
                  معلومات الطلب
                </Link>
              </div>
            </div>
          </div> 
        </div>

        {
          orderData?.orderStatusNumber == 6 && (
            <div className=" text-xl font-bold text-red-500 mt-5 p-10 " >
              <h1 className="my-10 text-center"> تم رفض الطلب </h1>
            </div>
          )
        }

        {orderData?.orderStatusNumber >= 0 && orderData?.orderStatusNumber != 6 && <div className="mt-3">
          {/* <h1 className="my-10 text-center" > {orderData?.orderStatus} </h1> */}
          <Progresses
            status={orderData?.orderStatusNumber} 
            statusDates={[
              orderData?.orderDate,
              orderData?.approvedAt,
              orderData?.purchasedAt,
              orderData?.shippedAt,
              orderData?.receivedByDeliveryAt,
              orderData?.deliveredAt,
            ]}
          />
        </div>}
 
        <OrderTrackSteps/>
      </div>
    </div>
  );
};

export default OrderTrack;
