"use client";
import React, { useEffect, useState } from 'react';
import SafeImage from '@/components/SafeImage';
import Counter from '@/components/Counter';
import { calculateBonus, cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { useMutation } from '@tanstack/react-query';
import { putApi, deleteApi } from '@/lib/http'; 
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import {   Loader2 } from 'lucide-react';
import { useCartStore } from '@/app/stores_mangament/cartStore';

interface ProductCartCardProps {
  item: {
    imageUrl: string;
    name: string;
    price: number;
    shipCost: number;
    quantity: number;
    amountYouBuy?: number;
    amountYouGet?: number;
    cartId: number;
  };
  ix: number;
  refreshItems: () => void;
}

const ProductCartCard: React.FC<ProductCartCardProps> = ({ item, ix, refreshItems }) => {
  const { updateQuantity: updateQuantityInStore, removeItem } = useCartStore();
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const { toast } = useToast();

  const updateQuantity = useMutation({
    mutationFn: async ({ quantity, cartId }: { quantity: number; cartId: number }) =>
      await putApi(
        "Cart/UpdateCart",
        {
          body: {
            cartId: cartId,
            quantity: quantity,
          },
        },
        "PATCH"
      ),
    onSuccess: () => {
      refreshItems();
      updateQuantityInStore(quantity, item.cartId);
    },
    onError: (res) => {
      toast({
        variant: "destructive",
        description: res.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: number) => {
      await deleteApi("Cart/DeleteCart?cartId=" + id);
      return id;
    },
    onSuccess: (id) => {
      refreshItems();
      removeItem(id);
    },
    onError: (res: any) => {
      toast({
        variant: "destructive",
        description: res.response.data.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const handleQuantity = (quantityPar: number) => {
    setIsUpdated(true);
    setQuantity(quantityPar);
  };

  const debounceQuantity = useDebounce(quantity, 500);
  useEffect(() => {
    if (debounceQuantity >= 0 && isUpdated) {
      setIsUpdated(false);
      if (quantity == 0) {
        deleteItem.mutate(item.cartId);
      } else {
        updateQuantity.mutate({
          cartId: item.cartId,
          quantity: quantity,
        });
      }
    }
  }, [debounceQuantity]);

  // const handleDeleteItem = async (id: number) => {
  //   deleteItem.mutate(id);
  // };

  return (
    <div
      key={ix}
      className={cn(
        "border cursor-pointer rounded-lg p-4 mb-4",
        "bg-white"
      )}
    >
      <div className="flex mb-2">
        <div className="w-20 h-20 relative bg-slate-100 rounded-lg overflow-hidden">
          <SafeImage
            fill
            src={item.imageUrl || ""}
            alt="Product"
          />
        </div>
        <div className="px-3 my-2">
          <span className="text-sm font-bold block">
            {item.name}
          </span>
          <p className="text-xs mt-1 text-primary-background font-bold">
            {item.price.toFixed(2)} رس
          </p>
          <p className="text-xs mt-1 text-primary-background font-bold">
            <span className="font-bold text-black">
              تكلفة الشحن:{" "}
            </span>
            {item.shipCost.toFixed(2)} رس
          </p>
        </div>
      </div>
      <div className="text-xs p-1">
        <div className="flex items-center gap-x-4">
          <div>
            {updateQuantity?.isPending ? <><Loader2 className='animate-spin ' /></> :
            <Counter
              initialValue={quantity}
              onIncrement={() => handleQuantity(quantity + 1)}
              onDecrement={() => handleQuantity(quantity - 1)}
            />}
          </div>
          {item.amountYouBuy && item.amountYouGet && (
            <span className="font-bold bg-primary text-white px-2 py-1 rounded-sm">
              <span>
                {" "}
                +{calculateBonus(
                  item.quantity,
                  item.amountYouBuy,
                  item.amountYouGet
                )}{" "}
              </span>
              هدية مجانا
            </span>
          )}
        </div>

        <p className="text-primary-background flex justify-between items-center my-2 -mb-1">
          <span className="font-bold text-black">
            {" "}
            إجمالي السعر والشحن{" "}
          </span>
          <span className="text-base font-bold">
            {(item.quantity * item.price).toFixed(2)} رس
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCartCard;