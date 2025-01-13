"use client";
import React, { useState } from "react";
import AddSpecialOrder from "./components/add-special-order";
import { Card, CardHeader } from "@/components/ui/card";
import TabButton from "./components/tab-button";
import MyNewOrders from "./components/my-new-orders";
import OrdersWaitingForAcceptPrice from "./components/orders-waiting-for-accept-price";
import PreviousOrder from "./components/previous-order";
import BreadCrumb from "@/components/BreadCrumb";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"; 
import SpecialBulkOrderDialog from "./components/SpecialBulkOrderDialog";

const SpecialOrderPage = () => {
  
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");
  const category = searchParams.get("category");
  const show = searchParams.get("sh");
  const [showDialog, setshowDialog] = useState<boolean>(show=="1");

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

  const [ShwSia, setShwSia] = useState(false)
  return (
    <>
      <BreadCrumb
        SecondName="المتجر"
        SecondDir=""
        ThirdName="طلب خاص"
        ThirdDir=""
      />
      <Button onClick={()=>{setShwSia(true)}} >Opne</Button>
      <SpecialBulkOrderDialog
        show={ShwSia}
        setShow={setShwSia}
      />
      <AddSpecialOrder
        show={showDialog}
        setShow={setshowDialog}
        // This show dirct when the user select category from home
        tab={tab ? Number.parseInt(tab) : 1}
        category={category ? category : ""}
      />
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
