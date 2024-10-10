"use client";

import { Card } from "@/components/ui/card";
import { CartItem } from "@/types/storeTypes";
import React from "react";
import ProductRow from "./ProductRow";

type Prop = {
  items: any;
};
const CardComponent = ({ items }: Prop) => {
  return (
    <Card className="p-6 mb-4">
      {items.data.length > 0 ? (
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

export default CardComponent;
