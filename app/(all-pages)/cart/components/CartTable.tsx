import { CartItem } from "@/types/storeTypes";
import React from "react";
import CartProductItem from "./CartProductItem";
import Link from "next/link";
import { useSpecialOrdersDialogsStore } from "@/app/stores_mangament/specialordersDialogsStore";

interface Propstype {
  cartItems: CartItem[];
  loading?: boolean;
}

function CartTable({ cartItems, loading }: Propstype) {
  const { setShowSpecialOrderDialog } = useSpecialOrdersDialogsStore();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow-sm mt-2 h-52 flex flex-col items-center justify-center">
        <div className="text-center text-secondary py-4">
          لا توجد عناصر في سلة التسوق الخاصة بك.
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <Link href="/shop" className="text-primary hover:underline">
            العودة للتسوق
          </Link>
          <div
            onClick={() => {
              setShowSpecialOrderDialog(true);
            }}
            className="text-primary hover:underline"
          >
            طلب خاص
          </div>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="h-full bg-white mt-2 rounded-md">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm w-full animate-pulse"
            key={index}
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
    );
  }
  return cartItems.map((item) => (
    <CartProductItem
      cartItemData={item}
      key={item?.productId || item?.specialProductId}
    />
  ));
}

export default CartTable;
