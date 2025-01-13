"use client";

import Dropdown from "./components/Dropdown";
import { BsSortDown } from "react-icons/bs";
import { CgSortAz } from "react-icons/cg";
import MyOrdersTable from "./components/MyOrdersTable";

const ordersData = [
  {
    order_number: "200567",
    order_value: " 200.50 ريال سعودي",
    date: "10/9/2024",
    status: "في الطريق",
    traking: "تتبع الطلب",
  },
  {
    order_number: "200567",
    order_value: " 200.50 ريال سعودي",
    date: "10/9/2024",
    status: "في الطريق",
    traking: "تتبع الطلب",
  },
  {
    order_number: "200567",
    order_value: " 200.50 ريال سعودي",
    date: "10/9/2024",
    status: "في الطريق",
    traking: "تتبع الطلب",
  },
  {
    order_number: "200567",
    order_value: " 200.50 ريال سعودي",
    date: "10/9/2024",
    status: "في الطريق",
    traking: "تتبع الطلب",
  },
];
const MyAccountPage = () => {
  const handleStatusSelect = (option: string) => {
    console.log("Selected option:", option);
  };
  return (
    <div className="h-[500px]">
<div className="flex flex-col p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h2 className="text-2xl">طلباتي</h2>
        <div className="flex flex-row md:flex-row sm:items-center gap-4">
          <Dropdown
            placeholder="ترتيب حسب التاريخ"
            options={["قيد التجهيز", "تم الشحن", "تم التوصيل", "ملغى"]}
            icon={<BsSortDown size={20} />}
            onSelect={handleStatusSelect}
          />
          <Dropdown
            placeholder="حالة الطلب"
            options={["قيد التجهيز", "تم الشحن", "تم التوصيل", "ملغى"]}
            icon={<CgSortAz size={22} />}
            onSelect={handleStatusSelect}
          />
        </div>
      </div>
      {/* Table */}
      <MyOrdersTable orders={ordersData} />
    </div>
    </div>
  );
};

export default MyAccountPage;
