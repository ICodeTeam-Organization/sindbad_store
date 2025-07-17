"use client"; 
import { getApi } from "@/lib/http"; 
import { CartItem } from "@/types/storeTypes"; 
import { useQuery } from "@tanstack/react-query";
import InvoiceDetails from "./invoice-details";
import { useEffect } from "react";
import useSendDataInBg from "@/hooks/useSendDataInBg";
import { useCartStore } from "@/app/stores_mangament/cartStore";
import { db } from "@/Data/database/db";
import { BgHandlerDataItemType } from "@/Data/cachingAndBgData/type"; 
import CartTable from "./CartTable";
import Shippingoptions from "./Shippingoptions";
import PaymentInfo from "./PaymentInfo";

type CartApiResponse = {
  data: CartItem[];
};
const CartBody = ({}: // initCartProducts,
{
  // initCartProducts: { data: CartItem[] };
}) => {

  const { items: cartItems, setCartItems } = useCartStore();

  const {
    mutateAsync,
    isPending: isPendingForSendDataInBg, 
  } = useSendDataInBg();
  // const [isReadytogetData, setIsReadytogetData] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     if (!isSuccess) {
  //       setCartItems([]);
  //       const bgData: BgHandlerDataItemType[] = await db.bgData
  //         .where("reqType")
  //         .anyOf(3, 4)
  //         .toArray();
  //       await mutateAsync(bgData);
  //     } else {
  //       setIsReadytogetData(true);
  //     }
  //     if (isSuccess) {
  //       setIsReadytogetData(true);
  //     }
  //   })();
  // }, [isSuccess]);

  const {
    data: items,
    isPending: isPendingToCartItems,
    isRefetching,
  } = useQuery<CartApiResponse>({
    queryKey: ["cart-data"],
    queryFn: async () =>{
        const bgData: BgHandlerDataItemType[] = await db.bgData
          .where("reqType")
          .anyOf(3, 4)
          .toArray();
        await mutateAsync(bgData);
        return await getApi<CartApiResponse>(
          "Cart/GetAllCustomerProductsInCartForViewInCartPage"
        );
    },
    // initialData: initCartProducts,
    // enabled: isReadytogetData,
    gcTime: 0, // يمنع تخزين البيانات في الكاش
    staleTime: 0, // البيانات تعتبر دائمًا قديمة
  });

  useEffect(() => {
    if (!!items) {
      setCartItems(items.data);  
      console.log("Cart items updated:", items.data);
    } 
  }, [items]);

  return (
    <>
      <div className="lg:w-3/4 mdHalf:w-[65%] ">
        <div className="p-4 bg-white rounded-lg ">
          <h1 className="text-lg font-semibold ">
            سلة المشتريات {`(${cartItems.length})`}
          </h1>
        </div> 
        <CartTable
          cartItems={cartItems}
          loading={isPendingToCartItems || isPendingForSendDataInBg}
        />
      </div>

       {/* mdHalf:sticky mdHalf:top-[100px] mdHalf:z-10 */}
      <div className="lg:w-1/4 mdHalf:w-[35%]  ">
        <Shippingoptions />
        <InvoiceDetails
          // عشان اذا فيه عناصر في ال cartItems ما يعرض السعر حقها اذا كان يعمل فتش للداتا المحدثه
          cartItems={
            isPendingForSendDataInBg || isPendingToCartItems ? [] : cartItems
          }
          isRefetching={isRefetching}
        />
        <PaymentInfo />
      </div>
    </>
  );
};

export default CartBody;
