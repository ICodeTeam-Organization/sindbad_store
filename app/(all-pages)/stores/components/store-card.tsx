"use client";
import React from "react";
import { StoreCardProps } from "../typest";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react"; 
import { useMutation } from "@tanstack/react-query";
import { ToastAction } from "@/components/ui/toast";
import { cn, goToExtrnalLink } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteApi, postApi } from "@/lib/http";
import SafeImage from "@/components/SafeImage";
import { useRouter } from "next/navigation";
import { useFavorite } from "@/app/stores_mangament/favoritesStore";
const StoreCard = ({ id, name , websiteLink, mainImageUrl, imagesUrl }: StoreCardProps) => {
  
  const { favoriteStoreIds, addStoreToFavorite, delStoreToFavorite } =
    useFavorite();
  const isFavorite = favoriteStoreIds.find((ele) => ele == id);
  // const { data: session } = useSession();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const linkToStore = `/stores/storeDetails/${id}`;
  // const redirct = useRouter();

  const { 
    mutate: mutateAddToFav,
     isPending: isPendingAddToFav } = useMutation({
    mutationFn: async () => {
      return await postApi(
        `FavoriteShop/AddStore`,

        {
          headers: {
            "Accept-Language": "ar",
            "Content-type": "application/json",
            Authorization: `Bearer ${session?.user?.data?.token}`,
          },
          body: {
            storeId: id,
          },
        }
      );
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

  const { 
    mutate: mutateRemoveFromFav,
     isPending: isPendingRemoveFromFav } =
    useMutation({
      mutationFn: async () => {
        return await deleteApi(`FavoriteShop/RemoveStore/` + id, {
          headers: {
            Authorization: `Bearer ${session?.user?.data?.token}`,
          },
        });
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
    <div
      dir="rtl"
      className="border rounded-lg shadow-sm overflow-hidden relative w-full max-w-[380px] mx-auto "
    >
      <Link href={linkToStore}>
        <SafeImage
          src={mainImageUrl || imagesUrl[0]}
          alt={name}
          className="w-full h-[220px] object-cover "
          width={380}
          height={250}
        />
      </Link>

      <div className="p-4">
        <Link href={`/stores/storeDetails/${id}`}>
          <h2 className="font-bold text-[13px] mb-4">{name}</h2>
        </Link>
        <div className="flex flex-wrap   w-full  gap-x-1 ">
          <Link
            href={"/shop?storeId=" + id}
            className="flex-1 min-w-[70px] h-[40px] border border-gray text-black text-[12px] rounded-md flex justify-center items-center "
          >
            عرض المنتجات
          </Link>
          {
            websiteLink != null && websiteLink != "" ?           <Link href={goToExtrnalLink(websiteLink)} target="_blank" className="flex-1 min-w-[80px] h-[40px] border border-gray text-black text-[12px] rounded-md flex justify-center items-center ">
            الموقع الإلكتروني
          </Link> :
                    <button className="flex-1 min-w-[80px] h-[40px] border border-gray text-black text-[12px] rounded-md flex justify-center items-center ">
                    لايوجد موقع الكتروني
                  </button>
          }

          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleFav();
            }}
            className={cn(
              "group w-[40px] z-10 hover:shadow transition h-[40px] border border-gray text-black text-base rounded-md flex justify-center items-center ",
              isFavorite && "bg-red-500 text-white"
            )}
          >
            {isPendingAddToFav || isPendingRemoveFromFav ? (
              <Loader2 className="animate-spin" />
            ) : isFavorite ? (
              <IoMdHeart className="w-4 h-4" />
            ) : (
              <IoMdHeartEmpty className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  ); 
};

export default StoreCard;
