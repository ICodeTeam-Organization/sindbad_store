import React from "react";
import NotificationCard from "./components/NotificationCard";
import { getApi } from "@/lib/http";
import { ApiResponseForNotifications, ResTypeForNotifeeCount } from "./types";
import { actionsOrder, actionsSpecialProducts, notifyActionToQuery } from "./notificationsActions";
 
const Notifications = async () => {

     
    const actionsQeries = notifyActionToQuery([...actionsSpecialProducts,...actionsOrder]);
       
    const data = await getApi<ApiResponseForNotifications>("Notifications?pageNumber=1&pageSize=30&" + actionsQeries);
 
    // the index of each count  in  notifeeCount
    //   0 => الكل ,
    //   1 => اشعارات التسعير 
    //   2 = اشعارات الطلبات 
    const notifeeCount:number[] = []; 
    const notificationsCounts = await getApi<ResTypeForNotifeeCount>("Notifications/Count")
    const specialProductsNotificationCount =  notificationsCounts?.data?.filter(e=> actionsSpecialProducts.includes(e.action)).reduce((t,c)=> t+ c.count , 0)
    const OrdersNotificationCount = notificationsCounts?.data?.filter(e=>actionsOrder.includes(e.action)).reduce((t,c)=> t+ c.count , 0) 
    notifeeCount.push(OrdersNotificationCount+specialProductsNotificationCount);
    notifeeCount.push(specialProductsNotificationCount);
    notifeeCount.push(OrdersNotificationCount);


    // console.log(data);
    // console.log("Notifications?pageNumber=1&pageSize=30&" + actionsQeries);
    // console.log(notificationsCounts );
    // console.log(notifeeCount);
    


  return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800">الإشعارات</h1>
        <NotificationCard initData={data?.data} notifeeCounts={notifeeCount} actionsQuery={actionsQeries} />
      </div>
  );
};

export default Notifications;
