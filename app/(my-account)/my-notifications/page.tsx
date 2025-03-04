import React from "react";
import NotificationCard from "./components/NotificationCard";
import { getApi } from "@/lib/http";
import { ApiResponseForNotifications, ResTypeForNotifeeCount } from "./types";
 
const Notifications = async () => {

    //يجيب بينات من اول صفحة ونمررها لل جدول ك بينات اولية عشان تحسن تجربة المستخمد 
    const data = await getApi<ApiResponseForNotifications>("Notifications?pageNumber=1&pageSize=30&type=0");
    const notifeeCount:number[] = []
    const notificationsCounts = await getApi<ResTypeForNotifeeCount>("Notifications/Count")
    notifeeCount.push(notificationsCounts?.data?.all)
    notifeeCount.push(notificationsCounts?.data?.specials)
    notifeeCount.push(notificationsCounts?.data?.orders)


  return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800">الإشعارات</h1>
        <NotificationCard initData={data?.data} notifeeCounts={notifeeCount} />
      </div>
  );
};

export default Notifications;
