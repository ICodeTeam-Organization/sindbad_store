import React from "react";
import NotificationCard from "./components/NotificationCard";
import { getApi } from "@/lib/http";
import { ApiResponseForNotifications, ResTypeForNotifeeCount } from "./types";
 
const Notifications = async () => {

    //يجيب بينات من اول صفحة ونمررها لل جدول ك بينات اولية عشان تحسن تجربة المستخمد 
    const data = await getApi<ApiResponseForNotifications>("Notifications?pageNumber=1&pageSize=30&type=0");
 
    const notifeeCounts = await Promise.allSettled([
      getApi<ResTypeForNotifeeCount>("Notifications/Count?type=0"),
      getApi<ResTypeForNotifeeCount>("Notifications/Count?type=1"),
      getApi<ResTypeForNotifeeCount>("Notifications/Count?type=2"),
    ]);
    const notifeeCount:number[] = []
    notifeeCounts.forEach((result, index) => {
      if (result.status === "fulfilled") {
        notifeeCount.push(result.value.data)
      } else {
        notifeeCount.push(0)
        console.error(`Failed to fetch notification count for type ${index}:`, result.reason);
      }
    });


    
    

  return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800">الإشعارات</h1>
        <NotificationCard initData={data?.data} notifeeCounts={notifeeCount} />
      </div>
  );
};

export default Notifications;
