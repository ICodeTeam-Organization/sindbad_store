"use client";
import { Card } from "@/components/ui/card";
import Dropdown from "./dropdown";
import { getApi } from "@/lib/http";
import OrderDetails from "./order-details";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import LoadMoreButton from "@/components/LoadMoreButton";

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

const fetchProducts = async (pageNumber: number, pageSize: number) => {
  const response = await getApi<ApiResponse>(
    `SpecialProducts/GetAllSpecialProductsForViewInSpecialProductsPageByFilter?searchKeyWord=0&PageSize=${pageSize}&PageNumber=${pageNumber}`
  );
  console.log("response")
  console.log(response)
  return response.data;
};

const MyNewOrder = () => {
  const [AllNewOrders, setAllNewOrders] = useState<SpecialProduct[]>([]);
  const pageSize = 5;
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // حالة تحميل المزيد
  const [hiddenLoadingMore, setHiddenLoadingMore] = useState(true); // حالة تحميل المزيد

  const {
    data: newOrders,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["newSpecialOrder", pageNumber, pageSize],
    queryFn: () => {
      console.log("newOrders")
      console.log(newOrders)
      fetchProducts(pageNumber, pageSize)
      console.log(newOrders)
    },
    // enabled: false, // عدم تفعيل الاستعلام تلقائيًا
  });

  // دمج البيانات الجديدة مع القديمة عند استرجاعها
  useEffect(() => {
    if (newOrders && newOrders.success) {
      setAllNewOrders((prevOrders) => [...prevOrders, ...newOrders.data.items]);
      if (
        newOrders?.data?.currentPage == newOrders?.data?.totalPages
      ) {
        setHiddenLoadingMore(true);
      }else{
        setHiddenLoadingMore(false);
      }
      setIsLoadingMore(false); // إيقاف حالة التحميل بعد تحميل البيانات
    }
  }, [newOrders]);

  const loadMore = () => {
    setIsLoadingMore(true); // تفعيل حالة التحميل
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage); // زيادة رقم الصفحة
    // refetch(); // استرجاع البيانات للصفحة الجديدة
  };

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
          <Dropdown name="اختر الفئة" />
        </div>
      </div>
      <div className="row">
        {isLoading && !isLoadingMore ? (
          <Loader2 className="animate-spin text-center mx-auto" />
        ) : AllNewOrders ? (
          <>
            {AllNewOrders.map((NewOrder: any) => (
              <OrderDetails
                key={NewOrder.id}
                OrderDetails={NewOrder}
                DisplayPrice={"hidden"}
              />
            ))}

            {hiddenLoadingMore ? <h1 className="text-center">لاتوجد طلبات حاليا</h1> : (
              <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />
            )}
          </>
        ) : (
          <h1 className="text-center">لاتوجد طلبات حاليا</h1>
        )}
      </div>
    </Card>
  );
};

export default MyNewOrder;
