"use client";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getApi } from "@/lib/http";
import { NotificationType } from "../types";
import { Button } from "@/components/ui/button";

const NotificationCard = ({
  initData,
}: {
  initData: {
    items: NotificationType[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}) => {
  const fetchNotifications = async ({ pageParam = 1 }) => {
    const response = await getApi<any>(
      `Notifications/GetAllNotifications`,
      {
        pageNumber: pageParam,
        pageSize: initData.pageSize,
      }
    );
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data   ;
  };

  const [isRefeched, setIsRefeched] = useState(false)
  const {
    data,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    initialData: {
      pages: [initData],
      pageParams: [1],
    },
    enabled:isRefeched,
  });

  const notifications = (data?.pages.flatMap((page) => page?.items) || []).filter(
    (ele) => !!ele
  );

  return (
    <div className="space-y-4 mt-4">
      {isRefetching && (
        <div className="animate-pulse">
          {"123456".split("").map((s) => (
            <div
              key={s}
              className="h-4 px-4 py-6 bg-gray-200 my-1 rounded"
            ></div>
          ))}
        </div>
      )}

      {!isRefetching && notifications.length <= 0 && (
        <div className="text-center p-4 text-lg mt-6 h-[50vh] flex items-center justify-center">
          <p> لا توجد إشعارات </p>
        </div>
      )}

      {!isRefetching && notifications.length > 0 && (
        <>
          {notifications.map((notification:NotificationType) => (
            // <div
            //   key={notification.id}
            //   className="flex items-start justify-between p-4 rounded-lg"
            // >
            //   <div>
            //     <span className="text-sm text-[#3D7A81] bg-[#ECF2F2] px-2 rounded-sm">
            //       {notification.title}
            //     </span>
            //     <span className="mr-2 text-black">{notification.target}</span>
            //   </div>
            // </div>
            <div
              key={notification.id}
              className="flex items-start justify-between p-4 rounded-lg bg-gray-100"
            >
              <div>
                {/* <p className="text-sm text-gray-500">{notification.}</p> */}
                <span className="text-base text-black   px-2 rounded-sm">
                  {notification.title}
                </span>
                {/* <span className="mr-2 text-black">{notification.}</span> */}
                <p className="text-sm px-2 mt-2 text-gray-600">{notification.body}</p>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="m-4 flex items-center justify-center">
        {hasNextPage ? (
          <Button
            className="bg-primary-background hover:bg-[#f5863984]"
            onClick={() => {
              setIsRefeched(true)
              fetchNextPage()
            }}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "جاري التحميل..." : "عرض المزيد"}
          </Button>
        ) : (
          notifications.length > 0 &&
          !isRefetching && (
            <span className="text-gray-500">لا توجد إشعارات أخرى للعرض</span>
          )
        )}
      </div>
    </div>
  );
};

export default NotificationCard;