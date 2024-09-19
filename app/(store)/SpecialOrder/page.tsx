"use client";
import AddSpecialOrder from "./Components/AddSpecialOrder";
import { Card, CardHeader } from "@/components/ui/card";
import TabButton from "./Components/TabButton";
import { useState } from "react";
import MyNewOrders from "./Components/MyNewOrders";
import OrdersWaitingForAcceptPrice from "./Components/OrdersWaitingForAcceptPrice";
import PreviousOrder from "./Components/PreviousOrder";
import BreadCrumb from "@/components/BreadCrumb";

const page = () => {
  const [MyNewOrder, setMyNewOrder] = useState<boolean>(true);
  const [OrdersWaitingForAccept, setOrdersWaitingForAccept] =
    useState<boolean>(false);
  const [PreviousOrders, setPreviousOrders] = useState<boolean>(false);
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
    <BreadCrumb SecondName="المتجر"SecondDir="" ThirdName="طلب خاص" ThirdDir=""/>
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

export default page;
