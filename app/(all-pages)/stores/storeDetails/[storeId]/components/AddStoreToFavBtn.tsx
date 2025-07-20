"use client";
import { useFavorite } from "@/app/stores_mangament/favoritesStore";
import { useToast } from "@/hooks/use-toast";
import { deleteApi, postApi } from "@/lib/http";
import { cn } from "@/lib/utils";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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

  const { mutate: mutateAddToFav, isPending: isPendingAddToFav } = useMutation({
    mutationFn: async () => {
      return await postApi(`FavoriteShop/AddStore`, {
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

  const { mutate: mutateRemoveFromFav, isPending: isPendingRemoveFromFav } =
    useMutation({
      mutationFn: async () => {
        return await deleteApi(`FavoriteShop/RemoveStore/` + id);
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
        " text-gray-200 border rounded-md p-3 hover:text-red-500",
        isFavorite && "bg-red-500 text-white hover:text-white"
      )}
    >
      {isPendingAddToFav || isPendingRemoveFromFav ? (
        <Loader2 className="animate-spin" />
      ) : isFavorite ? (
        <IoMdHeart className="w-5 h-5" />
      ) : (
        <IoMdHeart className="w-5 h-5 " />
      )}
    </button>
  );
}

export default AddStoreToFavBtn;
