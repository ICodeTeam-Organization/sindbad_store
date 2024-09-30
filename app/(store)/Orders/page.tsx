import BreadCrumb from "@/components/BreadCrumb";
import MyOrders from "./Components/MyOrders";
import Pagination from "@/components/Pagination";
import React from "react";

const Orders = () => {
  return (
    <>
      <BreadCrumb SecondName="طلباتي" SecondDir="" />
      <div className="m-auto my-16">
        <div className="mx-8 m-auto border-2 rounded-sm py-3 mt-6">
          <p className="pr-6 pb-3 text-lg font-bold">طلباتي</p>
          <MyOrders />
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Orders;
