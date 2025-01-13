import React from "react";
import NotificationCard from "./components/NotificationCard";
import FilterButton from "./components/FilterButton";

const notifications = [
  {
    id: 1,
    order_title: "رقم الطلب",
    order_number: "64564654846546",
    content: "تم تسعير طلبك .. اضغط هنا للتفاصيل",
    date: "Jan 17, 2024",
    bgColor: "#F0FFFC",
  },
  {
    id: 2,
    order_title: "رقم الطلب",
    order_number: "64564654846546",
    content: "تم شحن الطلب \\ تم شراء الطلب \\ تم وصول الطلب \\ تم تسليم الطلب",
    date: "Jan 17, 2024",
    bgColor: "#F0FFFC",
  },
  {
    id: 3,
    order_title: "رقم الطلب",
    order_number: "64564654846546",
    content: "تم تسعير طلبك .. اضغط هنا للتفاصيل",
    date: "Jan 17, 2024",
    bgColor: "#F1F1F1",
  },
  {
    id: 4,
    order_title: "رقم الطلب",
    order_number: "64564654846546",
    content: "تم تسعير طلبك .. اضغط هنا للتفاصيل",
    date: "Jan 17, 2024",
    bgColor: "#F1F1F1",
  },
];

const Notifications = () => {
  return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800">الإشعارات</h1>
        <div className="flex gap-4 my-6 justify-start flex-wrap sm:flex-nowrap">
          <FilterButton title="كل الإشعارات" />
          <FilterButton title="إشعارات التسعير" />
          <FilterButton title="إشعارات المنتجات" />
        </div>
        <NotificationCard notificationsList={notifications} />
      </div>
  );
};

export default Notifications;
