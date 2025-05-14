"use client";
import { getApi } from "@/lib/http";
import ProductRow from "./product-row";
import { CartItem } from "@/types/storeTypes";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import InvoiceDetails from "./invoice-details";
import { useEffect } from "react";
import { useCartStore } from "@/app/stores/cartStore";

const CartBody = ({
  initCartProducts,
}: {
  initCartProducts: { data: CartItem[] };
}) => {
  const { items:cartItems ,setCartItems} = useCartStore();

  const {
    data: items,
    isPending, 
    isRefetching, 
  } = useQuery({
    queryKey: ["cart-data"],
    queryFn: async () =>
      await getApi<any>("Cart/GetAllCustomerProductsInCartForViewInCartPage"),
    initialData: initCartProducts,
  });

  
  useEffect(()=>{
    if (items) {
      setCartItems(items?.data) 
    }
  },[items])

  return (
    <>
      <div className="lg:w-3/4 mdHalf:w-[65%] ">
        <Card className="p-6 mb-4 w-full overflow-x-auto">
          {isPending ? (
            <Loader2 className="animate-spin text-center mx-auto" />
          ) : items.data.length > 0 && cartItems.some(s=>s.quantity > 0) ? (
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
                      const isDeleted = item?.quantity == 0
                      if (isDeleted) {
                        return null
                      }
                      return (
                        <ProductRow
                          key={item.cartId}
                          cartItemData={item} 
                        />
                      )
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
        <InvoiceDetails cartItems={cartItems} isRefetching={isRefetching} />
      </div>
    </>
  );
};

export default CartBody;
