"use client"; 
import React, { useState } from "react";
import { Order, ResponsiveOrdersTypes } from "../types";
import Dropdown from "./Dropdown";
import { BsSortDown } from "react-icons/bs";
import { CgSortAz } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/http";
import { convertToArabicDate } from "@/lib/utils";
import { useRouter } from "next-nprogress-bar";

interface Props {
  initData: {
    items: Order[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

const TABLE_HEAD = [
  "التتبع",
  "الحالة",
  "التاريخ",
  "قيمة الطلب",
  "رقم الطلب",
].reverse();

const orderStatuses = [
  { key: -1, status: "الكل" },
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

const MyOrdersTable: React.FC<Props> = ({ initData }) => {
  const router = useRouter();

  const [ordersFilters, setOrdersFilters] = useState<{
    status?: number;
    orderBy?: number;
    isRefeched: boolean;
  }>({
    isRefeched: false,
  });

  // Fetching paginated orders
  const fetchOrders = async ({ pageParam = 1 }) => {
    let queryParams: any = {
      pageNumber: pageParam,
      pageSize: initData.pageSize,
      orderBy: ordersFilters.orderBy,
      status: ordersFilters.status == -1 ? undefined : ordersFilters.status,
    };

    // cleaning
    queryParams = Object.fromEntries(
      Object.entries(queryParams).filter(([, value]) => value !== undefined)
    );

    const response = await getApi<ResponsiveOrdersTypes>(
      `Orders/GetAllCustomerOrdersByFilter`,
      queryParams
    );
    if (!response.success) {
      throw new Error(response.message);
    }
    const data = response.data;

    return data;
  };

  const { data, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
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

  const track = (id: number) => {
    router.push("/OrderTrack/" + id);
  };
  const goToOrderDetails = (id: number) => {
    router.push("/Orderdetail/" + id);
  };

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
          {"123456".split("").map((s) => (
            <div
              key={s}
              className="h-4 px-4 py-6 bg-gray-200 my-1  rounded"
            ></div>
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
          <div className="w-full">
            {/* Desktop Table */}
            <div className="hidden md:block">
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
                      { orderNumber, totalPrice, orderDate, orderStatus, id },
                      index
                    ) => (
                      <tr
                        key={orderNumber}
                        className={`${
                          index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
                        } border-b border-gray-200 cursor-pointer`}
                        onClick={() => {
                          goToOrderDetails(id);
                        }}
                      >
                        <td className="px-4 py-3">{orderNumber}</td>
                        <td className="px-4 py-3">{totalPrice}</td>
                        <td className="px-4 py-3">{convertToArabicDate(orderDate)}</td>
                        <td className="px-4 py-3">
                          <span className="inline-block px-3 py-1 whitespace-nowrap text-[#2E9E2C] bg-[#288B5326] text-sm">
                            {orderStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            onClick={() => {
                              track(id);
                            }}
                            className="inline-block px-3 py-1 whitespace-nowrap text-[#2E9E2C] cursor-pointer rounded-lg bg-[#288B5326] text-sm"
                          >
                            تتبع
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden">
              {orders.map(
                (
                  { orderNumber, totalPrice, orderDate, orderStatus, id },
                  index
                ) => (
                  <div
                    key={orderNumber}
                    className={`border rounded-lg p-4 mb-4 cursor-pointer ${
                      index % 2 !== 0 ? "bg-[#FFFBF8]" : "bg-white"
                    }`}
                    onClick={() => {
                      goToOrderDetails(id);
                    }}
                  >
                    <div className="mb-2 flex justify-between items-center text-sm">
                      <span className="font-medium">رقم الطلب : </span>
                      <span>{orderNumber}</span>
                    </div>
                    <div className="mb-2 flex justify-between items-center text-sm">
                      <span className="font-medium"> إجمالي السعر : </span>
                      <span className="text-primary-background font-bold">
                        {totalPrice} رس
                      </span>
                    </div>
                    <div className="mb-2 flex justify-between items-center text-sm">
                      <span className="font-medium"> تاريخ الطلب : </span>
                      <span>{convertToArabicDate(orderDate)}</span>
                    </div>
                    <div className="mb-2 flex flex-wrap justify-between items-center text-sm">
                      <span className="font-medium">الحالة: </span>
                      <span className="inline-block px-3 py-1 whitespace-nowrap text-[#2E9E2C] bg-[#288B5326] text-sm rounded">
                        {orderStatus}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        onClick={() => {
                          track(id);
                        }}
                        className="inline-block p-3 mt-2 w-full text-center whitespace-nowrap text-[#2E9E2C] cursor-pointer rounded-lg bg-[#288B5326] text-sm"
                      >
                        تتبع
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
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
