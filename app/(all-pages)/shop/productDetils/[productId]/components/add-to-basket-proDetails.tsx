"use client";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useRouter } from "next-nprogress-bar";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react"; 
import { useDebounce } from "@/hooks/useDebounce";
import { BtnAddTobascketProps, CartItem } from "@/types/storeTypes";
import { useCartStore } from "@/app/stores_mangament/cartStore";

 
const AddToBasketBtnForProductDetails = ({ id , productInfo  }: BtnAddTobascketProps) => {
  
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
    if (inCart ) {
      setIsUpdated(true);
      setQuantity((q) => q + 1); 
    }
  };

  const decreamentQ = () => {
    if (inCart ) {
      setIsUpdated(true);
      setQuantity((q) => q - 1); 
    }
  };

  const handleAddToCart = () => {
    if (status === "unauthenticated") redirct.push("/auth");
    else if (status === "authenticated") {
        const newCart:CartItem = {
              productId: +id,   
              quantity: 1,
              amountYouBuy:!!productInfo?.amountYouBuy ? productInfo?.amountYouBuy : undefined, 
              amountYouGet:!!productInfo?.amountYouGet ? productInfo?.amountYouGet : undefined,
              imageUrl: productInfo?.image,
              price: productInfo?.oldPrice || 0,
              priceAfterDiscount: productInfo?.price,
              name: productInfo?.productName,
              shipCost:0,
              cartId:0,
            };  
        setQuantity(1);
        addItem(newCart);
    }
  };
 
  const [isUpdated, setIsUpdated] = useState(false);
  const debounceQuantity = useDebounce(quantity, 1000);
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
    <div className="cursor-pointer  my-1 flex gap-x-2   mb-2    ">
      {inCart ? (
        <div className="min-w-[300px] min-h-[50px] rounded-[5px] border-[1px] flex justify-center items-center px-1 max-md:px-1">
          <div
            className="text-[20px] bg-slate-100 px-2 h-[90%] aspect-square flex items-center justify-center rounded-full "
            onClick={() => {
              increamentQ();
            }}
           >
            <Plus size={15} />
          </div>
          {  (
            <input
              value={quantity}
              type="number"
              onChange={(e) => {
                setQuantity(+e.target.value);
                setIsUpdated(true);
              }}
              className=" w-full  text-center remove-arrow outline-none"
            />
          )}
          <div
            className="text-[20px] bg-slate-100 px-2 h-[90%] aspect-square flex items-center justify-center rounded-full "
            onClick={() => {
              if (quantity > 0) {
                decreamentQ();
              }
            }}
           >
            <Minus size={15} />
          </div>
        </div>
      ) : (
        <Button
          // disabled={mutationAdd.isPending}
          variant={"outline"}
          onClick={() => handleAddToCart()}
          className="hover:bg-primary min-w-[300px] min-h-[50px] bg-primary hover:text-white text-white text-2xl  flex justify-center items-center mb-2 md:mb-0"
        >
          {false ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <MdOutlineLocalGroceryStore />
              <p className="text-lg font-bold ">اضف للسلة</p>
            </div>
          )}
        </Button>
      )}

 
 
    </div>
  );
};

export default AddToBasketBtnForProductDetails;
