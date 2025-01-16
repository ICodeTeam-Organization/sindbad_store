"use client";

import React, { useState } from "react";
import { SpecialOrdersResponseType } from "../../types";
import { useCategoriesDataStore } from "@/app/stores/categoriesStore";
import Image from "next/image";
import { convertToArabicDate } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/http";
import { Button } from "@/components/ui/button";

const TABLE_HEAD = [
  "العمليات",
  "التاريخ",
  "التفاصيل",
  "الفئة",
  "الطلب",
  // "الرقم",
];

const OrdersPricedTable: React.FC<{ initData: SpecialOrdersResponseType }> = ({
  initData,
}) => {
  const { categories } = useCategoriesDataStore();

  const getCategoryNameById = (id: number) => {
    return categories.find((ele) => ele.id == id)?.name ?? "لاتوجد فئة";
  };

  const [isRefeched, setIsRefeched] = useState(false);

  const { data, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["customerOrdersPriced"],
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
      {orders.length > 0 && (
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
            {orders?.map(
              ({ name, specialCategoryId, note, createdAt }, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
                  } border-b border-gray-200`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                      <span className=" w-[140px] text-[#768396] h-[38px] bg-[#FFEBDD] px-4 py-2 rounded-lg whitespace-nowrap">
                        عرض تفاصيل السعر
                      </span>
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
                  {/* <td className="px-4 py-3">{orderNumber}</td> */}
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

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

export default OrdersPricedTable;
