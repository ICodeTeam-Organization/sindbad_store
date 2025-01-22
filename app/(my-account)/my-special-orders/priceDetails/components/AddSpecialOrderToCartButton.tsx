"use client";
import { useCartStore } from "@/app/stores/cartStore";
import { Button, ButtonProps } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { putApi } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { BiCart } from "react-icons/bi";

// Extend ButtonProps and add a custom prop for total price
interface AddSpecialOrderToCartButtonProps extends ButtonProps {
  totalPrice: number; // Custom prop to specify the total price
  pricingId?: number;
}

const AddSpecialOrderToCartButton: React.FC<
  AddSpecialOrderToCartButtonProps
> = ({ totalPrice = 0, className, pricingId, ...props }) => {
  const { toast } = useToast();
  const {  addItem } = useCartStore();

  const { mutate, isPending } = useMutation({
    // mutationKey:[pricingId + "AcceptOrRejectOfferPriceByCustomer"],
    mutationFn: async () => {
      return await putApi(
        `SpecialProducts/Market/AcceptOrRejectOfferPriceByCustomer/${pricingId}/true`
      );
    },
    onSuccess: (data:any) => {
      const newCart = {
        cartId: data?.id,
        productId: data?.id,
        quantity: data?.quantity,
      };
      addItem(newCart)
      toast({
        variant: "destructive",
        description: "تم الإضافة الى السلة بنجاح",
      });
    },
    onError: (res) => {
      toast({
        variant: "destructive",
        description: res.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

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
    mutate();
  };

  return (
    <Button
      {...props} // Forward all remaining props to the Button component
      className={cn(
        `bg-primary-background font-bold w-full hover:bg-primary-background hover:bg-opacity-60 text-sm`,
        className
      )} // Merge className if provided
      onClick={handleAccept}
      disabled={isPending}
    >
      {isPending ? (
        <span> جاري التحميل ... </span>
      ) : (
        <div className="flex">
          <BiCart className="ml-4" size={20} />
          إضافة للسلة ( {totalPrice.toFixed(3)} ريال سعودي )
        </div>
      )}
    </Button>
  );
};

export default AddSpecialOrderToCartButton;
