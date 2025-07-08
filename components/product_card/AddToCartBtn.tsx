"use client";
import {
  MdOutlineAddShoppingCart, 
} from "react-icons/md";
import { useRouter } from "next-nprogress-bar";
import { useSession } from "next-auth/react"; 
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { CartItem } from "@/types/storeTypes";
import { useCartStore } from "@/app/stores_mangament/cartStore";

interface PropsTypes {
  id: string | number;
  productInfo: {
    image: string;
    productName: string;
    price: number;
    oldPrice?: number;
    amountYouBuy?: number;
    amountYouGet?: number;
    shipCost?: number;
  };
}

function AddToCartBtn({ id, productInfo }: PropsTypes) {
  const redirct = useRouter();
  const { status } = useSession();

  const {
    addItem,
    items: cartItems,
    updateQuantity,
    removeItem,
  } = useCartStore();

  const inCart = cartItems.find((ele) => ele.productId == id);

  const [quantity, setQuantity] = useState<number>(inCart?.quantity || 0);

  useEffect(() => {
    setQuantity(inCart?.quantity || 0);
  }, [inCart]);

  const increamentQ = () => {
    if (inCart) {
      setIsUpdated(true);
      const newQ = quantity + 1;
      setQuantity(newQ);
    }
  };

  const decreamentQ = () => {
    if (inCart) {
      setIsUpdated(true);
      const newQ = quantity - 1;
      setQuantity(newQ);
    }
  };

  const handleAddToCart = () => {
    if (status === "unauthenticated") redirct.push("/auth");
    else if (status === "authenticated") {
      const newCart: CartItem = {
        productId: +id,
        quantity: 1,
        amountYouBuy: !!productInfo?.amountYouBuy
          ? productInfo?.amountYouBuy
          : undefined,
        amountYouGet: !!productInfo?.amountYouGet
          ? productInfo?.amountYouGet
          : undefined,
        imageUrl: productInfo?.image,
        price: productInfo?.oldPrice || 0,
        priceAfterDiscount: productInfo?.price,
        name: productInfo?.productName,
        shipCost: 0,
        cartId: 0,
      };
      setQuantity(1);
      addItem(newCart);
    }
  };

  const [isUpdated, setIsUpdated] = useState(false);
  const debounceQuantity = useDebounce(quantity, 0);
  useEffect(() => {
    if (debounceQuantity >= 0 && isUpdated) {
      setIsUpdated(false);
      if (inCart) {
        if (quantity == 0) {
          removeItem(+id);
        } else {
          updateQuantity(quantity, +id);
        }
      }
    }
  }, [debounceQuantity]);

  return (
    //  absolute  z-[1] bottom-2 left-2 w-fut
    <div
      className="cursor-pointer flex gap-x-2 inset-40  shadow-md rounded-full"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {inCart ? (
        <div
          className="h-[22px]   rounded-sm bg-white bg-opacity-85 flex justify-center items-center px-1 max-md:px-1"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            className="text-sm  px-2 h-[90%] aspect-square flex items-center justify-center rounded-full "
            onClick={() => {
              increamentQ();
            }}
          >
            <Plus size={10} />
          </div>
          {
            <input
              value={quantity}
              type="number"
              onChange={(e) => {
                setQuantity(+e.target.value);
                setIsUpdated(true);
              }}
              className=" w-6 bg-transparent  text-center text-[11px] remove-arrow outline-none"
            />
          }
          <div
            className="text-sm  px-2 h-[90%] aspect-square flex items-center justify-center rounded-full "
            onClick={() => {
              if (quantity > 0) {
                decreamentQ();
              }
            }}
          >
            <Minus size={10} />
          </div>
        </div>
      ) : (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          className="p-2 bg-white rounded-full bg-opacity-85  hover:bg-primary hover:text-white cursor-pointer duration-300  "
        >
          <MdOutlineAddShoppingCart />
        </div>
      )}
    </div>
  );
}

export default AddToCartBtn;
