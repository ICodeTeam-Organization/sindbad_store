"use client";

import React from "react";
import { StoreData } from "../../../typest";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useFavorite } from "@/app/stores/favoritesStore";
import { useMutation } from "@tanstack/react-query";
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { deleteApi, postApi } from "@/lib/http";
const StoreDetailsCard = ({
  id,
  name,
  description,
  imageUrl,
  websiteUrl,
  storeCategoriesIds,
  images,
}: StoreData) => {
  const { favoriteStoreIds, addStoreToFavorite, delStoreToFavorite } = useFavorite();
  const isFavorite = favoriteStoreIds.find((ele) => ele == id);
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: mutateAddToFav, isPending: isPendingAddToFav } = useMutation({
    mutationFn: async () => {
      return await postApi(
        `FavoriteShop/AddStore`,
        {
          headers: {
            "Accept-Language": "ar",
            "Content-type": "application/json",
            Authorization: `Bearer ${session?.user.data.token}`,
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

  const { mutate: mutateRemoveFromFav, isPending: isPendingRemoveFromFav } = useMutation({
    mutationFn: async () => {
      return await deleteApi(
        `FavoriteShop/RemoveStore/` + id,
        {
          headers: {
            Authorization: `Bearer ${session?.user.data.token}`,
          },
        }
      );
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
    <div className="rounded-lg shadow-lg p-6 w-full mx-auto container mt-5">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <SafeImage
            src={imageUrl}
            alt={name}
            className="w-full h-[350px] object-cover rounded-lg border shadow-sm"
            width={400}
            height={350}
          />
          {images && images.length > 0 && (
            <div className="px-12">
              <Carousel className="mt-4">
                <CarouselContent>
                  {images.map((image) => (
                    <CarouselItem key={image.id} className="sm:basis-1/2 md:basis-1/3">
                      <SafeImage
                        src={image.imageUrl}
                        alt={name}
                        className="object-cover rounded-lg border shadow-sm"
                        width={380}
                        height={250}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 w-full text-gray-800 mt-10">
          <h2 className="text-2xl font-bold mb-4">{name}</h2>
          <p className="text-gray-600 mb-4 text-sm">{description}</p>

          {storeCategoriesIds && storeCategoriesIds.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {storeCategoriesIds.map((category) => (
                <span
                  key={category.id}
                  className="text-gray-800 text-sm px-3 py-1 rounded-md"
                >
                  {category.categoryName}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <span className="font-bold text-yellow-500"> <span className="font-normal text-sm"></span></span>
            <div className="flex items-center gap-4">
              <Link
                href={websiteUrl || "#"}
                target={websiteUrl ? "_blank" : ""}
                className={`px-2 py-2 rounded-lg text-sm text-white ${
                  websiteUrl ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {websiteUrl ? "موقع المتجر" : " لايوجد رابط"}
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleFav();
                }}
                className={cn(
                  "bg-red-500 text-white rounded-full p-3 hover:bg-red-600",
                  isFavorite && "bg-red-500 text-white"
                )}
              >
                {isPendingAddToFav || isPendingRemoveFromFav ? (
                  <Loader2 className="animate-spin" />
                ) : isFavorite ? (
                  <IoMdHeart className="w-5 h-5" />
                ) : (
                  <IoMdHeartEmpty className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <Link
            href={"/shop?storeId=" + id}
            className="mt-6 inline-block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
          >
            عرض المنتجات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsCard;