import React from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; 
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Shop } from "@/types/storeTypes";
import { deleteApi, postApi } from "@/lib/http";
import { useFavorite } from "@/app/stores_mangament/favoritesStore";

const EshopsCardCarsoul: React.FC<Shop> = ({
  description,
  name,
  // ecommerceStoreImages,
  id: ecommrcesId,
  logo,
  urlLinkOfStore,
}) => {
  const {
    favoriteEcommerceIds,
    addEcommerceToFavorite,
    delEcommerceFromFavorite,
  } = useFavorite();
  const isFavorite = favoriteEcommerceIds.find((ele) => ele == ecommrcesId);
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const { mutate: mutateAddToFav, isPending: isPendingAddToFav } = useMutation({
    mutationFn: async () => {
      return await postApi(`FavoriteShop/AddEcommerceStore`, {
        body: {
          ecommerceStoreId: ecommrcesId,
        },
        headers: {
          "Accept-Language": "ar",
          "Content-type": "application/json",
          Authorization: `Bearer ${session?.user?.data?.token}`,
        },
      });
    },
    onSuccess: () => {
      addEcommerceToFavorite(ecommrcesId);
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
            ecommrcesId,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.data?.token}`,
            },
          }
        );
      },
      onSuccess: () => {
        delEcommerceFromFavorite(ecommrcesId);
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

  const handleAddToFav = () => {
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
    <>
      <div className="flex justify-center items-center w-[35%] h-full relative  ">
        {logo === null ? (
          <h1>لاتوجد صورة للمتجر</h1>
        ) : (
          <Image
            src={"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"}
            alt={"shop"}
            layout="fill"
            className="object-contain"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between h-full py-2">
        <div>
          <h1 className="mdHalf:text-md text-sm font-bold text-right line-clamp-1 mt-1">
            {name}
          </h1>
          <p className="mdHalf:text-sm text-[11px] line-clamp-1 my-2 text-[#666666]">
            {description ? description : " ."}
          </p>
          {/* <div className="flex items-center max-sm:w-20 mb-1">
            <AiFillStar className="text-[#FFC62A] text-xs" />
            <p className="text-[#A5A5A5] text-[12px] mr-1">(4.5)</p>
          </div> */}
        </div>
        <div className="flex  w-full gap-x-2   ">
          {urlLinkOfStore === null ? (
            <div className="flex-1 p-2 cursor-pointer rounded-sm border-[1px] group-hover:bg-[#F58634] group-hover:border-[#F58634] group-hover:text-white transition-all duration-300 flex justify-center items-center border-gray-200">
              <h1 className="text-base">لا يوجد رابط للمتجر</h1>
              <IoIosArrowBack />
            </div>
          ) : (
            <Link
              href={urlLinkOfStore}
              target="_blank"
              className="flex-1 p-2 cursor-pointer rounded-sm border-[1px] group-hover:bg-[#F58634] group-hover:border-[#F58634] group-hover:text-white transition-all duration-300 flex justify-center items-center border-gray-200"
            >
              <h1 className="text-base">زيارة المتجر</h1>
              <IoIosArrowBack />
            </Link>
          )}

          <Button
            variant={"outline"}
            onClick={handleAddToFav}
            className={cn(
              "cursor-pointer group hover:bg-[#F55157] text-[#D5D5D5] hover:text-white transition-all duration-300  rounded-[5px]  border-[1px] flex justify-center items-center p-4 py-5 ml-2",
              isFavorite && "bg-[#F55157] text-white"
            )}
          >
            {isPendingAddToFav || isPendingRemoveFromFav ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <AiFillHeart
                  className={cn("w-[20px] h-[20px] ", isFavorite && "block")}
                />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EshopsCardCarsoul;
