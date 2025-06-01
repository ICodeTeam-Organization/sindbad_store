"use client";
import { useCartStore } from "@/app/stores/cartStore";
import { Button, ButtonProps } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BiCart, BiMinus, BiPlus } from "react-icons/bi";

// Extend ButtonProps and add a custom prop for total price
interface AddSpecialOrderToCartButtonProps extends ButtonProps {
  totalPrice: number; // Custom prop to specify the total price
  pricingId?: number;
}

const AddSpecialOrderToCartButton: React.FC<
  AddSpecialOrderToCartButtonProps
> = ({ totalPrice = 0, className, pricingId, ...props }) => {
  const { toast } = useToast();
  const {
    addSpecialItem,
    items: cartItems,
    removeItem: removeFromCart,
    updateQuantity,
  } = useCartStore();

  const isInCart = cartItems.find((e) => e.specialProductId == pricingId);

  const [quantity, setQuantity] = useState(isInCart ? isInCart.quantity : 0);

  useEffect(() => { 
    if (pricingId) {
      const getfromCart = cartItems.find((e) => e.specialProductId == pricingId);
      setQuantity(getfromCart ? getfromCart.quantity : 0);
    }
  }, [pricingId,cartItems]);

  const handleAccept = () => {
    if (!pricingId) {
      toast({
        variant: "default",
        description: "يجب اختيار منتج مسعر",
        style: {
          backgroundColor: "red",
          color: "#fff",
        },
      });
      return;
    }

    const newCart: any = {
      specialProductId: +pricingId,
      quantity: 1,
    };
    addSpecialItem(newCart);
    setQuantity(1);
    toast({
      variant: "default",
      description: "تم الإضافة الى السلة بنجاح",
    });
  };

  const changequantity = (newQ: number) => {
    if (pricingId) {
      if (newQ < 0) return;
      else {
        if (newQ == 0) removeFromCart(pricingId, true);
        else {
          setQuantity(newQ);
          updateQuantity(newQ, pricingId, true); // الباراميتر الثاث عشان نحدد اذا منتج عادي ولا خاص
        }
      }
    }
  };

  return (
    <>
      {!isInCart && (
        <Button
          {...props}
          className={cn(
            `bg-primary-background font-bold w-full hover:bg-primary-background hover:bg-opacity-60 text-sm`,
            !pricingId && "bg-gray-400 hover:bg-gray-400 hover:bg-opacity-100",
            className
          )}
          onClick={handleAccept}
          disabled={!pricingId}
        >
          {!pricingId ? (
            <span>اختر منتج من التسعيرات</span>
          ) : (
            <div className="flex items-center justify-center">
              <BiCart className="ml-4" size={20} />
              <span>إضافة للسلة ( {totalPrice.toFixed(3)} ريال سعودي )</span>
            </div>
          )}
        </Button>
      )}

      {isInCart && (
        <Button
          {...props}
          className={cn(
            `bg-primary-background font-bold w-full hover:bg-primary-background hover:bg-opacity-60 text-sm`,
            !pricingId && "bg-gray-400 hover:bg-gray-400 hover:bg-opacity-100",
            isInCart && "bg-zinc-200 hover:bg-zinc-200 hover:bg-opacity-100",
            className
          )}
        >
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => changequantity(quantity - 1)}
              className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center font-bold"
            >
              <BiMinus />
            </button>
            <span className="mx-2 text-black">{quantity}</span>
            <button
              onClick={() => changequantity(quantity + 1)}
              className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center font-bold"
            >
              <BiPlus />
            </button>
          </div>
        </Button>
      )}
    </>
  );
};

export default AddSpecialOrderToCartButton;
