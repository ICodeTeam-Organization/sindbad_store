"use client";

import React, { useState } from "react";
import { Order, ResponsiveOrdersTypes } from "../types";
import Dropdown from "./Dropdown";
import { BsSortDown } from "react-icons/bs";
import { CgSortAz } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/http";
import { useRouter } from "next-nprogress-bar";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

interface Props {
  initData: {
    items: Order[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

const MyOrdersTable: React.FC<Props> = ({ initData }) => {
  const TABLE_HEAD = [
    "التتبع",
    "الحالة",
    "التاريخ",
    "قيمة الطلب",
    "رقم الطلب",
  ].reverse();

  const orderStatuses = [
    { key: 0, status: "الطلب قيد انتظار التأكيد على السند التابع له" },
    { key: 1, status: "تم قبول الطلب" },
    { key: 2, status: "تم شحن الطلب" },
    { key: 3, status: "تم تسليم الطلب الى الزبون" },
    { key: 4, status: "تم الرفض" },
    { key: 5, status: "تم استلام الطلب لدى مندوب الاستلام" },
  ];

  const sortingOptions = [
    { key: 1, status: "ترتيب تصاعدي" },
    { key: 2, status: "ترتيب تنازلي" },
  ];

  const [ordersFilters, setOrdersFilters] = useState({
    status: 0,
    orderBy: 1,
    isRefeched: false,
  });

  // Fetching paginated orders
  const fetchOrders = async ({ pageParam = 1 }) => {
    const response = await getApi<ResponsiveOrdersTypes>(
      `Orders/GetAllCustomerOrdersByFilter?pageNumber=${pageParam}&pageSize=${initData.pageSize}&orderBy=${ordersFilters.orderBy}&status=${ordersFilters.status}`
    );
    if (!response.success) {
      throw new Error(response.message);
    }
    const data = response.data;

    return data;
  };

  const {
    data,
    isRefetching,
    isFetched,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["customerOrders", ordersFilters],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    // عشان تجربة المستخم نجيب اول صفحة من البينات ونمررها هنا
    initialData: {
      pages: [initData],
      pageParams: [1],
    },
    enabled: ordersFilters.isRefeched, // هذا عشان ما يعمل فتش اول مره من الرياكت كويري لاني جلبت الداتا من السيرفر ومررتها كبينانات اولية
  });

  // Combine all orders from fetched pages
  const orders = (data?.pages.flatMap((page) => page?.items) || []).filter(
    (ele) => !!ele
  );

  console.log(orders);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h2 className="text-2xl">طلباتي</h2>
        <div className="flex flex-row md:flex-row sm:items-center gap-4">
          <Dropdown
            placeholder="ترتيب حسب التاريخ"
            options={sortingOptions}
            icon={<BsSortDown size={20} />}
            onSelect={(e) => {
              setOrdersFilters((prev) => ({
                ...prev,
                orderBy: e.key,
                isRefeched: true,
              }));
            }}
          />
          <Dropdown
            placeholder="حالة الطلب"
            options={orderStatuses}
            icon={<CgSortAz size={22} />}
            onSelect={(e) => {
              setOrdersFilters((prev) => ({
                ...prev,
                status: e.key,
                isRefeched: true,
              }));
            }}
          />
        </div>
      </div>

      {/* Table */}
      {isRefetching && (
        <div className="animate-pulse">
          {"123456".split("").map(() => (
            <div className="h-4 px-4 py-6 bg-gray-200 my-1  rounded"></div>
          ))}
        </div>
      )}

      {!isRefetching && orders.length <= 0 && (
        <div className="text-center p-4 text-lg mt-6 h-[50vh] flex items-center justify-center">
          <p> لاتوجد طلبات </p>
        </div>
      )}

      {!isRefetching && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#FFECE5] text-sm font-medium text-center text-[#000]">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="px-4 py-3 font-medium">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-center text-[#000]">
              {orders.map(
                (
                  { orderNumber, totalPrice, orderDate, orderStatus },
                  index
                ) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
                    } border-b border-gray-200`}
                  >
                    <td className="px-4 py-3">{orderNumber}</td>
                    <td className="px-4 py-3">{totalPrice}</td>
                    <td className="px-4 py-3">{orderDate}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 whitespace-nowrap text-[#2E9E2C] bg-[#288B5326] text-sm">
                        {orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 whitespace-nowrap text-[#2E9E2C] cursor-pointer rounded-lg bg-[#288B5326] text-sm">
                        تتبع
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Load More Button */}
      <div className="m-4 flex items-center justify-center">
        {hasNextPage ? (
          <Button
            className="bg-primary-background hover:bg-[#f5863984]"
            onClick={() => fetchNextPage()}
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

export default MyOrdersTable;
