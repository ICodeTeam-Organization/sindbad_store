import ImagesViewr from "@/components/ImagesViewr";
import React from "react";
import OfferPricesTable from "../components/OfferPricesTable";
import { getApi } from "@/lib/http";
import { OfferDetailsResponseType, SpecialOrderDetailsType } from "../../types";
import { notFound } from "next/navigation";
import CategoryName from "../components/CategoryName";
import LinkSection from "../components/LinkSection";

export default async function PriceDetails({
  params,
}: {
  params: { orderId: string };
}) {
  let prices, specialOrderDetails;

  try {
    prices = await getApi<OfferDetailsResponseType>(
      `SpecialProducts/Market/GetAllOfferPriceOfSpecificSpecialProductByCustomer/${+params?.orderId}`
    );
  } catch (error) {
    console.error("خطأ أثناء جلب الأسعار:", error);
  }

  try {
    specialOrderDetails = await getApi<SpecialOrderDetailsType>(
      `SpecialProducts/${+params?.orderId}`
    );
  } catch (error) {
    console.error("خطأ أثناء جلب تفاصيل الطلب الخاص:", error);
    return notFound();
  }

  const {
    name: orderName,
    orderNumber,
    specialCategoryId,
    description,
    linkUrl,
    images,
  } = specialOrderDetails?.data;

  

  return (
    <div className=" p-5  rounded-md shadow-sm tajawal bg-white  ">
      <div className=" ">
        <h1 className="font-bold">طلب خاص</h1>
        {prices?.success ? (
          <p className="mt-4 text-gray-600 font-bold text-sm">
            {" "}
            تم تسعير الطلب{" "}
          </p>
        ) : (
          <p className="mt-4 text-gray-600 font-bold text-sm">
            {" "}
            لم يتم تسعير الطلب بعد{" "}
          </p>
        )}
      </div>

      <div className="mdHalf:flex mt-6  ">
        <div className=" flex items-center justify-center mdHalf:block mdHalf:mb-0 mb-10 ">
          <div className=" relative">
            <ImagesViewr images={images.map((e) => e?.imageUrl)} key={10} />
          </div>
        </div>

        <div className="  flex-1   ">
          <div className="flex justify-between items-center">
            <p className="font-bold text-sm">
              {" "}
              الطلب : <span className="font-normal">{orderName}</span>{" "}
            </p>
            <p className="font-bold text-sm">
              {" "}
              رقم الطلب :{" "}
              <span className=" text-primary-background font-normal ">
                {" "}
                {orderNumber ??
                  "لا يوجد رقم بعد حتى يتم الموافقة على السعر"}{" "}
              </span>{" "}
            </p>
          </div>
          <div className=" mt-10 space-y-4 text-sm">
            <div className="bg-gray-100 p-4">
              <p className="font-bold  ">
                {" "}
                الفئة :{" "}
                <span className="font-normal">
                  {" "}
                  <CategoryName id={specialCategoryId} />{" "}
                </span>{" "}
              </p>
            </div>
            <div className="bg-gray-100 p-4">
              <p className="font-bold "> وصف الطلب :</p>
              <p>{description}</p>
            </div>
            <div className="bg-gray-100 p-4">
              <LinkSection linkUrl={linkUrl ?? ""} />
            </div>
          </div>
        </div>
      </div>

      {prices?.success && (
        <div>
          {" "}
          <h1 className="mt-8 font-bold">التسعيرات : </h1>
          <OfferPricesTable initData={prices} />
        </div>
      )}
    </div>
  );
}
