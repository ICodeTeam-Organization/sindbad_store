"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import PriceLabel from "./price-label";
import { CartItem } from "@/types/storeTypes";
import { calculateBonus } from "@/lib/utils";
import { useRouter } from "next-nprogress-bar";
import { get_currency_key } from "@/lib/cookie/cookie.clients";

// Function to calculate the total price
const calculateTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems?.reduce((total, item) => {
    const price = item.priceAfterDiscount || item.price;
    return total + price * item.quantity;
  }, 0);
}; 
// Function to calculate the total shipping cost
const calculateTotalShippingCost = (cartItems: CartItem[]): number => {
  return cartItems?.reduce((total, item) => {
    const shipCost = item.shipCost || 0;
    return (
      total +
      shipCost *
        (item.quantity +
          (calculateBonus(
            item.quantity,
            item.amountYouBuy || 0,
            item.amountYouGet || 0
          ) || 0))
    );
  }, 0);
}; 
// Function to calculate the total discount
const calculateTotalDiscount = (cartItems: CartItem[]): number => {
  const totalOldPrice = cartItems?.reduce((total, item) => {
    const oldPrice =
      item.priceAfterDiscount !== null && item.priceAfterDiscount < item.price
        ? item.price - item.priceAfterDiscount
        : 0;
    return total + oldPrice * item.quantity;
  }, 0);
  return totalOldPrice;
}; 
const calculateFinalTotal = (cartItems: CartItem[]): number => {
  const totalPrice = cartItems?.reduce((total, item) => {
    const price = item.priceAfterDiscount || item.price || 0;
    return (
      total +
      price * item.quantity +
      item.shipCost *
        (item.quantity +
          (calculateBonus(
            item.quantity,
            item.amountYouBuy || 0,
            item.amountYouGet || 0
          ) || 0))
    );
  }, 0);
  return totalPrice;
};

const Summary = ({
  cartItems,
  isRefetching,
}: {
  cartItems: CartItem[];
  isRefetching: boolean;
}) => {

 const currency = get_currency_key()
  cartItems = cartItems.filter((e) => e.quantity > 0);
  const router = useRouter()
  const [addressError, setaddressError] = useState(false)
  const handleCheckout =()=>{
    const address = sessionStorage.getItem("cartAddress");
    if (address && address.length > 0) {
      router.push("/checkout")
    } else {
      setaddressError(true)
    }
   }


  return (
    <Card className="mdHalf:sticky mdHalf:top-[100px] mdHalf:z-10 ">
      <CardHeader>
        <h2 className="text-lg text-center font-bold mb-4">
          تفاصيل قيمة الطلب
        </h2>
      </CardHeader>
      <CardContent>
        <PriceLabel
          title="الإجمالي"
          price={calculateTotalPrice(cartItems) || 0}
        />
        <PriceLabel
          title="الشحن"
          price={calculateTotalShippingCost(cartItems) || 0}
        />
        <PriceLabel
          title="الخصم"
          price={calculateTotalDiscount(cartItems) || 0}
        />
        <hr className="my-2" />
        <div className="flex justify-between mb-2">
          <span className="font-semibold">الإجمالي</span>
          <span className="font-semibold">
            {calculateFinalTotal(cartItems)?.toFixed(2) || 0} {currency}
          </span>
        </div>
      </CardContent>
      {isRefetching ? (
        <CardFooter>
          <div className="w-full text-center text-black text-base">
            جاري تحديث الإجمالي
          </div>
        </CardFooter>
      ) : (
        cartItems.length > 0 && (
          <CardFooter className="flex-col">
            <div onClick={handleCheckout}  className=" w-full">
              <Button className="bg-primary hover:bg-orange-600 text-white text-lg  w-full">
                ادخال سند السداد
                <ArrowLeft className="mr-3 " />
              </Button>
            </div>
            
            { addressError &&  <p className="mt-2 text-sm text-red-600 ">    يجب ان تحدد عنوانا للإستلام    </p>}
          </CardFooter>

        )
      )}
    </Card>
  );
};

export default Summary;

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { ArrowLeft } from "lucide-react";
// import PriceLabel from "./PriceLabel";

// const InvoiceDetails = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <h1 className="text-center text-lg font-bold">تفاصيل قيمة الطلب</h1>
//       </CardHeader>
//       <CardContent>
//         <ul className="w-full">
//           <PriceLabel price={350.0} title="المجموع" />
//           <PriceLabel price={350.0} title="الشحن" />
//           <PriceLabel price={350.0} title="الخصم" />
//         </ul>
//         <div className="w-full flex justify-between pt-3 border-t border-t-gray-300">
//           <span className="font-bold text-lg">الإجمالي :</span>
//           <span className="font-bold text-lg">352 ر.س</span>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="w-full bg-primary hover:bg-orange-600 text-lg font-bold">
//           أدخال سند السداد
//           <ArrowLeft className="mr-4" />
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default InvoiceDetails;
