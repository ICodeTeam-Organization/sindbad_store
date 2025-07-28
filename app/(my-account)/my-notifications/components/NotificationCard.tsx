"use client";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getApi, postApi } from "@/lib/http";
import { NotificationType } from "../types";
import { Button } from "@/components/ui/button";
import FilterButton from "./FilterButton";
import { cn, getCountryName } from "@/lib/utils";
import { useRouter } from "next-nprogress-bar";
import { convertToArabicDate } from "@/lib/timeFuns";
import {
  actionsOrder,
  actionsSpecialProducts,
  notifyActionToQuery,
} from "../notificationsActions";
import Cookies from 'js-cookie';
import { Alert } from "@/components/Alert";
const NotificationCard = ({
  initData,
  notifeeCounts,
  actionsQuery,
}: {
  initData: {
    items: NotificationType[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  notifeeCounts: number[];
  actionsQuery: string;
}) => {
  const [notifeeType, setnotifeeType] = useState(0);
  const [actionsQueries, setActionsQueries] = useState(actionsQuery);
  const router = useRouter();
  const [alertData, setAlertData] = useState<{
    open: boolean;
    message: string;
    newCountry: string;
    notificationId: string | number;
    action:number;
    target: number | string;
  }>({
    open: false,
    message: "",
    newCountry: "",
    notificationId: "",
    action: 0,
    target: "",
  });

  const fetchNotifications = async ({ pageParam = 1 }) => {
    const response = await getApi<any>(
      `Notifications?pageNumber=${pageParam}&pageSize=${initData.pageSize}&${actionsQueries}`
    );
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data;
  };

  const [isRefeched, setIsRefeched] = useState(false);
  const {
    data,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["notifications" + notifeeType],
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
    enabled: isRefeched,
  });

  const notifications = (
    data?.pages.flatMap((page) => page?.items) || []
  ).filter((ele) => !!ele);

  const changeNotfieeType = (type: number) => {
    switch (type) {
      case 0:
        setActionsQueries(actionsQuery);
        break;
      case 1:
        setActionsQueries(notifyActionToQuery(actionsSpecialProducts));
        break;
      case 2:
        setActionsQueries(notifyActionToQuery(actionsOrder));
        break;

      default:
        setActionsQueries(actionsQuery);
        break;
    }
    setIsRefeched(true);
    refetch();
    setnotifeeType(type);
  };

   const handleMarkAsRead = async (noti: NotificationType) => {
    const currentCountry = Cookies.get("country");
    const isCurrentCountry = currentCountry === noti.country;

    if (!isCurrentCountry) {
      setAlertData({
        open: true,
        message: `أنت الآن في دولة (${getCountryName(currentCountry ?? "")}) والإشعار خاص بدولة (${ getCountryName(noti.country)})، هل ترغب بالانتقال لها؟`,
        newCountry: noti.country,
        notificationId: noti.id,
        action: noti.action,
        target: noti.target,
      });
      return;
    }

    // ✅ نفس الدولة: أكمل التنقل حسب نوع الإجراء
    await handleAction(noti);
  };

  const handleAction = async (noti: NotificationType) => {
    switch (noti?.action) {
      case 4:
      case 9:
      case 11:
      case 12:
      case 13:
        router.push("/OrderTrack/" + noti?.target);
        break;
      case 14:
        router.push("/Orderdetail/" + noti?.target);
        break;
      case 2:
        router.push("/my-special-orders/priceDetails/" + noti?.target);
        break;
      default:
        break;
    }

    await postApi("Notifications/MarkAsRead?NotificationId=" + noti?.id);
  };

  const confirmChangeCountry = async () => {
    const { newCountry , notificationId ,action , target} = alertData;
    Cookies.remove("country");
    Cookies.set("country", newCountry, { path: "/", sameSite: "Lax" });
    postApi("Notifications/MarkAsRead?NotificationId=" + notificationId);

    setAlertData((prev) => ({ ...prev, open: false }));
    switch (action) {
      case 4:
      case 9:
      case 11:
      case 12:
      case 13:
         window.location.replace("/OrderTrack/" + target);
        break;
      case 2:
         window.location.replace("/my-special-orders/priceDetails/" + target);
        break;
      default:
        break;
    }

  };


//   const hanleMarkAsRead = async (noti: NotificationType) => {

//     const currentCountry =  Cookies.get("country");
//     const isCurrentCountry = currentCountry !== noti.country;
//     // setchangeCountryLoader(true);

// //       // Send data that is in cache to the server
// //       const data = await db.bgData.toArray();
// //       await mutateAsync(data);

// //       Cookies.remove("country");
// //       Cookies.set("country", item?.key, {
// //         path: "/",
// //         sameSite: "Lax",
// //       });
// //       setselectedCountry(item);
// //       router.refresh();
// //       window.location.replace("/");

//     switch (noti?.action) {
//       case 4:
//       case 9:
//       case 11:
//       case 12:
//       case 13:
//         router.push("OrderTrack/" + noti?.target);
//         break;
//       case 2:
//         router.push("my-special-orders/priceDetails/" + noti?.target);
//         break;
//       default:
//         break;
//     }

//     await postApi("Notifications/MarkAsRead?NotificationId=" + noti?.id);
//   };

  return (
    <div className="space-y-4 mt-4">
       <Alert
          open={alertData.open}
          onClose={() => setAlertData((prev) => ({ ...prev, open: false }))}
          onOk={confirmChangeCountry}
          title="🚨"
          description={alertData.message}
          cancelText="إلغاء"
          okText="نعم، انتقل"
        />
      <div className="flex gap-4 my-6 justify-start flex-wrap sm:flex-nowrap">
        <FilterButton
          title="كل الإشعارات"
          count={notifeeCounts[0]}
          onClick={() => {
            changeNotfieeType(0);
          }}
          isActive={notifeeType == 0}
        />
        <FilterButton
          title="إشعارات التسعير"
          count={notifeeCounts[1]}
          onClick={() => {
            changeNotfieeType(1);
          }}
          isActive={notifeeType == 1}
        />
        <FilterButton
          title="إشعارات المنتجات"
          count={notifeeCounts[2]}
          onClick={() => {
            changeNotfieeType(2);
          }}
          isActive={notifeeType == 2}
        />
      </div>
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
          {notifications.map((notification: NotificationType) => (
            <div
              onClick={() => {
                handleMarkAsRead(notification);
              }}
              key={notification.id}
              className={cn(
                "flex items-start justify-between p-4 rounded-lg bg-gray-100 relative cursor-pointer",
                !notification?.isRead && "bg-[#F7E99E34] border"
              )}
            >
              {!notification?.isRead && (
                <span className="absolute bg-red-500 text-white rounded px-1 top-2 left-2">
                  {" "}
                  جديد{" "}
                </span>
              )}
              <div>
                <div className=" flex gap-x-4 mb-2">
                  <p className="text-xs  text-gray-500">
                    {convertToArabicDate(notification.createdAt)}
                  </p>
                  <span className="text-xs text-secondary bg-white px-2 rounded-sm">
                    {notification.country == "1" ? (
                      <span role="img" aria-label="Saudi Arabia">
                        من السعودية
                      </span>
                    ) : notification.country == "2" ? (
                      <span role="img" aria-label="UAE">
                        من الإمارات
                      </span>
                    ) : null}
                  </span>
                </div>
                <span className="sm:text-base text-sm text-black   px-2 rounded-sm">
                  {notification.title}
                </span>
                {/* <span className="mr-2 text-black">{notification.}</span> */}
                <p className="sm:text-sm text-xs px-2 mt-2 text-gray-600">
                  {notification.body}
                </p>
              </div>
            </div>
          ))}
        </>
      )}

      <div className="m-4 flex items-center justify-center">
        {hasNextPage ? (
          <Button
            className="bg-primary hover:bg-[#f5863984]"
            onClick={() => {
              setIsRefeched(true);
              fetchNextPage();
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
