"use client";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { E_commerceCardProps } from "../types";
import SafeImage from "@/components/SafeImage";
import { cn } from "@/lib/utils";
import { useFavorite } from "@/app/stores/favoritesStore";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteApi, postApi } from "@/lib/http";

const E_commerceCard = ({
    id,
    name,
    LinkOFStore,
    description,
    logo,
    categories,
    ecommerceStoreImages,
}: E_commerceCardProps) => {
  const {
    favoriteEcommerceIds,
    addEcommerceToFavorite,
    delEcommerceFromFavorite,
  } = useFavorite();
  const isFavorite = favoriteEcommerceIds.find((ele) => ele == +id);
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const { mutate: mutateAddToFav, isPending: isPendingAddToFav } = useMutation({
    mutationFn: async () => {
      return postApi(
        `FavoriteShop/AddEcommerceStore`,
        
        {
          headers: {
            "Accept-Language": "ar",
            "Content-type": "application/json",
            Authorization: `Bearer ${session?.user.data.token}`,
          },
          body:{
            ecommerceStoreId: id,
          },
        }
      );
    },
    onSuccess: (data) => {
      addEcommerceToFavorite(+id);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "حدث خطأ أثناء إضافة المتجر إلى المفضلة";
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
        return await deleteApi(
            `FavoriteShop/RemoveEcommerceStore/` +
            id,
          {
            headers: {
              Authorization: `Bearer ${session?.user.data.token}`,
            },
          }
        );
      },
      onSuccess: (data) => {
        delEcommerceFromFavorite(+id);
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          "حدث خطأ أثناء حذف المتجر إلى المفضلة";
        toast({
          variant: "destructive",
          description: `خطأ: ${errorMessage}`,
          action: <ToastAction altText="Try again">حاول مرة أخرى</ToastAction>,
        });
      },
    });
  const redirct = useRouter();

  const handleFav = () => {
    if (status === "unauthenticated") redirct.push("/auth");
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
      className="border tajawal rounded-lg shadow-sm relative w-full max-w-[380px] mx-auto text-center"
    >
      <SafeImage
        src={logo}
        alt={name}
        className="w-full h-[250px] object-scale-down"
        width={500}
        height={500}
      />
      <div className="m-4">
        <h2 className="font-bold mt-2 text-center">{name}</h2>
        <p className="text-[#666] text-sm">{description}</p>

        <div className="flex flex-wrap   w-full  gap-x-1 mt-6 ] ">
          <Link
            target="_blank"
            href={LinkOFStore + ""}
            className="flex-1 min-w-[70px] h-[40px] border border-gray text-black text-[13px] rounded-md flex justify-center items-center "
          >
            الإنتقال الى المتجر
          </Link>
          <Link
            href={"/special-order?sh=1&tab=3&link=" + (LinkOFStore || "")}
            className="flex-1 min-w-[80px] h-[40px] border border-gray text-black text-[13px] rounded-md flex justify-center items-center "
          >
            طلب من المتجر
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleFav()
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

export default E_commerceCard;
