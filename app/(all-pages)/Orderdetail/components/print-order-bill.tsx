"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PriceLabel from "../../shopping-card/components/price-label";
import { Button } from "@/components/ui/button";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { OrderData } from "../type";
import {
  calculateFinalTotal,
  calculateTotalDiscount,
  calculateTotalPrice,
  calculateTotalShippingCost,
} from "@/lib/calcPricesAndOffers"; 
import { get_currency_key } from "@/lib/cookie/cookie.clients";

const PrintOrderBill = ({ Bill }: { Bill: OrderData }) => {
  const currency = get_currency_key()
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [orderItems] = useState(Bill?.pagedOrderDetails?.items);

  const totalPrice = calculateTotalPrice(
    orderItems.map((e) => ({
      priceAfterDiscount: null,
      price: e.price,
      quantity: e.quantity,
    }))
  );
  const totalShipcost = calculateTotalShippingCost(
    orderItems.map((e) => ({
      shipCost: e.shipCost,
      quantity: e.quantity,
      amountYouBuy: 0,
      amountYouGet: 0,
      extraQuantity: e.extraQuantity,
    }))
  );
  const totalDiscount = calculateTotalDiscount(
    orderItems.map((e) => ({
      priceAfterDiscount: null,
      price: e.price,
      quantity: e.quantity,
    }))
  );

  const finalPrice = calculateFinalTotal(
    orderItems.map((e) => ({
      shipCost: e.shipCost,
      quantity: e.quantity,
      amountYouBuy: 0,
      amountYouGet: 0,
      extraQuantity: e?.extraQuantity,
      price: e.price,
      priceAfterDiscount: e.price,
    }))
  );

  const handlePrint = () => {
    reactToPrintFn();
  };

  return (
    <div>
      {
        <CardContent
          ref={contentRef}
          className="text-sm p-0 mdHalf:p-6 mdHalf:pt-0 pb-6 m-4 hidden print:block"
        >
          <PriceLabel title="المجموع" price={totalPrice} />
          <PriceLabel title="الشحن" price={totalShipcost} />
          <PriceLabel title="الخصم" price={totalDiscount} />
          <hr className="my-2" />
          <div className="flex justify-between mb-2">
            <span className="font-semibold">الإجمالي</span>
            <span className="font-semibold">
              {Bill.totalPrice} {currency}
            </span>
          </div>
        </CardContent>
      }
      <Card className="mdHalf:sticky mdHalf:top-[100px] mdHalf:z-10 border-white shadow-none  mdHalf:border-gray-200 ">
        <CardHeader className="p-0 mdHalf:p-6 ">
          <div className="flex items-center mb-4 gap-x-2">
            <FaMoneyCheckAlt className="text-2xl text-primary-background" />
            <h2 className="text-sm mdHalf:text-center font-bold ">
              تفاصيل قيمة الطلب
            </h2>
          </div>
        </CardHeader>
        <CardContent className="text-sm p-0 mdHalf:p-6 mdHalf:pt-0 pb-6 ">
          <PriceLabel title="المجموع" price={totalPrice} />
          <PriceLabel title="الشحن" price={totalShipcost} />
          <PriceLabel title="الخصم" price={totalDiscount} />
          <hr className="my-2" />
          <div className="flex justify-between mb-2">
            <span className="font-semibold">الإجمالي</span>
            <span className="font-semibold">
              {finalPrice} {currency}
            </span>
          </div>
        </CardContent>
        {
          <CardFooter>
            <div className="w-full">
              <Button
                onClick={handlePrint}
                className="bg-primary hover:bg-orange-600 text-white text-base  w-full"
              >
                تصدير PDF
              </Button>
            </div>
          </CardFooter>
        }
      </Card>
    </div>
  );
};

export default PrintOrderBill;
