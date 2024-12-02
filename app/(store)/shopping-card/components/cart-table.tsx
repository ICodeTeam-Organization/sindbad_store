"use client";
import { getApi } from "@/lib/http";
import ProductRow from "./product-row";
import { CartItem } from "@/types/storeTypes";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const CartTable = () => {
  const {
    data: items,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["refresh-data"],
    queryFn: async () =>
      await getApi<any>("Cart/GetAllCustomerProductsInCartForViewInCartPage"),
  });
  return (
    <Card className="p-6 mb-4">
      {isPending ? (
        <Loader2 className="animate-spin text-center mx-auto" />
      ) : items.data.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className=" text-right font-semibold text-sm">
              <th className="">المنتج</th>
              <th className="">السعر</th>
              <th className="">الكمية</th>
              <th className=""> تكلفة الشحن</th>
              <th className="">الأجمالي</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody className=" h-72 overflow-auto">
            {items.data.map((item: CartItem) => (
              <ProductRow
                key={item.cartId}
                id={item.cartId}
                name={item.name || ""}
                price={item.price || 0}
                quantity={item.quantity}
                image={item.imageUrl}
                refreshItems={refetch}
                shipCost={item.shipCost || 0}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full p-5 flex justify-center items-center">
          لا يوجد أي منتج في سلة المشتريات
        </div>
      )}
    </Card>
  );
};

export default CartTable;
