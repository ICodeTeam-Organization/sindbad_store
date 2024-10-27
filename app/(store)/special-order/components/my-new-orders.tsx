
"use client";
import { Card } from "@/components/ui/card";
import Dropdown from "./dropdown";
import { getApi } from '@/lib/http';
import OrderDetails from "./order-details";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const MyNewOrder = () => {

  // const AllNewOrders = await getApi<any>(
  //   'SpecialProducts/GetAllSpecialProductsForViewInSpecialProductsPageByFilter?searchKeyWord=0&PageSize=15&PageNumber=1'
  // )

  const {
    data: AllNewOrders,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["rdata"],
    queryFn: async () =>
      await getApi<any>("SpecialProducts/GetAllSpecialProductsForViewInSpecialProductsPageByFilter?searchKeyWord=0&PageSize=10&PageNumber=1"
      ),
  });

  // console.log("---------------$$-----------------")
  // console.log(AllNewOrders?.data?.items)
  // console.log("--------------##-----------------")
  // console.log(AllNewOrders)
  return (
    <Card className="rounded-none border-black p-6">
      <div className="flex flex-col gap-2 sm:flex-row justify-around items-center border m-auto border-black  py-2">
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">نوع الطلب</h1>
          <Dropdown name="منتج" />
        </div>
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">الفئة الرئيسية :</h1>
          <Dropdown name="اختر الفئة" />
        </div>
        <div className="flex items-center m-auto">
          <h1 className="ml-2 m-auto">الفئة الفرعية :</h1>
          <Dropdown name="اختر الفئة"/>
        </div>
      </div>
      <div className="row">
        {isPending?(
          <Loader2 className="animate-spin text-center mx-auto" />
        ):(
          AllNewOrders?.data?.items?(
            AllNewOrders?.data?.items?.map(( NewOrder :any) =>{
              return <OrderDetails OrderDetails={ NewOrder } DisplayPrice={"hidden"}/>
            })
          ):(
            <h1 className="text-center">لاتوجد طلبات حاليا</h1>
          )
        )}

        
      </div>
    </Card>
  );
};

export default MyNewOrder;
