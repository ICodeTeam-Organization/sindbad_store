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
  console.log(items);
  return (
    <Card className="p-6 mb-4">
      {isPending ? (
        <Loader2 className="animate-spin text-center mx-auto" />
      ) : items.data.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-300">
              <th className="text-right font-semibold">المنتج</th>
              <th className="text-right font-semibold">السعر</th>
              <th className="text-right font-semibold">الكمية</th>
              <th className="text-right font-semibold">الأجمالي</th>
              <th className="text-right font-semibold"></th>
            </tr>
          </thead>
          <tbody className=" h-72 overflow-auto">
            {items.data.map((item: CartItem) => (
              <ProductRow
                key={item.cartId}
                id={item.cartId}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.imageUrl}
                refreshItems={refetch}
                shipCost={item.shipCost}
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
