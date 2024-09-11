"use client";

import { CartItem, Product } from "@/types/storeTypes";
import ProductRow from "./ProductRow";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/app/stores/cartStore";
import { useEffect } from "react";

const CartTable = () => {
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const products: Product[] = [
      {
        id: "asfdawefdcsc",
        name: "شاششة تلفاز 120 بوصة تحتوي على قاعدة",
        price: 150,
        image: "store.svg",
      },
      {
        id: "assfdawdefdcsc",
        name: "أيفون 16 برو مكس",
        price: 25,
        image: "store.svg",
      },
      {
        id: "assfdawefdecsc",
        name: "أيفون 16 برو مكس",
        price: 25,
        image: "store.svg",
      },
      {
        id: "assfdawefbdcsc",
        name: "أيفون 16 برو مكس",
        price: 25,
        image: "store.svg",
      },
      {
        id: "assfdawefdchsc",
        name: "أيفون 16 برو مكس",
        price: 25,
        image: "store.svg",
      },
      {
        id: "assfdawefdcisc",
        name: "أيفون 16 برو مكس",
        price: 25,
        image: "store.svg",
      },
      {
        id: "assfdawefdcpsc",
        name: "أيفون 16 برو مكس",
        price: 25,
        image: "store.svg",
      },
      {
        id: "assfdawefdcqsc",
        name: "أيفون 16 برو مكس",
        price: 25,
        image: "store.svg",
      },
      {
        id: "assfdawefdcqqqsc",
        name: "أيفون 16 برو مكس",
        price: 25,
        image: "store.svg",
      },
    ];
    products.forEach((prod) => {
      const item: CartItem = {
        product: prod,
        quantity: 1,
      };
      addItem(item);
    });
  }, [addItem]);

  return (
    <Card className="p-6 mb-4">
      {cartItems.length > 0 ? (
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
            {cartItems.map((item) => (
              <ProductRow
                key={item.product.id}
                id={item.product.id}
                name={item.product.name}
                price={item.product.price}
                quantity={item.quantity}
                image={item.product.image}
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
