"use client";
import { getApi } from "@/lib/http";
import ProductRow from "./product-row";
import { CartItem } from "@/types/storeTypes";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InvoiceDetails from "./invoice-details";
const CartBody = ({
  initCartProducts,
}: {
  initCartProducts: { data: CartItem[] };
}) => {
  const {
    data: items,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["refresh-data"],
    queryFn: async () =>
      await getApi<any>("Cart/GetAllCustomerProductsInCartForViewInCartPage"),
    initialData: initCartProducts, // this to show products direct when open cart page, not show loading indicator , this data come from server first time
  });
  return (
    <>
      <div className="lg:w-3/4 mdHalf:w-[65%] ">
        <Card className="p-6 mb-4 w-full overflow-x-auto">
          {isPending ? (
            <Loader2 className="animate-spin text-center mx-auto" />
          ) : items.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto whitespace-nowrap">
                <thead>
                  <tr className="text-center font-semibold text-sm mb-4 ">
                    <th className="px-8 py-2">المنتج</th>
                    <th className="px-8 py-2">السعر</th>
                    <th className="px-8 py-2">الكمية</th>
                    <th className="px-8 py-2">تكلفة الشحن</th>
                    <th className="px-8 py-2">الأجمالي</th>
                    <th className="px-8 py-2"></th>
                  </tr>
                </thead>
                <tbody>
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
            </div>
          ) : (
            <div className="w-full p-5 flex justify-center items-center h-[270px]">
              لا يوجد أي منتج في سلة المشتريات
            </div>
          )}
        </Card>
      </div>

      <div className="lg:w-1/4 mdHalf:w-[35%] ">
        <InvoiceDetails cartItems={items.data}  />
      </div>
    </>
  );
};

export default CartBody;
