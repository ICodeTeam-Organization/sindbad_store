"use client";
import { getApi } from "@/lib/http";
import ProductRow from "./product-row";
import { CartItem } from "@/types/storeTypes";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import InvoiceDetails from "./invoice-details";
import { useEffect, useState } from "react";
import useSendDataInBg from "@/hooks/useSendDataInBg"; 
import { useCartStore } from "@/app/stores_mangament/cartStore";
import { db } from "@/Data/database/db";
import { BgHandlerDataItemType } from "@/Data/cachingAndBgData/type";

type CartApiResponse = {
  data: CartItem[];
};
const CartBody = ({}: // initCartProducts,
{
  // initCartProducts: { data: CartItem[] };
}) => {
  const { items: cartItems, setCartItems } = useCartStore();

  const {
    mutate,
    isPending: isPendingForSendDataInBg,
    isSuccess,
  } = useSendDataInBg();
  const [isReadytogetData, setIsReadytogetData] = useState(false);
  useEffect(() => {
    (async () => {
      if (!isSuccess) {
        setCartItems([]);
        const bgData: BgHandlerDataItemType[] = await db.bgData
          .where("reqType")
          .anyOf(3, 4)
          .toArray(); 
        mutate(bgData);
      } else {
        setIsReadytogetData(true);
      }
      if (isSuccess) {
        setIsReadytogetData(true);
      }
    })();
  }, [isSuccess]);

  const {
    data: items,
    isPending: isPendingToCartItems,
    isRefetching,
  } = useQuery<CartApiResponse>({
    queryKey: ["cart-data"],
    queryFn: async () =>
      await getApi<CartApiResponse>(
        "Cart/GetAllCustomerProductsInCartForViewInCartPage"
      ),
    // initialData: initCartProducts,
    enabled: isReadytogetData,
  });

  useEffect(() => {
    if (!!items) {
      setCartItems(items.data);
    }
  }, [items]);

  return (
    <>
      <div className="lg:w-3/4 mdHalf:w-[65%] ">
        <Card className="p-6 mb-4 w-full overflow-x-auto">
          {isPendingToCartItems || isPendingForSendDataInBg ? (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 8 }).map((_, x) => (
                <div
                  key={x}
                  className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm"
                >
                  <div className="w-20 h-20 bg-gray-300 rounded-md mx-2"></div>

                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>

                  <div className="w-10 h-6 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : cartItems.length != 0 && cartItems.some((s) => s.quantity > 0) ? (
            <div className="">
              {/* web table or big screens */}
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto whitespace-nowrap">
                  <thead>
                    <tr className="text-center font-semibold text-sm mb-4 ">
                      <th className="px-8 py-2">المنتج</th>
                      <th className="px-8 py-2">السعر</th>
                      <th className="px-8 py-2">الكمية</th>
                      <th className="px-8 py-2">تكلفة الشحن</th>
                      <th className="px-8 py-2">الإجمالي</th>
                      <th className="px-8 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item: CartItem) => {
                      const isDeleted = item?.quantity == 0;
                      if (isDeleted) {
                        return null;
                      }
                      return (
                        <ProductRow key={item.cartId} cartItemData={item} />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="w-full p-5 flex justify-center items-center h-[270px]">
              لا يوجد أي منتج في سلة المشتريات
            </div>
          )}
        </Card>
      </div>

      <div className="lg:w-1/4 mdHalf:w-[35%] ">
        <InvoiceDetails
          // عشان اذا فيه عناصر في ال cartItems ما يعرض السعر حقها اذا كان يعمل فتش للداتا المحدثه
          cartItems={
            isPendingForSendDataInBg || isPendingToCartItems ? [] : cartItems
          }
          isRefetching={isRefetching}
        />
      </div>
    </>
  );
};

export default CartBody;
