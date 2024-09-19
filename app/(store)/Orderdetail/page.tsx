import React from "react";
import Orderdetails from "./Components/Orderdetails";
import PrintOrderBill from "./Components/PrintOrderBill";
import BreadCrumb from "@/components/BreadCrumb";

const OrderDetail = () => {
  return (
    <>
      <BreadCrumb
        SecondName="طلباتي"
        SecondDir=""
        ThirdName="تفاصيل الطلب"
        ThirdDir=""
      />
      <div className="m-auto my-16">
        <div className="mx-8 m-auto rounded-sm py-3 mt-6">
          <div className="flex justify-between items-center border-2 p-3 max-md:text-xs text-lg">
            <div className="flex max-sm:flex-wrap justify-center m-auto">
              <p className="text-gray-600">رقم الطلب :</p>
              <p className="pr-3 font-bold text-gray-700">654564</p>
            </div>
            <div className="flex max-sm:flex-wrap  justify-between items-center m-auto">
              <p className="text-gray-600">تاريخ الطلب :</p>
              <p className="pr-3 font-bold text-gray-700">15/10/2024</p>
            </div>
            <div className="flex max-sm:flex-wrap  justify-start items-center m-auto">
              <p className="text-gray-600">حالة الطلب :</p>
              <p className="pr-3 font-bold text-gray-700">في الطريق</p>
            </div>
          </div>
          <Orderdetails />
        </div>
      </div>
      <PrintOrderBill />
    </>
  );
};

export default OrderDetail;
