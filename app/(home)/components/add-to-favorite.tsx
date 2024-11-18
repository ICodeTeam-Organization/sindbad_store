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
    id: string | number;
};

const AddToFavorite = ({ id }: Props) => {

    const redirct = useRouter();
    const { data: session, status } = useSession();
    const { toast } = useToast();

    // add to favorite
    const mutationFav = useMutation({
        mutationFn: async () => {
            const res = await axios.post(
                `https://icode-sendbad-store.runasp.net/api/Favorites/AddProductToFavorite/${id}`,
                {},
                {
                    headers: {
                        "Accept-Language": "ar",
                        "Content-type": "multipart/form-data",
                        Authorization: `Bearer ${session?.user.data.token}`,
                    },
                }
            );
            return res.data;
        },
        onSuccess: () => {
            toast({
                variant: 'default',
                description: 'تم إضافة المنتج إلى المفضلة بنجاح',
                style: {
                    backgroundColor: 'green',
                },
            });
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.message || 'حدث خطأ أثناء إضافة المنتج إلى المفضلة';

            toast({
                variant: 'destructive',
                description: `خطأ: ${errorMessage}`,
                action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
            });
        },
    });

    const handleAddToFav = () => {
        console.log(`${id} hi`)
        
        if (status === "unauthenticated") redirct.push("/auth");
        else if (status === "authenticated") {
            mutationFav.mutate();
        }
    };

    return (
        <Button
            disabled={mutationFav.isPending}
            variant={"outline"}
            onClick={() => handleAddToFav()}
            className="cursor-pointer hover:bg-[#F55157] hover:text-white transition-all duration-300 max-md:ml-[2px] max-md:w-[30px] max-md:h-[30px] w-[41px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center p-1"
        >
            {
                mutationFav.isPending ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <AiOutlineHeart className="w-[20px] h-[20px]" color="#D5D5D5" />
                )
            }
        </Button>
    )
}

export default AddToFavorite
