"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";  
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFavorite } from "@/app/stores/favoritesStore";
import { cn } from "@/lib/utils"; 
type Props = {
    id: string | number;
};

const AddToFavorite = ({ id }: Props) => {

    const redirct = useRouter();
    const { status } = useSession(); 
    const {productsIds,addProductToFavorite,delProductFromFavorite} = useFavorite()
    const isInFavorite = productsIds.includes(+id);

    // add to favorite
    // const mutationFav = useMutation({
    //     mutationFn: async () => {
    //         const res = await postApi<{data:FavoriteProduct}>(
    //             `Favorites/AddProductToFavorite/${id}`,
    //             {
    //                 headers: {
    //                     "Accept-Language": "ar",
    //                     "Content-type": "multipart/form-data",
    //                     Authorization: `Bearer ${session?.user.data.token}`,
    //                 },
    //             }
    //         );
    //         return res.data;
    //     },
    //     onSuccess: () => {
    //         addProductToFavorite(+id)
    //     },
    //     onError: (error: any) => {
    //         const errorMessage =
    //             error.response?.data?.message || 'حدث خطأ أثناء إضافة المنتج إلى المفضلة';

    //         toast({
    //             variant: 'destructive',
    //             description: `خطأ: ${errorMessage}`,
    //             action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
    //         });
    //     },
    // });
    // const mutationFavDel = useMutation({
    //     mutationFn: async () => {
    //         return await deleteApi<{data:string}>(
    //             `Favorites/DeleteFavorite?productId=${id}`,
    //             {
    //                 headers: {
    //                     "Accept-Language": "ar",
    //                     "Content-type": "multipart/form-data",
    //                     Authorization: `Bearer ${session?.user.data.token}`,
    //                 },
    //             }
    //         );
    //     },
    //     onSuccess: () => {
    //         delProductFromFavorite(+id)
    //     },
    //     onError: (error: any) => {
    //         const errorMessage =
    //             error.response?.data?.message || 'حدث خطأ أثناء حذف المنتج إلى المفضلة';

    //         toast({
    //             variant: 'destructive',
    //             description: `خطأ: ${errorMessage}`,
    //             action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
    //         });
    //     },
    // });


    const handleAddToFav = () => {
        if (status === "unauthenticated") redirct.push("/auth");
        else if (status === "authenticated") {
            if (isInFavorite) {
                 delProductFromFavorite(+id)
                // mutationFavDel.mutate()
            } else {
                 addProductToFavorite(+id)
                // mutationFav.mutate();
            }
        }
    };

    return (
        <Button
            // disabled={mutationFav.isPending}
            variant={"outline"}
            onClick={() => handleAddToFav()}
            className={cn("cursor-pointer group hover:bg-[#F55157] hover:text-white transition-all duration-300 max-md:ml-[2px] max-sm:w-[30px] max-sm:h-[30px] w-[50px] h-[40px] rounded-[5px] border-[1px] flex justify-center items-center p-1",isInFavorite&&"bg-[#F55157]")}
        >
            {
                // mutationFav.isPending || mutationFavDel.isPending 
                false
                 ? (
                    <Loader2 className="animate-spin" />
                ) : (<>
                    <AiOutlineHeart className={cn("w-[20px] h-[20px]  group-hover:hidden",isInFavorite&&"hidden")} color="#D5D5D5" />
                    <AiFillHeart className={cn("w-[20px] h-[20px] hidden group-hover:block",isInFavorite&&"block")} color="#fff" />
                    </> )
            }
        </Button>
    )
}

export default AddToFavorite
