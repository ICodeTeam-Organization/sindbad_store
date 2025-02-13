"use client";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useRouter } from "next-nprogress-bar";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddToFavorite from "./add-to-favorite";
import { useCartStore } from "@/app/stores/cartStore";
import { deleteApi, postApi, putApi } from "@/lib/http";
import Spinner from "./Spinner";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  id: string | number;
  productInfo: {
    image: string;
    productName: string;
    price: number;
    oldPrice?: number;
  };
};
const AddToBasket = ({ id, productInfo }: Props) => {
  const redirct = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();

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

  const mutationAdd = useMutation({
    mutationFn: async () => {
      return await postApi<{data:any}>(
        "Cart/AddProductToCart?productId=" +
          id,
        {
          body: {
            quantity: 1,
          },
          headers: {
            "Accept-Language": "ar",
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${session?.user.data.token}`,
          },
        }
      );
    },
    onSuccess: (data) => {
      const res = data?.data as {
        id: number;
        quantity: number;
        productId: number;
      };
      if (res) {
        
        const newCart:any = {
          cartId: res?.id,
          productId: res?.productId,
          imageUrl: productInfo.image,
          price: productInfo.oldPrice || 0,
          priceAfterDiscount: productInfo.price,
          quantity: res?.quantity,
          shipCost:0,
          name:""
        };

         
        setQuantity(1);
        addItem(newCart);
      }

      toast({
        variant: "default",
        description: "تمت الاضافة الى السلة بنجاح",
        style: {
          backgroundColor: "green",
          color: "#fff",
        },
      });
    },
    onError: (res: any) => {
      toast({
        variant: "destructive",
        description: res.response.data.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const mutationUpdateQ = useMutation({
    mutationFn: async ({
      quantity,
      cartId,
    }: {
      quantity: number;
      cartId: number;
    }) => {
      await putApi(
        "Cart/UpdateCart",
        {
          body: {
            cartId: cartId,
            quantity: quantity,
          },
        },
        "PATCH"
      );
      return { quantity, cartId };
    },
    onSuccess: ({ quantity, cartId }) => {
      console.log(quantity, cartId, "updted w");
      updateQuantity(quantity, cartId);
    },
    onError: (res) => {
      setQuantity(inCart?.quantity || quantity);
      toast({
        variant: "destructive",
        description: res.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const increamentQ = () => {
    if (inCart && !mutationUpdateQ.isPending) {
      setIsUpdated(true);
      setQuantity((q) => q + 1);
      // mutationUpdateQ.mutate({
      //   quantity: inCart.quantity + 1,
      //   cartId: inCart.cartId,
      // });
    }
  };

  const decreamentQ = () => {
    if (inCart && !mutationUpdateQ.isPending) {
      setIsUpdated(true);
      setQuantity((q) => q - 1);
      // mutationUpdateQ.mutate({
      //   quantity: inCart.quantity - 1,
      //   cartId: inCart.cartId,
      // });
    }
  };

  const handleAddToCart = () => {
    if (status === "unauthenticated") redirct.push("/auth");
    else if (status === "authenticated") {
      mutationAdd.mutate();
    }
  };

  const deleteItemFromCart = useMutation({
    mutationFn: async (id: number) => {
      await deleteApi("Cart/DeleteCart?cartId=" + id);
      return id;
    },
    onSuccess: (id) => {
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

  const [isUpdated, setIsUpdated] = useState(false);
  const debounceQuantity = useDebounce(quantity, 1000);
  useEffect(() => {
    if (debounceQuantity >= 0 && isUpdated) {
      setIsUpdated(false);
      if (inCart) {
        if (quantity == 0) {
          deleteItemFromCart.mutate(inCart.cartId);
        } else {
          mutationUpdateQ.mutate({
            cartId: inCart.cartId,
            quantity: quantity,
          });
        }
      }
    }
  }, [debounceQuantity]);

  return (
    <div className="cursor-pointer tajawal my-1 flex gap-x-2 px-2 mb-2   ">
      {inCart ? (
        <div className="w-full max-sm:h-[30px]  h-[40px] rounded-[5px] border-[1px] flex justify-center items-center px-1 max-md:px-1">
          <div
            className="text-[20px] bg-slate-100 px-2 h-[90%] aspect-square flex items-center justify-center rounded-full "
            onClick={() => {
              increamentQ();
            }}
          >
            <Plus size={15} />
          </div>
          {mutationUpdateQ.isPending || deleteItemFromCart.isPending ? (
            <div className="w-full flex items-center justify-center">
              {" "}
              <Spinner className="h-5 w-5" />{" "}
            </div>
          ) : (
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
          disabled={mutationAdd.isPending}
          variant={"outline"}
          onClick={() => handleAddToCart()}
          className="hover:bg-[#F55157] hover:text-white w-full max-sm:h-[30px]  h-[40px] rounded-[5px] border-[1px] flex justify-center items-center px-1 max-md:px-1"
        >
          {mutationAdd.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <MdOutlineLocalGroceryStore />
              <p className="max-sm:text-[10px] ">اضف للسلة</p>
            </div>
          )}
        </Button>
      )}

      <AddToFavorite id={id} />

      {/* <Button
        disabled={mutationFav.isPending}
        variant={"outline"}
        onClick={() => handleAddToFav()}
        className="cursor-pointer hover:bg-[#F55157] hover:text-white transition-all duration-300 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] mr-[4px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center p-1"
      >
        {
          mutationFav.isPending? (
            <Loader2 className="animate-spin" />
          ) : (
            <AiOutlineHeart className="w-[20px] h-[20px]" color="#D5D5D5"/>
          )
        }
      </Button> */}
    </div>
  );
};

export default AddToBasket;
