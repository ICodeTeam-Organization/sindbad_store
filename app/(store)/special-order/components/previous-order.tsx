"use client";
import { Card } from "@/components/ui/card";
import Dropdown from "./dropdown";
import { getApi } from '@/lib/http';
import OrderDetails from "./order-details";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Quantity from "./quantity";

const PreviousOrder = () => {
  const {
    data: AllPreviousOrders,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["AllPreviousOrdersdata"],
    queryFn: async () =>
      await getApi<any>("SpecialProducts/GetAllSpecialProductsForViewInSpecialProductsPageByFilter?searchKeyWord=2&PageSize=10&PageNumber=1"
      ),
  });
  return (
    <Card className="rounded-none border-black p-6">
      <div className="flex justify-around items-center border m-auto border-black  py-2">
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">نوع الطلب</h1>
          <Dropdown name="منتج" />
        </div>
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">الفئة الرئيسية :</h1>
          <Dropdown name="" />
        </div>
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">الفئة الفرعية :</h1>
          <Dropdown />
        </div>
      </div>
      <div className="row">
      {isPending?(
          <Loader2 className="animate-spin text-center mx-auto" />
        ):(
          AllPreviousOrders?.data?.items?(
            AllPreviousOrders?.data?.items?.map(( PreviousOrder :any) =>{
              return <OrderDetails OrderDetails={ PreviousOrder } DisplayButton={"hidden"}/>
            })
          ):(
            <h1 className="text-center">لاتوجد طلبات حاليا</h1>
          )
        )}
      </div>

    </Card>
  );
};

export default PreviousOrder;