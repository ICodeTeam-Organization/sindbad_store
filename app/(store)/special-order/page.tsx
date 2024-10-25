"use client";
import React from "react";
import AddSpecialOrder from "./components/add-special-order";
import { Card, CardHeader } from "@/components/ui/card";
import TabButton from "./components/tab-button";
import MyNewOrders from "./components/my-new-orders";
import OrdersWaitingForAcceptPrice from "./components/orders-waiting-for-accept-price";
import PreviousOrder from "./components/previous-order";
import BreadCrumb from "@/components/BreadCrumb";

const SpecialOrderPage = () => {
  const [MyNewOrder, setMyNewOrder] = React.useState<boolean>(true);
  const [OrdersWaitingForAccept, setOrdersWaitingForAccept] =
    React.useState<boolean>(false);
  const [PreviousOrders, setPreviousOrders] = React.useState<boolean>(false);
  const handleChangeForm = () => {
    setMyNewOrder(true);
    setOrdersWaitingForAccept(false);
    setPreviousOrders(false);
  };
  const handleChangeForm2 = () => {
    setMyNewOrder(false);
    setOrdersWaitingForAccept(true);
    setPreviousOrders(false);
  };
  const handleChangeForm3 = () => {
    setMyNewOrder(false);
    setOrdersWaitingForAccept(false);
    setPreviousOrders(true);
  };
  return (
    <>
      <BreadCrumb
        SecondName="المتجر"
        SecondDir=""
        ThirdName="طلب خاص"
        ThirdDir=""
      />
      <AddSpecialOrder />
      <Card className="m-auto w-11/12 pt-0 border-0">
        <CardHeader className="pt-0 px-0 m-auto ">
          <TabButton
            MyNewOrder={MyNewOrder}
            handleChangeForm={handleChangeForm}
            handleChangeForm2={handleChangeForm2}
            handleChangeForm3={handleChangeForm3}
            OrdersWaitingForAccept={OrdersWaitingForAccept}
            PreviousOrders={PreviousOrders}
          />
        </CardHeader>
        {MyNewOrder ? (
          <MyNewOrders />
        ) : OrdersWaitingForAccept ? (
          <OrdersWaitingForAcceptPrice />
        ) : (
          <PreviousOrder />
        )}
      </Card>
    </>
  );
};

export default SpecialOrderPage;
