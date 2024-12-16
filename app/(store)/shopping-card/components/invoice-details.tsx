'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import React from "react";
import PriceLabel from "./price-label";
import Link from "next/link";
import { useCartStore } from "@/app/stores/cartStore";
import { CartItem } from "@/types/storeTypes";

// Function to calculate the total price
const calculateTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems?.reduce((total, item) => {
    const price = item.price || 0;
    return total + price * item.quantity;
  }, 0);
};

// Function to calculate the total shipping cost
const calculateTotalShippingCost = (cartItems: CartItem[]): number => {
  return cartItems?.reduce((total, item) => {
    const shipCost = item.shipCost || 0;
    return total + shipCost * item.quantity;
  }, 0);
};

// Function to calculate the total discount
const calculateTotalDiscount = (cartItems: CartItem[]): number => {
  const totalOldPrice = cartItems?.reduce((total, item) => {
    const oldPrice = (item.priceAfterDiscount !== null ? item.priceAfterDiscount : item.price) || 0;
    return total + oldPrice * item.quantity;
  }, 0);

  const totalNewPrice = calculateTotalPrice(cartItems);

  return totalOldPrice - totalNewPrice;
};

const calculateFinalTotal = (cartItems: CartItem[]): number => {
  const totalPrice = calculateTotalPrice(cartItems);

  const totalShippingCost = calculateTotalShippingCost(cartItems);

  const totalDiscount = calculateTotalDiscount(cartItems);

  const finalTotal = totalPrice + totalShippingCost - totalDiscount;

  return finalTotal;
};



const Summary = ({cartItems}:{cartItems:CartItem[]}) => {

 
  return (
    <Card className="mdHalf:sticky mdHalf:top-[100px] mdHalf:z-10 " >
      <CardHeader>
        <h2 className="text-lg text-center font-bold mb-4">
          تفاصيل قيمة الطلب
        </h2>
      </CardHeader>
      <CardContent>
        <PriceLabel title="الأجمالي" price={calculateTotalPrice(cartItems) || 0} />
        <PriceLabel title="الشحن" price={calculateTotalShippingCost(cartItems)|| 0} />
        <PriceLabel title="الخصم" price={calculateTotalDiscount(cartItems)|| 0} />
        <hr className="my-2" />
        <div className="flex justify-between mb-2">
          <span className="font-semibold">الأجمالي</span>
          <span className="font-semibold">{calculateFinalTotal(cartItems) || 0} رس</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={"/checkout"}  className=" w-full" >
          <Button className="bg-primary-background hover:bg-orange-600 text-white text-lg  w-full">
            ادخال سند السداد
            <ArrowLeft className="mr-3 " />
          </Button>
        </Link>
      </CardFooter>
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
//           <span className="font-bold text-lg">الأجمالي :</span>
//           <span className="font-bold text-lg">352 ر.س</span>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="w-full bg-primary-background hover:bg-orange-600 text-lg font-bold">
//           أدخال سند السداد
//           <ArrowLeft className="mr-4" />
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default InvoiceDetails;
