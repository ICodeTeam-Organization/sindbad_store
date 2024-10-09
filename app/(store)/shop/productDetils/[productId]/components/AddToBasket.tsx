import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Loader2 } from "lucide-react";

type AddToBasketProps = {
  productId: string;
  quantity: number;
};

const AddToBasket = ({ productId, quantity }: AddToBasketProps) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `https://icode-sendbad-store.runasp.net/AddProductToCart?productId=${productId}`,
        { quantity },
        {
          headers: {
            "Accept-Language": "ar",
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    },
    onSuccess: () => {
      toast({
        variant: "default",
        description: "تمت الاضافة الى السلة بنجاح",
        style: {
          backgroundColor: "green",
        },
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "حدث خطأ اثناء عملية الاضافة الى السلة",
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const { isPending } = mutation;

  return (
    <button
      className="min-w-[200px] h-[50px] bg-orange-500 text-white text-xl rounded-md flex justify-center items-center mb-2 md:mb-0"
      onClick={() => mutation.mutate()}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <p>اضف للسلة</p>}
    </button>
  );
};

export default AddToBasket;
