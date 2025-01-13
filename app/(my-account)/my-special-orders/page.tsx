"use client";

import TabsComponent from "./components/tabs";
import MySpecialOrdersTable from "./components/MySpecialOrdersTable";
import { IoMdAddCircleOutline } from "react-icons/io";

const special_orders = [
  {
    number: "200567",
    order: "جوال سامسونج نوت 10 مستخدم نظيف",
    category: "إلكترونيات",
    details: "جوال سامسونج نوت 10 مستخدم نظيف",
    date: "10/9/2024",
    actions: "عرض تفاصيل السعر",
  },
  {
    number: "200567",
    order: "جوال سامسونج نوت 10 مستخدم نظيف",
    category: "إلكترونيات",
    details: "جوال سامسونج نوت 10 مستخدم نظيف",
    date: "10/9/2024",
    actions: "عرض تفاصيل السعر",
  },
  {
    number: "200567",
    order: "جوال سامسونج نوت 10 مستخدم نظيف",
    category: "إلكترونيات",
    details: "جوال سامسونج نوت 10 مستخدم نظيف",
    date: "10/9/2024",
    actions: "عرض تفاصيل السعر",
  },
  {
    number: "200567",
    order: "جوال سامسونج نوت 10 مستخدم نظيف",
    category: "إلكترونيات",
    details: "جوال سامسونج نوت 10 مستخدم نظيف",
    date: "10/9/2024",
    actions: "عرض تفاصيل السعر",
  },
];
const tabsData = [
  {
    label: "طلبات تم تسعيرها",
    value: "details",
    content: <MySpecialOrdersTable special_orders={special_orders} />,
  },
  {
    label: "طلبات بانتظار التسعير",
    value: "features",
    content: <MySpecialOrdersTable special_orders={special_orders} />,
  },
  {
    label: "طلبات سابقة",
    value: "reviews",
    content: <MySpecialOrdersTable special_orders={special_orders} />,
  },
];
const MyAccountPage = () => {
 
  return (
    <div className="p-6">
      <div className="w-full overflow-hidden rounded-lg  mt-4">
        <div className="flex flex-row justify-between  mb-4">
          <h2 className="text-2xl">طلباتي الخاصة</h2>
          <button className="flex justify-between items-center gap-1 bg-orange-500 text-white px-2 py-2 rounded-lg">
            <IoMdAddCircleOutline /> إضافة طلب جديد
          </button>
        </div>
        <TabsComponent tabs={tabsData} />
      </div>
    </div>
  );
};

export default MyAccountPage;
