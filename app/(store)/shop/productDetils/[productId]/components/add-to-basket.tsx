import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


type AddToBasketProps = {
  productId: string | number;
  quantity: number;
};

const AddToBasket = ({ productId }: AddToBasketProps) => {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const redirct = useRouter();


  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `https://icode-sendbad-store.runasp.net/api/Cart/AddProductToCart?productId=${productId}`,
        {
          quantity: 1,
        },
        {
          headers: {
            "Accept-Language": "ar",
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${session?.user.data.token}`,
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
    onError: (res: any) => {
      toast({
        variant: "destructive",
        description: res.response.data.message,
        action: <ToastAction altText="Try again">حاول مرة اخرى</ToastAction>,
      });
    },
  });

  const handleAddToCart = () => {
    if (status === "unauthenticated") redirct.push("/auth");
    else if (status === "authenticated") {
      mutation.mutate();
    }
  };

  const { isPending } = mutation;

  return (
    <button
      className="min-w-[200px] h-[50px] bg-orange-500 text-white text-xl rounded-md flex justify-center items-center mb-2 md:mb-0"
      onClick={() => handleAddToCart()}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <p>اضف للسلة</p>}
    </button>
  );
};

export default AddToBasket;
