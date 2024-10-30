
"use client";
import { Card } from "@/components/ui/card";
import Dropdown from "./dropdown";
import { getApi } from '@/lib/http';
import OrderDetails from "./order-details";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface SpecialProduct {
  id?: number;
  requiredProductName?: string;
  moreDetailsAboutProduct?: string;
  linkUrl?: string;
  specialProductImageForViews?: Array<{
    imageUrl: string;
    id: number;
  }>;
  specialProductType?: string;
  shippingCost?: number;
  price?: number;
  totalPrice?: number;
  quantity?: number;
  specialProductStatus?: string;
  createdate?: string; 
}
// واجهة تمثل استجابة API
interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    items: SpecialProduct[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

const fetchProducts = async (pageNumber = 1, pageSize = 15): Promise<ApiResponse> => {
  const response = await getApi(`SpecialProducts/GetAllSpecialProductsForViewInSpecialProductsPageByFilter?searchKeyWord=0&PageSize=${pageSize}&PageNumber=${pageNumber}`);
  return response;
};

const MyNewOrder = () => {

  // const AllNewOrders = await getApi<any>(
  //   'SpecialProducts/GetAllSpecialProductsForViewInSpecialProductsPageByFilter?searchKeyWord=0&PageSize=15&PageNumber=1'
  // )

  // const {
  //   data: AllNewOrders,
  //   isPending,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["rdata"],
  //   queryFn: async () =>
  //     await getApi<any>("SpecialProducts/GetAllSpecialProductsForViewInSpecialProductsPageByFilter?searchKeyWord=0&PageSize=10&PageNumber=1"
  //     ),
  // });

  const [AllNewOrders, setAllNewOrders] = useState<SpecialProduct[]>([]);
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(1); 

  const {
    data: newOrders,
    isPending,
    refetch,
  } = useQuery<ApiResponse>({
    queryKey: ["rdata", pageNumber, pageSize],
    queryFn: () => fetchProducts(pageNumber, pageSize),


  });

   // دمج البيانات الجديدة مع القديمة عند استرجاعها
  //  if (newOrders && Array.isArray(newOrders)) {
  //   setAllNewOrders((prevOrders) => [...prevOrders, ...newOrders?.data?.items]);
  // }

    // دمج البيانات الجديدة مع القديمة عند استرجاعها
    useEffect(() => {
      if (newOrders && newOrders.success) {
        setAllNewOrders((prevOrders) => [...prevOrders, ...newOrders.data.items]);
      }
    }, [newOrders]);

    const loadMore = () => {
      setPageNumber((prev) => prev + 1); // زيادة رقم الصفحة
      refetch(); // استرجاع البيانات مرة أخرى
    };

  console.log("---------------$$-----------------")
  console.log(newOrders?.data?.items)
  // console.log("--------------##newOrders-----------------")
  // console.log(newOrders)
  console.log("--------------##AllNewOrders-----------------")
  console.log(AllNewOrders)

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

          AllNewOrders?(
            <>
            {AllNewOrders.map((NewOrder: any) => (
              <OrderDetails key={NewOrder.id} OrderDetails={NewOrder} DisplayPrice={"hidden"} />
            ))}
            <button onClick={loadMore}>
              الصفحة التالية
            </button>
          </>
          ):(
            <h1 className="text-center">لاتوجد طلبات حاليا</h1>
          )
        )}

        
      </div>
    </Card>
  );
};

export default MyNewOrder;
