"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SpecialOrdersResponseType } from "../../types";
import { convertToArabicDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/http";
import Link from "next/link";
const TABLE_HEAD = [
  "العمليات",
  "التاريخ",
  "التفاصيل",
  "الفئة",
  "الطلب",
  "نوع الطلب"
  // "الرقم",
];
const OrdersWaitingPricingTable: React.FC<{
  initData: SpecialOrdersResponseType;
}> = ({ initData }) => {
  const { categories } = useCategoriesDataStore();

  const getCategoryNameById = (id: number) => {
    return categories.find((ele) => ele.id == id)?.name ?? "لاتوجد فئة";
  };

  const [isRefeched, setIsRefeched] = useState(false);

  const { data, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["customerOrdersWaitingPricing"],
      queryFn: async ({ pageParam = 1 }) => {
        return getApi<SpecialOrdersResponseType>(
          `SpecialProducts/Market/GetSpecialProductsByCustomerFilter/100/10/${pageParam}`
        );
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.currentPage < lastPage?.data?.totalPages) {
          return lastPage?.data?.currentPage + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      initialData: {
        pages: [initData], // تمرير البيانات الأولية هنا
        pageParams: [1],
      },
      enabled: isRefeched, // هذا عشان ما يعمل فتش أول مره من الرياكت كويري لاني جلبت الداتا من السيرفر ومررتها كبينات أولية
    });

  // Combine all orders from fetched pages
  const orders = (
    data?.pages.flatMap((page) => page?.data?.items) || []
  ).filter((ele) => !!ele);

  return (
    <div className="overflow-x-auto">
      {orders.length <= 0 && (
        <div className="text-center p-4 text-lg mt-6 h-[50vh] flex items-center justify-center">
          <p> لاتوجد طلبات </p>
        </div>
      )}
      <div className="w-full">
      {/* Desktop Table */}
      {orders.length > 0 && (
        <div className="hidden md:block  ">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead className="bg-[#FFECE5] text-sm font-medium text-center text-[#000]">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="px-4 py-3 font-medium">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="text-sm text-center text-[#000]">
              {orders?.map(({ name, specialCategoryId, note, createdAt, id,typeName }, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
                  } border-b border-gray-200`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                      <Link
                        href={"/my-special-orders/priceDetails/" + id}
                        className="w-[140px] text-[#768396] h-[38px] bg-[#FFEBDD] px-4 py-2 rounded-lg whitespace-nowrap"
                      >
                        عرض تفاصيل الطلب
                      </Link>
                      <Image
                        src="/images/MyAccountImages/ai-generative.svg"
                        alt="ai-generative"
                        width={20}
                        height={20}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {convertToArabicDate(createdAt)}
                  </td>
                  <td className="px-4 py-3">{note}</td>
                  <td className="px-4 py-3">
                    {getCategoryNameById(+specialCategoryId)}
                  </td>
                  <td className="px-4 py-3">{name}</td>
                  <td className="px-4 py-3">{typeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="block md:hidden" dir="rtl">
        {orders.length > 0 &&
          orders.map(({ name, specialCategoryId, note, createdAt, id , typeName }, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 mb-4 ${ 
                index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
               }`}
            >
              <div className="mb-2 text-sm flex items-center justify-between">
                <span className="font-medium">نوع الطلب:  </span>
                <span className="" >{typeName}</span>
              </div>
              <div className="mb-2 text-sm flex items-center justify-between">
                <span className="font-medium">الطلب: </span>
                <span className="" >{name}</span>
              </div>
              <div className="mb-2 text-sm flex items-center justify-between">
                <span className="font-medium">الفئة: </span>
                <span>{getCategoryNameById(+specialCategoryId)}</span>
              </div>
              <div className="mb-2 text-sm flex items-center justify-between">
                <span className="font-medium">ملاحظة: </span>
                <span>{note ?? "لاتوجد ملاحظة"}</span>
              </div>
              <div className="mb-2 text-sm flex items-center justify-between">
                <span className="font-medium">التاريخ: </span>
                <span>{convertToArabicDate(createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href={"/my-special-orders/priceDetails/" + id}
                  className="w-full mt-2 text-center text-sm text-white shadow-sm h-[38px] bg-primary-background px-4 py-2 rounded-lg whitespace-nowrap"
                >
                  عرض تفاصيل السعر
                </Link>
               
              </div>
            </div>
          ))}
      </div>
    </div>

      <div className="flex items-center justify-center p-10">
        {hasNextPage ? (
          <Button
            className="bg-primary-background hover:bg-[#f5863984]"
            onClick={() => {
              setIsRefeched(true);
              fetchNextPage();
            }}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "جاري التحميل..." : "عرض المزيد"}
          </Button>
        ) : (
          orders.length > 0 &&
          !isRefetching && (
            <span className="text-gray-500">لا توجد طلبات أخرى للعرض</span>
          )
        )}
      </div>
    </div>
  );
};

export default OrdersWaitingPricingTable;
