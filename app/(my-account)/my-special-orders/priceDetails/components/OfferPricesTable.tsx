"use client";

import React, { useState } from "react";
import { OfferDetailsResponseType, Pricing } from "../../types";
import { Checkbox } from "@/components/ui/checkbox";
import ShowPricingInfoDialog from "./ShowPricingInfoDialog";
import AddSpecialOrderToCartButton from "./AddSpecialOrderToCartButton";

const TABLE_HEAD = ["السعر", "الشحن", "الكمية", "الملاحظات"];
function OfferPricesTable({
  initData,
}: {
  initData: OfferDetailsResponseType;
}) {
  const [SelectedPricing, setSelectedPricing] = useState<Pricing>();

  const [showPricingInfo, setshowPricingInfo] = useState<{
    isOpen: boolean;
    data: Pricing | null;
  }>({
    isOpen: false,
    data: null,
  });

  return (
    <div>
      {/* table */}

      <ShowPricingInfoDialog
        show={showPricingInfo?.isOpen}
        setShow={(e) => {
          setshowPricingInfo((prev) => ({ ...prev, isOpen: e }));
        }}
        data={showPricingInfo?.data}
      />

      {/* this is for larg screens */}
      <div className="mdHalf:block hidden">
        <div className="mt-6">
          <table className="w-full border-collapse">
            <thead className="bg-[#FFECE5] text-sm font-medium text-center text-[#000]">
              <tr>
                <th className="py-3  font-bold"> </th>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="px-4 py-3  font-bold">
                    {head}
                  </th>
                ))}
                <th className="py-3  font-bold">{/* for more info */}</th>
              </tr>
            </thead>
            <tbody className="text-sm text-center text-[#000]">
              {initData?.data.map((ele, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
                  } border-b border-gray-200`}
                >
                  <td className=" flex items-center justify-center py-3">
                    <Checkbox
                      checked={SelectedPricing?.id == ele?.id}
                      onCheckedChange={() => {
                        setSelectedPricing(ele);
                      }}
                      className="data-[state=checked]:bg-primary-background  border-primary-background"
                    />
                  </td>

                  <td className="px-4 py-3">{ele?.price}</td>
                  <td className="px-4 py-3">{ele?.shippingCost}</td>
                  <td className="px-4 py-3">{ele?.quantity}</td>
                  <td className="px-4 py-3">{ele?.note ?? "لا توجد ملاحظة"}</td>
                  <td className=" py-3 mx-0 px-0">
                    <span
                      className="bg-zinc-100 p-2 rounded cursor-pointer"
                      onClick={() => {
                        setshowPricingInfo({
                          isOpen: true,
                          data: ele,
                        });
                      }}
                    >
                      كل التفاصيل
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="m-4 flex items-center justify-center ">
          <AddSpecialOrderToCartButton
            pricingId={SelectedPricing?.id}
            totalPrice={
              ((SelectedPricing?.price ?? 1) +
                (SelectedPricing?.shippingCost ?? 0)) *
              (SelectedPricing?.quantity ?? 1)
            }
            className="w-[30vw]"
          />
        </div>
      </div>

      {/* this is for mobile screens */}
      <div className="mdHalf:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {initData?.data.map((ele, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg shadow-md ${
                index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm flex gap-x-2 my-4">
                  <div className="mb-2">
                    <span className=" font-[400]">السعر : </span>
                    <span className="text-primary-background">
                      {ele?.price} رس
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className=" font-[400]"> الشحن : </span>
                    <span className="text-primary-background">
                      {ele?.shippingCost} رس
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className=" font-bold text-xs">الكمية : </span>
                  <span className="font-bold text-primary-background">
                    {ele?.quantity}
                  </span>
                </div>
              </div>
              <div className="text-sm bg-zinc-100 rounded-md p-2">
                <strong className=" block font-bold">الملاحظات : </strong>
                <span className="text-xs">{ele?.note ?? "لا توجد ملاحظة"}</span>
              </div>
              <div className="text-sm mt-2 bg-zinc-100 rounded-md p-2">
                <strong className="   font-bold">رابط المنتج : </strong>
                <span className="text-xs">
                  {ele?.linkUrl ?? "لا يوجد رابط "}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span
                  className="bg-zinc-100 p-2 text-xs rounded cursor-pointer"
                  onClick={() => {
                    setshowPricingInfo({
                      isOpen: true,
                      data: ele,
                    });
                  }}
                >
                  عرض كل التفاصيل
                </span>
              </div>

              <AddSpecialOrderToCartButton
                pricingId={ele?.id}
                totalPrice={
                  ((ele?.price ?? 1) + (ele?.shippingCost ?? 0)) *
                  (ele?.quantity ?? 1)
                }
                className="mt-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OfferPricesTable;
