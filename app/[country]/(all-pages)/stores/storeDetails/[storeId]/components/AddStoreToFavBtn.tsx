"use client";
import { useFavorite } from "@/app/stores_mangament/favoritesStore";
import { useToast } from "@/hooks/use-toast";
import { deleteApi, postApi } from "@/lib/http";
import { cn } from "@/lib/utils";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query"; 
import { useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import React from "react";
import { IoMdHeart } from "react-icons/io";

interface PropsType {
  id: number | string;
}

function AddStoreToFavBtn({ id }: PropsType) {
  const { favoriteStoreIds, addStoreToFavorite, delStoreToFavorite } =
    useFavorite();
  const isFavorite = favoriteStoreIds.find((ele) => ele == id);
  const { status } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: mutateAddToFav } = useMutation({
    mutationFn: async () => {
      return await postApi(`Favorites/Stores`, {
        headers: {
          "Accept-Language": "ar",
          "Content-type": "application/json",
        },
        body: {
          storeId: id,
        },
      });
    },
    onSuccess: () => {
      addStoreToFavorite(id + "");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "حدث خطأ أثناء إضافة المحل إلى المفضلة";
      toast({
        variant: "destructive",
        description: `خطأ: ${errorMessage}`,
        action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
      });
    },
  });

  const { mutate: mutateRemoveFromFav } =
    useMutation({
      mutationFn: async () => {
        return await deleteApi(`Favorites/Stores` + id);
      },
      onSuccess: () => {
        delStoreToFavorite(id + "");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          "حدث خطأ أثناء حذف المحل إلى المفضلة";
        toast({
          variant: "destructive",
          description: `خطأ: ${errorMessage}`,
          action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
        });
      },
    });

  const handleFav = () => {
    if (status === "unauthenticated") router.push("/auth");
    else if (status === "authenticated") {
      if (isFavorite) {
        mutateRemoveFromFav();
      } else {
        mutateAddToFav();
      }
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleFav();
      }}
      className={cn(
        " bg-bg-100 border rounded-full p-2 px-4 hover:text-red-500 flex items-center justify-center gap-x-2", 
      )}
    >
      <IoMdHeart className={
        cn(
          "w-5 h-5 text-bg-400 ",
          isFavorite && "text-danger"
        )
      } />
      {
        isFavorite ? <span className="text-xs text-secondary font-bold">  إزالة من المفضلة</span> : <span className="text-xs text-secondary font-bold">إضافة للمفضلة</span>
      }
    </button>
  );
}

export default AddStoreToFavBtn;
