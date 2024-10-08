"use client";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import React from "react";

type Props = {
  id: string;
};
const AddToBasket = ({ id }: Props) => {
  const redirct = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        "https://icode-sendbad-store.runasp.net/AddProductToCart?productId=" +
          id,
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

  const handleAddToCart = () => {
    if (status === "unauthenticated") redirct.push("/auth");
    else if (status === "authenticated") {
      mutation.mutate();
    }
  };

  return (
    <div className="cursor-pointer my-1 flex justify-around max-md:justify-between items-center w-full">
      <Button
        disabled={mutation.isPending}
        variant={"outline"}
        onClick={() => handleAddToCart()}
        className="hover:bg-[#F55157] hover:text-white max-md:w-[107px] max-md:h-[30px] w-[159px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center"
      >
        {mutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <MdOutlineLocalGroceryStore className="w-[17.39px] h-[15px]" />
            <p className="max-md:text-[7px]">اضف للسلة</p>
          </>
        )}
      </Button>
      <div className="cursor-pointer hover:bg-[#F55157] hover:text-white transition-all duration-300 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] ml-[6px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center">
        <AiOutlineHeart className="w-[20px] h-[20px]" color="#D5D5D5" />
      </div>
    </div>
  );
};

export default AddToBasket;
