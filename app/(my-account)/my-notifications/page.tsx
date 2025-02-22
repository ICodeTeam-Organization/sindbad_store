import React from "react";
import NotificationCard from "./components/NotificationCard";
import FilterButton from "./components/FilterButton";
import { getApi } from "@/lib/http";
import { ApiResponseForNotifications } from "./types";
 
const Notifications = async () => {

    //يجيب بينات من اول صفحة ونمررها لل جدول ك بينات اولية عشان تحسن تجربة المستخمد 
    const data = await getApi<ApiResponseForNotifications>("Notifications?pageNumber=1&pageSize=15");

    console.log(data?.data);
    

  return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800">الإشعارات</h1>
        <div className="flex gap-4 my-6 justify-start flex-wrap sm:flex-nowrap">
          <FilterButton title="كل الإشعارات" />
          <FilterButton title="إشعارات التسعير" />
          <FilterButton title="إشعارات المنتجات" />
        </div>
        <NotificationCard initData={data?.data} />
      </div>
  );
};

export default Notifications;
